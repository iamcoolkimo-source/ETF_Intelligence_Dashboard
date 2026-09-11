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

function renderTable(data) {

    const tbody =
        document.querySelector("#etf-table tbody");

    tbody.innerHTML = "";

    data.forEach(etf => {

        const tr =
            document.createElement("tr");

        tr.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${etf.code}</td>
            <td>${etf.name}</td>
            <td>${etf.type}</td>
            <td></td>
            <td>${etf.listdate}</td>
            <td>${etf.lotsize}</td>
            <td>${etf.topbuy}</td>
            <td>${etf.netflow}</td>
        `;

        tr.onclick = function () {

            document.getElementById(
                "detail-content"
            ).innerHTML = `

                <h2>${etf.code}</h2>

                <h3>${etf.name}</h3>

                <p>ETF種類：${etf.type}</p>

                <p>上場日：${etf.listdate}</p>

                <p>売買単位：${etf.lotsize}</p>

                <p>主力買進股票：${etf.topbuy}</p>

                <p>Net Flow：${etf.netflow}</p>

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

function showYesterdayHot() {

    alert("昨日熱門ETF");

    const detail =
        document.getElementById(
            "detail-content"
        );

    if (!detail) return;

    detail.innerHTML = `
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
}

const search =
    document.getElementById(
        "searchInput"
    );

if (search) {

    search.addEventListener(
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
}

loadETFList();
window.filterETF = filterETF;
window.showYesterdayHot = showYesterdayHot;
