let data = [];

async function loadData() {

    data = await fetch(
        "data/ETF_ACCUMULATION_RANKING.csv"
    )
    .then(r => r.text())
    .then(text => {

        const rows =
            text.trim().split("\n");

        const header =
            rows[0].split(",");

        return rows.slice(1).map(row => {

            const cols =
                row.split(",");

            let obj = {};

            header.forEach(
                (h, i) => obj[h] = cols[i]
            );

            return obj;
        });
    });

    render();
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

    const filtered =
        data.filter(
            x =>
            x.WINDOW === windowValue &&
            x.GROUP === groupValue
        );

    showTable(
        "buyStock",
        filtered.filter(
            x =>
            x.CATEGORY === "BUY_STOCK"
        )
    );

    showTable(
        "sellStock",
        filtered.filter(
            x =>
            x.CATEGORY === "SELL_STOCK"
        )
    );

    showTable(
        "buySector",
        filtered.filter(
            x =>
            x.CATEGORY === "BUY_SECTOR"
        )
    );

    showTable(
        "sellSector",
        filtered.filter(
            x =>
            x.CATEGORY === "SELL_SECTOR"
        )
    );
}

function showTable(id, rows) {

    let html =
        "<table>";

    html += `
    <tr>
        <th>Rank</th>
        <th>Code</th>
        <th>Name</th>
        <th>Value</th>
    </tr>
    `;

    rows.forEach(r => {

        html += `
        <tr>
            <td>${r.RANK}</td>
            <td>${r.CODE}</td>
            <td>${r.NAME}</td>
            <td>${Number(r.VALUE).toLocaleString()}</td>
        </tr>
        `;
    });

    html += "</table>";

    document
        .getElementById(id)
        .innerHTML = html;
}

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
