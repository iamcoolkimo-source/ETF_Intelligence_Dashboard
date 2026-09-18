let allData = [];

async function loadData() {

    console.log("Loading CSV...");

    const response = await fetch(
        "data/ETF_ACCUMULATION_RANKING.csv"
    );

    const csv = await response.text();

    const rows = csv
        .trim()
        .split("\n");

    const headers = rows[0]
        .replace(/\r/g, "")
        .split(",");

    allData = rows.slice(1).map(row => {

        const cols = row
            .replace(/\r/g, "")
            .split(",");

        let obj = {};

        headers.forEach((h, i) => {
            obj[h.trim()] = cols[i];
        });

        return obj;
    });

    console.log(
        "Rows Loaded:",
        allData.length
    );

    render();
}

function buildTable(rows) {

    if (!rows.length) {
        return "<p>No Data</p>";
    }

    let html = `
        <table border="1"
               style="border-collapse:collapse;width:100%;">
        <tr>
            <th>Rank</th>
            <th>Code</th>
            <th>Name</th>
            <th>Value</th>
        </tr>
    `;

    rows.forEach(row => {

        html += `
            <tr>
                <td>${row.RANK}</td>
                <td>${row.CODE || ""}</td>
                <td>${row.NAME || ""}</td>
                <td>${Number(
                    row.VALUE || 0
                ).toLocaleString()}</td>
            </tr>
        `;
    });

    html += "</table>";

    return html;
}

function render() {

    const windowValue =
        document.getElementById(
            "window"
        ).value;

    const groupValue =
        document.getElementById(
            "group"
        ).value;

    const filtered = allData.filter(
        row =>
            row.WINDOW === windowValue &&
            row.GROUP === groupValue
    );

    document.getElementById(
        "buyStock"
    ).innerHTML = buildTable(
        filtered.filter(
            row =>
                row.CATEGORY === "BUY_STOCK"
        )
    );

    document.getElementById(
        "sellStock"
    ).innerHTML = buildTable(
        filtered.filter(
            row =>
                row.CATEGORY === "SELL_STOCK"
        )
    );

    document.getElementById(
        "buySector"
    ).innerHTML = buildTable(
        filtered.filter(
            row =>
                row.CATEGORY === "BUY_SECTOR"
        )
    );

    document.getElementById(
        "sellSector"
    ).innerHTML = buildTable(
        filtered.filter(
            row =>
                row.CATEGORY === "SELL_SECTOR"
        )
    );
}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document
            .getElementById("window")
            .addEventListener(
                "change",
                render
            );

        document
            .getElementById("group")
            .addEventListener(
                "change",
                render
            );

        loadData();
    }
);
