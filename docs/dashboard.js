let etfData = [];

async function loadETFList() {

    const response =
        await fetch("./data/WEB_ETF_MASTER_V5.csv");

    const text =
        await response.text();

    const rows =
        text.trim().split("\n");

    etfData = [];

    rows.slice(1).forEach(row => {

        const cols = row.split(",");

        etfData.push({

            code: cols[0] || "",
            name: cols[1] || "",
            type: cols[2] || "",
            listdate: cols[3] || "",
            lotsize: cols[4] || "",
            sector: cols[5] || "",
            assetclass: cols[6] || "",
            topbuy: cols[7] || "",
            netflow: cols[8] || ""

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

        <td></td>

        <td>${etf.listdate}</td>

        <td>${etf.lotsize}</td>

        <td>${etf.topbuy}</td>

        <td>${formatNumber(etf.netflow)}</td>

        `;

        tr.onclick = () => {

            showETFDetail(etf);

        };

        tbody.appendChild(tr);

    });
}

function showETFDetail(etf) {

    document.getElementById(
        "detail-content"
    ).innerHTML = `

    <h2>${etf.code}</h2>

    <h3>${etf.name}</h3>

    <table class="detail-table">

        <tr>
            <td>ETF種類</td>
            <td>${etf.type}</td>
        </tr>

        <tr>
            <td>上場日</td>
            <td>${etf.listdate}</td>
        </tr>

        <tr>
            <td>売買單位</td>
            <td>${etf.lotsize}</td>
        </tr>

        <tr>
            <td>Sector</td>
            <td>${etf.sector}</td>
        </tr>

        <tr>
            <td>Asset Class</td>
            <td>${etf.assetclass}</td>
        </tr>

        <tr>
            <td>主力買進股票</td>
            <td>${etf.topbuy}</td>
        </tr>

        <tr>
            <td>Net Flow</td>
            <td>${formatNumber(etf.netflow)}</td>
        </tr>

    </table>

    `;
}

function formatNumber(value) {

    const num = Number(value);

    if (isNaN(num))
        return value;

    return num.toLocaleString();
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
                === type
        );

    renderTable(filtered);
}

function showYesterdayHot() {

    document.getElementById(
        "detail-content"
    ).innerHTML = `

    <h2>昨日熱門 ETF</h2>

    <table class="detail-table">

        <tr>
            <th>分類</th>
            <th>熱門股票</th>
            <th>熱門產業</th>
        </tr>

        <tr>
            <td>全部ETF</td>
            <td>日本製鉄</td>
            <td>鉄鋼</td>
        </tr>

        <tr>
            <td>主動ETF</td>
            <td>いすゞ自動車</td>
            <td>輸送用機器</td>
        </tr>

        <tr>
            <td>被動ETF</td>
            <td>日本製鉄</td>
            <td>鉄鋼</td>
        </tr>

    </table>

    `;
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

            );

        renderTable(filtered);

    }
);

loadETFList();

window.filterETF = filterETF;
window.showYesterdayHot = showYesterdayHot;
