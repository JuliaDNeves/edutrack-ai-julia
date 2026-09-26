#!/usr/bin/env python3
import sys
import json
import argparse

def calculate_progress(completed: int, total: int) -> dict:
    if total < 0 or completed < 0:
        return {
            "error": "Completed and total counts must be non-negative integers.",
            "status": "error"
        }
    
    if total == 0:
        percentage = 0.0
    else:
        percentage = round((completed / total) * 100, 2)
        
    return {
        "total": total,
        "completed": completed,
        "percentage": percentage,
        "status": "success"
    }

def main():
    parser = argparse.ArgumentParser(description="Calculate progress percentage and output JSON.")
    parser.add_argument("completed", type=int, nargs="?", help="Number of completed items")
    parser.add_argument("total", type=int, nargs="?", help="Total number of items")
    parser.add_argument("--completed", dest="kw_completed", type=int, help="Number of completed items (named argument)")
    parser.add_argument("--total", dest="kw_total", type=int, help="Total number of items (named argument)")

    try:
        args = parser.parse_args()
        
        completed = args.kw_completed if args.kw_completed is not None else args.completed
        total = args.kw_total if args.kw_total is not None else args.total

        if completed is None or total is None:
            result = {
                "error": "Missing required arguments: completed and total counts are required.",
                "status": "error"
            }
            print(json.dumps(result, indent=2))
            sys.exit(1)

        result = calculate_progress(completed, total)
        print(json.dumps(result, indent=2))
        
        if result.get("status") == "error":
            sys.exit(1)
            
    except Exception as e:
        result = {
            "error": str(e),
            "status": "error"
        }
        print(json.dumps(result, indent=2))
        sys.exit(1)

if __name__ == "__main__":
    main()
