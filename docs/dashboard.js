let etfData = [];

async function loadETFList() {

    const response =
        await fetch("./data/WEB_ETF_MASTER.csv");

    const text =
        await response.text();

    const rows =
        text.split("\n");

    etfData = [];

    rows.slice(1).forEach(row => {

        if (!row.trim())
            return;

        const cols = row.split(",");

        etfData.push({

            code: cols[0] || "",

            name: cols[1] || "",

            type: cols[2] || "",

            provider: cols[3] || "",

            netflow: cols[4] || "",

            topbuy: cols[5] || "",

            topbuychange: cols[6] || "",

            topsell: cols[7] || "",

            topsellchange: cols[8] || ""

        });

    });

    renderTable(etfData);
}

function renderTable(data) {

    const tbody =
        document.querySelector(
            "#etf-table tbody"
        );

    if (!tbody) return;

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
                        <td><b>Net Flow</b></td>
                        <td>${etf.netflow || "-"}</td>
                    </tr>

                </table>

                <br>

                <h3>Top Buy Stock</h3>

                <table border="1"
                       width="100%"
                       cellpadding="8">

                    <tr>
                        <td><b>Stock</b></td>
                        <td>${etf.topbuy || "-"}</td>
                    </tr>

                    <tr>
                        <td><b>Buy Change</b></td>
                        <td>${etf.topbuychange || "-"}</td>
                    </tr>

                </table>

                <br>

                <h3>Top Sell Stock</h3>

                <table border="1"
                       width="100%"
                       cellpadding="8">

                    <tr>
                        <td><b>Stock</b></td>
                        <td>${etf.topsell || "-"}</td>
                    </tr>

                    <tr>
                        <td><b>Sell Change</b></td>
                        <td>${etf.topsellchange || "-"}</td>
                    </tr>

                </table>

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
            etf => etf.type === type
        );

    renderTable(filtered);
}

const searchInput =
    document.getElementById(
        "searchInput"
    );

if (searchInput) {

    searchInput.addEventListener(
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
}

loadETFList();
