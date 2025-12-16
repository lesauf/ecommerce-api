import fs from 'fs';
import path from 'path';
import { container } from 'tsyringe';
import { ProductRepositoryToken } from '@application/tokens';

// Auto-discovery for repository implementations.
// Convention per implementation class:
// - static ENGINE: string  (e.g., 'memory', 'mongo', 'maria') identifies the engine key
// - Class implements the ProductRepositoryInterface and is @injectable()
//
// Behavior:
// - Scan infrastructure/database/repositories for modules
// - require() modules and find exported classes with static ENGINE
// - For each ENGINE, create/get a unique Symbol via Symbol.for(`ProductRepository:${ENGINE}`)
// - Register the class under that impl token (singleton)
// - Finally, alias ProductRepositoryToken -> impl token selected by DB_ENGINE (with fallback to 'memory')

function isClass(v: any): v is Function {
  return typeof v === 'function' && /^class\s/.test(Function.prototype.toString.call(v));
}

function getRepositoriesDir(): string {
  // When running from dist, __dirname is dist/infrastructure/container
  // Repositories are at dist/infrastructure/database/repositories
  // During ts-node-dev, paths are src/... but require understands .ts when transpile-only.
  // We'll target the runtime directory relative to __dirname.
  return path.resolve(__dirname, '..', 'database', 'repositories');
}

function discoverImpls(): Array<{ engine: string; clazz: any; token: symbol }>{
  const results: Array<{ engine: string; clazz: any; token: symbol }> = [];
  const repoDir = getRepositoriesDir();
  if (!fs.existsSync(repoDir)) return results;
  const files = fs.readdirSync(repoDir).filter(f => /(\.js|\.ts)$/.test(f));

  for (const file of files) {
    const full = path.join(repoDir, file);
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const mod = require(full);
      for (const [, exp] of Object.entries(mod)) {
        if (isClass(exp)) {
          const engine = (exp as any).ENGINE || (exp as any).DI_ENGINE || (exp as any).PROVIDES;
          if (typeof engine === 'string' && engine.trim()) {
            const key = engine.trim().toLowerCase();
            const token = Symbol.for(`ProductRepository:${key}`);
            results.push({ engine: key, clazz: exp, token });
          }
        }
      }
    } catch (_e) {
      // ignore bad requires
    }
  }
  return results;
}

export function autoDiscoverAndRegisterRepositories() {
  const impls = discoverImpls();
  // Register each impl under its impl token if not yet registered.
  for (const { token, clazz, engine } of impls) {
    if (!container.isRegistered(token)) {
      try {
        container.registerSingleton(token as any, clazz as any);
        // Optional: console.debug(`Registered ${clazz.name} for engine ${engine}`);
      } catch (_e) {
        // ignore duplicate or decorator issues
      }
    }
  }

  // Decide selected engine
  const requested = (process.env.DB_ENGINE || 'memory').toLowerCase();
  const selectedToken = container.isRegistered(Symbol.for(`ProductRepository:${requested}`))
    ? Symbol.for(`ProductRepository:${requested}`)
    : container.isRegistered(Symbol.for('ProductRepository:memory'))
      ? Symbol.for('ProductRepository:memory')
      : null;

  if (selectedToken) {
    container.register(ProductRepositoryToken, { useToken: selectedToken });
  }
}
