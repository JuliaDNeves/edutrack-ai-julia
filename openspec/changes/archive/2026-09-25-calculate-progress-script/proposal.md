# Proposal

## Why

EduTrack AI requires a dedicated Python script to calculate progress percentage (completed tasks / total tasks) and return the output in structured JSON format.

## What Changes

- Create a Python script at `scripts/calculate_progress.py`.
- Calculate the progress percentage based on total and completed counts.
- Format and return the calculated result as a JSON output.

## Capabilities

### New Capabilities
- `calculate-progress`: Utility script to calculate completion progress percentage and output JSON data.

### Modified Capabilities

## Impact

- Adds `scripts/calculate_progress.py`.
- Uses Python standard libraries (`sys`, `json`, `argparse`).
