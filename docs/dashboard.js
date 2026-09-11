alert("dashboard loaded");
let etfData = [];

async function loadETFList() {

    try {

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
    catch (err) {

        console.error(err);

    }
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
            <td>${etf.code}</td>
            <td>${etf.name}</td>
            <td>${etf.type}</td>
            <td>${etf.listdate}</td>
        `;

        tr.onclick = function () {

            showETFDetail(etf);

        };

        tbody.appendChild(tr);

    });
}

function showETFDetail(etf) {

    const detail =
        document.getElementById(
            "detail-content"
        );

    if (!detail) return;

    detail.innerHTML = `

        <h2>${etf.code}</h2>

        <p>${etf.name}</p>

        <p>類型：${etf.type}</p>

        <p>上場日：${etf.listdate}</p>

        <p>売買單位：${etf.lotsize}</p>

        <p>主力買進股票：${etf.topbuy}</p>

        <p>Net Flow：${etf.netflow}</p>

    `;
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
                    .trim()
                    .toUpperCase()
                ===
                type
        );

    renderTable(filtered);
}

function showYesterdayHot() {

    const detail =
        document.getElementById(
            "detail-content"
        );

    if (!detail) return;

    detail.innerHTML = `

        <h2>昨日熱門ETF</h2>

        <p>全部ETF：日本製鉄</p>

        <p>主動ETF：いすゞ自動車</p>

        <p>被動ETF：日本製鉄</p>

    `;
}

loadETFList();

window.filterETF = filterETF;
window.showYesterdayHot = showYesterdayHot;
