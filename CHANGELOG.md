# Changelog

All notable changes to this project will be documented in this file.

Format: Entries are grouped by date (YYYY-MM-DD). Each entry lists the commit message and short SHA. Newest dates appear first.

## 2025-08-31

- Add /logs endpoint (exposes GET /logs?date=YYYY-MM-DD[THH:mm]&level=<level> to retrieve JSONL logs by day and optionally filter by level). [02764c4]
- Add file logging. (Integrate Winston with daily rotate files, separate error log, morgan piping, process-level handlers, and replace console.log with logger.) [f19fceb]

## 2025-08-03

- Fix custom paths [200c60c]
- Add Tsyringe [58af031]

## 2025-07-10

- Use shortened imports [abf26af]
- First commit [fa7f6c9]
