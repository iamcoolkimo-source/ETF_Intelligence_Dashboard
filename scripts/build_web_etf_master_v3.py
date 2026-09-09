import pandas as pd

# ==========================
# WEB ETF MASTER
# ==========================

web_df = pd.read_csv(
    "docs/data/WEB_ETF_MASTER.csv"
)

# ==========================
# ETF TOP STOCK
# ==========================

try:

    top_df = pd.read_csv(
        "data/ETF_TOP_STOCK.csv"
    )

    top_df["ETF_CODE"] = (
        top_df["ETF_CODE"]
        .astype(str)
    )

    web_df["ETF_CODE"] = (
        web_df["ETF_CODE"]
        .astype(str)
    )

    web_df = web_df.merge(
        top_df[
            [
                "ETF_CODE",
                "TOP_BUY_STOCK"
            ]
        ],
        on="ETF_CODE",
        how="left"
    )

except:

    web_df["TOP_BUY_STOCK"] = ""

# ==========================
# ETF LEADERBOARD
# ==========================

try:

    board_df = pd.read_csv(
        "data/JP_EQUITY_ETF_LEADERBOARD.csv"
    )

    board_df["ETF_CODE"] = (
        board_df["ETF_CODE"]
        .astype(str)
    )

    web_df = web_df.merge(
        board_df[
            [
                "ETF_CODE",
                "NET_FLOW"
            ]
        ],
        on="ETF_CODE",
        how="left"
    )

except:

    web_df["NET_FLOW"] = 0

# ==========================
# Cleanup
# ==========================

web_df["TOP_BUY_STOCK"] = (
    web_df["TOP_BUY_STOCK"]
    .fillna("")
)

web_df["NET_FLOW"] = (
    web_df["NET_FLOW"]
    .fillna(0)
)

# ==========================
# Save
# ==========================

web_df.to_csv(
    "docs/data/WEB_ETF_MASTER_V3.csv",
    index=False,
    encoding="utf-8-sig"
)

print("-----------------------------------")
print("WEB ETF V3 :", len(web_df))
print("-----------------------------------")

print(web_df.head(20))
