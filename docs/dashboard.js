let etfData = [];

let holdingData = [];

let selectedETFs = [];

async function loadETFList() {

    const response =
        await fetch("./data/WEB_ETF_MASTER_V5.csv");

    const text =
        await response.text();

    const rows =
        text.trim().split("\n");

    etfData = [];

    rows.slice(1).forEach(row => {

        const c = row.split(",");

        etfData.push({

            code: c[0] || "",

            name: c[1] || "",

            type: c[2] || "",

            listdate: c[3] || "",

            lotsize: c[4] || "",

            sector: c[5] || "",

            assetclass: c[6] || "",

            topbuy: c[7] || "",

            netflow: c[8] || ""

        });

    });

    renderTable(etfData);
}

async function loadHoldingData(){

    const response =
        await fetch("./data/ALL_HOLDING_DAILY.csv");

    const text =
        await response.text();

    const rows =
        text.trim().split("\n");

    holdingData = [];

    rows.slice(1).forEach(row => {

        const c = row.split(",");

        holdingData.push({

            ETF_CODE: c[1],

            STOCK_CODE: c[3],

            STOCK_NAME: c[4],

            SHARES_AMOUNT: Number(c[8]) || 0

        });

    });
}

function renderTable(data){

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

        tbody.appendChild(tr);

    });

}

function toggleCompare(code){

    const idx =
        selectedETFs.indexOf(code);

    if(idx >= 0){

        selectedETFs.splice(idx,1);

    }else{

        selectedETFs.push(code);

    }
}

async function showCompare(){

    const detail =
        document.getElementById(
            "detail-content"
        );

    if(selectedETFs.length !== 2){

        detail.innerHTML = `

        <h2>ETF Compare</h2>

        <p>
        請選擇兩檔 ETF
        </p>

        `;

        return;
    }

    const etfA =
        selectedETFs[0];

    const etfB =
        selectedETFs[1];

    const a =
        holdingData.filter(
            x =>
                x.ETF_CODE === etfA
        );

    const b =
        holdingData.filter(
            x =>
                x.ETF_CODE === etfB
        );

    const mapA = {};

    a.forEach(row => {

        mapA[row.STOCK_CODE] =
            row;
    });

    const common = [];

    b.forEach(row => {

        if(mapA[row.STOCK_CODE]){

            common.push({

                STOCK_CODE:
                    row.STOCK_CODE,

                STOCK_NAME:
                    row.STOCK_NAME,

                ETF_A_SHARES:
                    mapA[
                        row.STOCK_CODE
                    ].SHARES_AMOUNT,

                ETF_B_SHARES:
                    row.SHARES_AMOUNT

            });
        }
    });

    const overlapPct =
        (
            common.length
            /
            Math.min(
                a.length,
                b.length
            )
        ) * 100;

    let html = `

    <h2>ETF Compare</h2>

    <h3>

    ${etfA}

    VS

    ${etfB}

    </h3>

    <p>
    共同持股數：
    ${common.length}
    </p>

    <p>
    重疊率：
    ${overlapPct.toFixed(2)}%
    </p>

    <table class="detail-table">

    <tr>

        <th>股票</th>

        <th>${etfA}</th>

        <th>${etfB}</th>

    </tr>

    `;

    common
        .slice(0,50)
        .forEach(row => {

            html += `

            <tr>

                <td>

                ${row.STOCK_NAME}

                </td>

                <td>

                ${formatNumber(
                    row.ETF_A_SHARES
                )}

                </td>

                <td>

                ${formatNumber(
                    row.ETF_B_SHARES
                )}

                </td>

            </tr>

            `;
        });

    html += `
    </table>
    `;

    detail.innerHTML =
        html;
}

function filterETF(type){

    if(type==="ALL"){

        renderTable(etfData);

        return;
    }

    renderTable(

        etfData.filter(
            x =>
                String(x.type)
                .toUpperCase()
                .trim()
                ===
                type
        )

    );
}

function formatNumber(value){

    const num =
        Number(value);

    if(isNaN(num))
        return value;

    return num.toLocaleString();
}

document
.getElementById("searchInput")
.addEventListener(
"keyup",
function(){

    const keyword =
        this.value.toLowerCase();

    renderTable(

        etfData.filter(etf =>

            etf.code
                .toLowerCase()
                .includes(keyword)

            ||

            etf.name
                .toLowerCase()
                .includes(keyword)

        )

    );

});

loadETFList();
loadHoldingData();

window.filterETF = filterETF;
window.toggleCompare = toggleCompare;
window.showCompare = showCompare;
