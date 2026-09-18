let allData = [];

async function loadData() {

    console.log("Loading ETF_ACCUMULATION_RANKING.csv");

    const response =
        await fetch(
            "data/ETF_ACCUMULATION_RANKING.csv"
        );

    const csv =
        await response.text();

    const lines =
        csv.trim().split("\n");

    const headers =
        lines[0]
            .replace(/\r/g, "")
            .split(",");

    allData = lines.slice(1).map(line => {

        const cols =
            line.replace(/\r/g, "")
                .split(",");

        let row = {};

        headers.forEach((h, i) => {
            row[h] = cols[i];
        });

        return row;
    });

    console.log(
        "Rows Loaded:",
        allData.length
    );

    render();
}

function buildTable(rows) {

    if (rows.length === 0) {

        return `
            <p>No Data</p>
        `;
    }

    let html = `
        <table border="1"
               cellspacing="0"
               cellpadding="5">

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
                <td>${row.CODE}</td>
                <td>${row.NAME}</td>
                <td>
                    ${Number(
                        row.VALUE
                    ).toLocaleString()}
                </td>
            </tr>
        `;
    });

    html += "</table>";

    return html;
}

function render() {

    const windowValue =
        document.getElementById(
            "windowFilter"
        ).value;

    const groupValue =
        document.getElementById(
            "groupFilter"
        ).value;

    const filtered =
        allData.filter(
            row =>
                row.WINDOW === windowValue &&
                row.GROUP === groupValue
        );

    document.getElementById(
        "buyStock"
    ).innerHTML = buildTable(
        filtered.filter(
            row =>
                row.CATEGORY ===
                "BUY_STOCK"
        )
    );

    document.getElementById(
        "sellStock"
    ).innerHTML = buildTable(
        filtered.filter(
            row =>
                row.CATEGORY ===
                "SELL_STOCK"
        )
    );

    document.getElementById(
        "buySector"
    ).innerHTML = buildTable(
        filtered.filter(
            row =>
                row.CATEGORY ===
                "BUY_SECTOR"
        )
    );

    document.getElementById(
        "sellSector"
    ).innerHTML = buildTable(
        filtered.filter(
            row =>
                row.CATEGORY ===
                "SELL_SECTOR"
        )
    );
}

document
.getElementById(
    "windowFilter"
)
.addEventListener(
    "change",
    render
);

document
.getElementById(
    "groupFilter"
)
.addEventListener(
    "change",
    render
);

loadData();
