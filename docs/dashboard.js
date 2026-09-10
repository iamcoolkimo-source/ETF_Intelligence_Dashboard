let etfData = [];

async function loadETFList() {

    const response =
        await fetch("./data/WEB_ETF_MASTER_V5.csv");

    const text =
        await response.text();

    const rows =
        text.split("\n");

    etfData = [];

    rows.slice(1).forEach(row => {

        if (!row.trim()) return;

        const cols = row.split(",");

        etfData.push({

            code: cols[0] || "",

            name: cols[1] || "",

            type: cols[2] || "",

            provider: cols[3] || "",

            listdate: cols[4] || "",

            lotsize: cols[5] || "",

            sector: cols[6] || "",

            assetclass: cols[7] || "",

            topbuy: cols[8] || "",

            netflow: cols[9] || ""

        });

    });

    renderTable(etfData);
}

function renderTable(data) {

    const tbody =
        document.querySelector(
            "#etf-table tbody"
        );

    tbody.innerHTML = "";

    data.forEach(etf => {

        const tr =
            document.createElement("tr");

       tr.innerHTML = `

    <td>
        <input type="checkbox">
    </td>

    <td>${etf.code}</td>

    <td>${etf.name}</td>

    <td>${etf.type}</td>

    <td>${etf.provider}</td>

    <td>${etf.listdate}</td>

    <td>${etf.lotsize}</td>

    <td>${etf.topbuy}</td>

    <td>${Number(etf.netflow).toLocaleString()}</td>

`;

        tr.onclick = () => {

            document.getElementById(
                "detail-box"
            ).innerHTML = `

                <h2>${etf.code}</h2>

                <h3>${etf.name}</h3>

                <hr>

                <table border="1"
                       width="100%"
                       cellpadding="8">

                    <tr>
                        <td><b>ETF Type</b></td>
                        <td>${etf.type}</td>
                    </tr>

                    <tr>
                        <td><b>Provider</b></td>
                        <td>${etf.provider}</td>
                    </tr>

                    <tr>
                        <td><b>List Date</b></td>
                        <td>${etf.listdate}</td>
                    </tr>

                    <tr>
                        <td><b>Lot Size</b></td>
                        <td>${etf.lotsize}</td>
                    </tr>

                    <tr>
                        <td><b>Sector</b></td>
                        <td>${etf.sector}</td>
                    </tr>

                    <tr>
                        <td><b>Asset Class</b></td>
                        <td>${etf.assetclass}</td>
                    </tr>

                    <tr>
                        <td><b>Net Flow</b></td>
                        <td>${etf.netflow}</td>
                    </tr>

                </table>

                <br>

                <h3>Top Buy Stock</h3>

                <p>${etf.topbuy}</p>

            `;
        };

        tbody.appendChild(tr);

    });
}

function filterETF(type) {

    if (type === "ALL") {

        renderTable(etfData);
        return;
    }

    const filtered =
        etfData.filter(
            etf =>
                String(etf.type)
                    .toUpperCase()
                    .trim()
                ===
                type
        );

    renderTable(filtered);
}

document
.getElementById("searchInput")
.addEventListener(
    "keyup",
    function () {

        const keyword =
            this.value.toLowerCase();

        const filtered =
            etfData.filter(etf =>

                etf.code
                    .toLowerCase()
                    .includes(keyword)

                ||

                etf.name
                    .toLowerCase()
                    .includes(keyword)

                ||

                etf.provider
                    .toLowerCase()
                    .includes(keyword)

                ||

                etf.type
                    .toLowerCase()
                    .includes(keyword)

            );

        renderTable(filtered);

    }
);

loadETFList();
