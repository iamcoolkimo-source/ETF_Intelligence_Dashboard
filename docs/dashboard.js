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

            if (!row.trim())
                return;

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

        document.getElementById(
            "detail-content"
        ).innerHTML =
            "ETF資料讀取失敗";
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
                <td class="detail-label">
                    ETF種類
                </td>

                <td>
                    ${etf.type}
                </td>
            </tr>

            <tr>
                <td class="detail-label">
                    上場日
                </td>

                <td>
                    ${etf.listdate}
                </td>
            </tr>

            <tr>
                <td class="detail-label">
                    売買単位
 
