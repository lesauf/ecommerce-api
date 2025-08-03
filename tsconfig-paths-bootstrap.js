/**
 * tsconfig-paths-bootstrap.js
 * 
 * This file registers the path aliases defined in tsconfig.json for runtime resolution
 * when running the compiled JavaScript code.
 */

const tsConfigPaths = require('tsconfig-paths');
const tsConfig = require('./tsconfig.json');

// The compiled JavaScript files will be in the dist directory
const baseUrl = './dist';

// Register the path mappings
tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths
});