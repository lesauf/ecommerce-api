/**
 * Log Routes
 *
 * Exposes an endpoint to fetch application logs by date and optional level.
 * GET /logs?date=YYYY-MM-DD[THH:mm]&level=<level>
 * - date (required): the day to query. Accepts ISO date or datetime; only the date part is used to pick the file.
 * - level (optional): one of error, warn, info, http, verbose, debug, silly. When provided, filters entries by level.
 */

import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

// Keep in sync with logger configuration
const SERVICE_NAME = process.env.SERVICE_NAME || 'ecommerce-api';
const LOGS_DIR = path.resolve(process.cwd(), 'logs');

const ALLOWED_LEVELS = new Set(['error','warn','info','http','verbose','debug','silly']);

function parseDateToYMD(input?: string): { ok: boolean; ymd?: string; error?: string } {
  if (!input) return { ok: false, error: 'Missing required query parameter: date' };
  // Accept various inputs but normalize to YYYY-MM-DD
  const d = new Date(input);
  if (isNaN(d.getTime())) {
    return { ok: false, error: 'Invalid date format. Use YYYY-MM-DD or ISO datetime.' };
  }
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return { ok: true, ymd: `${y}-${m}-${day}` };
}

function readLines(filePath: string): string[] {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // handle possible trailing newline
    return content.split(/\r?\n/).filter(Boolean);
  } catch (e: any) {
    if (e && e.code === 'ENOENT') return [];
    throw e;
  }
}

export const logRouter = Router();

logRouter.get('/logs', (req: Request, res: Response) => {
  const dateParam = req.query.date as string | undefined;
  const levelParamRaw = (req.query.level as string | undefined)?.toLowerCase();

  const parsed = parseDateToYMD(dateParam);
  if (!parsed.ok) {
    return res.status(400).json({ status: 'error', message: parsed.error });
  }
  const ymd = parsed.ymd!;

  // Determine which file(s) to read. If a level is provided and is 'error', we prioritize the error file
  const infoFile = path.join(LOGS_DIR, `${SERVICE_NAME}-${ymd}.log`);
  const errorFile = path.join(LOGS_DIR, `${SERVICE_NAME}-error-${ymd}.log`);

  const levelParam = levelParamRaw && ALLOWED_LEVELS.has(levelParamRaw) ? levelParamRaw : undefined;

  // Read candidate files
  const lines: string[] = [];
  // Always include info log; it contains info/warn/error too. Error file contains only errors for convenience.
  lines.push(...readLines(infoFile));
  if (levelParam === 'error') {
    // If specifically filtering to errors, also include error file in case some errors were only written there
    lines.push(...readLines(errorFile));
  }

  // Parse JSON lines and filter by level if provided
  const entries = lines.map(l => {
    try { return JSON.parse(l); } catch { return null; }
  }).filter(Boolean) as Array<{ level?: string; timestamp?: string; message?: string; metadata?: any }>; 

  const filtered = levelParam ? entries.filter(e => e.level === levelParam) : entries;

  // Sort by timestamp if present
  filtered.sort((a, b) => {
    const ta = a.timestamp ? Date.parse(a.timestamp) : 0;
    const tb = b.timestamp ? Date.parse(b.timestamp) : 0;
    return ta - tb;
  });

  return res.json({
    status: 'ok',
    date: ymd,
    level: levelParam || null,
    count: filtered.length,
    logs: filtered,
  });
});

export default logRouter;
