from pathlib import Path
import shutil

source_files = [

    "data/ALL_ETF_MASTER_V2.csv",

    "data/ETF_DAILY_REPORT.csv",

    "data/SMART_MONEY.csv",

    "data/MARKET_FLOW.csv",

    "data/SECTOR_FLOW_33.csv",

    "data/SIZE_FLOW.csv",

    "data/JP_EQUITY_ETF_LEADERBOARD.csv",

    "data/ETF_TOP_STOCK.csv",

    "data/HIGH_CONVICTION_STOCKS.csv",

    "data/ACTIVE_ETF_FOCUS.csv",

    "data/PASSIVE_ETF_FOCUS_ACTIVE_LT_1.csv"

]

target_dir = Path(
    "docs/data"
)

target_dir.mkdir(
    parents=True,
    exist_ok=True
)

copied = 0

for file in source_files:

    try:

        source = Path(file)

        target = (
            target_dir /
            source.name
        )

        shutil.copy(
            source,
            target
        )

        copied += 1

        print(
            f"Copied: {source.name}"
        )

    except Exception as e:

        print(
            f"Skip: {file}"
        )

        print(e)

print("-----------------------------------")
print("Files Copied:", copied)
print("-----------------------------------")
