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

                <p>
                <b>ETF Type</b><br>
                ${etf.type}
                </p>

                <p>
                <b>Provider</b><br>
                ${etf.provider}
                </p>

                <p>
                <b>Net Flow</b><br>
                ${etf.netflow || "-"}
                </p>

                <hr>

                <h3>Top Buy Stock</h3>
