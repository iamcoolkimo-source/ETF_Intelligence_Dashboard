let etfData = [];

let selectedETFs = [];

async function loadETFList() {

    try {

        const response =
            await fetch("./data/WEB_ETF_MASTER_V5.csv");

        const text =
            await response.text();

        const rows =
            text.trim().split("\n");

        etfData = [];

        rows.slice(1).forEach(row => {

            if (!row.trim()) return;

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
    catch (err) {

        console.error(err);

        const detail =
            document.getElementById(
                "detail-content"
            );

        if (detail) {

            detail.innerHTML =
                "ETF資料讀取失敗";
        }
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

        <input
            type="checkbox"
            onchange="
            toggleCompare(
                '${etf.code}'
            )
            ">

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

    const detail =
        document.getElementById(
            "detail-content"
        );

    if (!detail) return;

    detail.innerHTML = `

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

function toggleCompare(code){

    const idx =
        selectedETFs.indexOf(code);

    if(idx >= 0){

        selectedETFs.splice(
            idx,
            1
        );

    }else{

        selectedETFs.push(code);

    }
}

function showCompare(){

    const detail =
        document.getElementById(
            "detail-content"
        );

    if(
        selectedETFs.length < 2
    ){

        detail.innerHTML = `

        <h2>ETF Compare</h2>

        <p>

        請至少選擇兩檔 ETF

        </p>

        `;

        return;
    }

    const compareList =
        etfData.filter(
            x =>
                selectedETFs.includes(
                    x.code
                )
        );

    let html = `

    <h2>ETF Compare</h2>

    <table class="detail-table">

    <tr>

        <th>項目</th>

    `;

    compareList.forEach(etf => {

        html += `

        <th>

        ${etf.code}

        </th>

        `;
    });

    html += `
    </tr>
    `;

    const fields = [

        ["ETF名稱","name"],
        ["ETF種類","type"],
        ["上場日","listdate"],
        ["売買單位","lotsize"],
        ["Sector","sector"],
        ["Asset Class","assetclass"],
        ["主力買進股票","topbuy"],
        ["Net Flow","netflow"]

    ];

    fields.forEach(field => {

        html += `

        <tr>

            <td>${field[0]}</td>

        `;

        compareList.forEach(etf => {

            html += `

            <td>

            ${etf[field[1]]}

            </td>

            `;
        });

        html += `

        </tr>

        `;
    });

    html += `
    </table>
    `;

    detail.innerHTML = html;
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

function formatNumber(value) {

    const num = Number(value);

    if (isNaN(num))
        return value;

    return num.toLocaleString();
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
window.showCompare = showCompare;
window.toggleCompare = toggleCompare;
