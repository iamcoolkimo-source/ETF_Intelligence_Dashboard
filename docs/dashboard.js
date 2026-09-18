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

    if(!row.trim()){
        return;
    }



        
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

          SHARES_AMOUNT: Number(c[8]) || 0,

          JP_STOCK_NAME: c[11] || ""

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

      if(
          !row.STOCK_CODE ||
          !row.STOCK_NAME
      ){
          return;
      }

      if(mapA[row.STOCK_CODE]){

          common.push({

              STOCK_CODE:
                  row.STOCK_CODE,

              STOCK_NAME:
                  row.STOCK_NAME,

              JP_STOCK_NAME:
                  row.JP_STOCK_NAME,

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
.sort(
    (a,b)=>
    Math.abs(
        b.ETF_A_SHARES -
        b.ETF_B_SHARES
    )
    -
    Math.abs(
        a.ETF_A_SHARES -
        a.ETF_B_SHARES
    )
)
.slice(0,50)




        
        .forEach(row => {

            html += `

            <tr>




               <td>

               <b>
               ${row.STOCK_CODE}
               </b>

               <br>

               ${row.JP_STOCK_NAME || row.STOCK_NAME}

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
window.showBuySellRanking = showBuySellRanking;



async function showBuySellRanking(){

    const detail =
        document.getElementById(
            "detail-content"
        );

    const response =
        await fetch(
            "./data/ETF_BUY_SELL_RANKING.csv"
        );

    const text =
        await response.text();

    const rows =
        text.trim().split("\n");

    const data = [];

    rows.slice(1).forEach(row => {

        if(!row.trim()){
            return;
        }

        const c = row.split(",");

        data.push({

            group: c[0],

            category: c[1],

            rank: c[2],

            code: c[3],

            name: c[4],

            value: c[5]

        });

    });

    let html = `

    <h2>ETF 買賣排行榜</h2>

    `;

    html += buildRankingSection(
        data,
        "ALL",
        "全ETF"
    );

    html += buildRankingSection(
        data,
        "ACTIVE",
        "主動ETF"
    );

    html += buildRankingSection(
        data,
        "PASSIVE",
        "被動ETF"
    );

    detail.innerHTML = html;
}

function buildRankingSection(
    data,
    groupCode,
    title
){

    let html = `

    <hr>

    <h3>${title}</h3>

    `;

    html += createRankingTable(
        data,
        groupCode,
        "BUY_STOCK",
        "📈 買超個股 TOP5"
    );

    html += createRankingTable(
        data,
        groupCode,
        "SELL_STOCK",
        "📉 賣超個股 TOP5"
    );

    html += createRankingTable(
        data,
        groupCode,
        "BUY_SECTOR",
        "📈 買超業種 TOP5"
    );

    html += createRankingTable(
        data,
        groupCode,
        "SELL_SECTOR",
        "📉 賣超業種 TOP5"
    );

    return html;
}

function createRankingTable(
    data,
    groupCode,
    category,
    title
){

    const rows = data.filter(
        x =>

            x.group === groupCode

            &&

            x.category === category
    );

    let html = `

    <h4>${title}</h4>

    <table class="detail-table">

    <tr>

        <th>排名</th>

        <th>代號</th>

        <th>名稱</th>

        <th>數量</th>

    </tr>

    `;

    rows.forEach(row => {

        html += `

        <tr>

            <td>
            ${row.rank}
            </td>

            <td>
            ${row.code}
            </td>

            <td>
            ${row.name}
            </td>

            <td>
            ${formatNumber(row.value)}
            </td>

        </tr>

        `;

    });

    html += `

    </table>

    <br>

    `;

    return html;
}





async function loadAccumulationRanking() {

    const data = await d3.csv(
        "data/ETF_ACCUMULATION_RANKING.csv"
    );

    function render() {

        const windowValue =
            document.getElementById("accWindow").value;

        const groupValue =
            document.getElementById("accGroup").value;

        const filtered =
            data.filter(
                d =>
                    d.WINDOW === windowValue &&
                    d.GROUP === groupValue
            );

        renderTable(
            "buyStockTable",
            filtered.filter(
                d =>
                    d.CATEGORY === "BUY_STOCK"
            ),
            "Top Buy Stocks"
        );

        renderTable(
            "sellStockTable",
            filtered.filter(
                d =>
                    d.CATEGORY === "SELL_STOCK"
            ),
            "Top Sell Stocks"
        );

        renderTable(
            "buySectorTable",
            filtered.filter(
                d =>
                    d.CATEGORY === "BUY_SECTOR"
            ),
            "Top Buy Sectors"
        );

        renderTable(
            "sellSectorTable",
            filtered.filter(
                d =>
                    d.CATEGORY === "SELL_SECTOR"
            ),
            "Top Sell Sectors"
        );
    }

    document
        .getElementById("accWindow")
        .addEventListener("change", render);

    document
        .getElementById("accGroup")
        .addEventListener("change", render);

    render();
}

function renderTable(
    targetId,
    rows,
    title
) {

    let html =
        `<h3>${title}</h3>
         <table>
         <tr>
            <th>Rank</th>
            <th>Code</th>
            <th>Name</th>
            <th>Value</th>
         </tr>`;

    rows.forEach(r => {

        html += `
            <tr>
                <td>${r.RANK}</td>
                <td>${r.CODE}</td>
                <td>${r.NAME}</td>
                <td>${Number(
                    r.VALUE
                ).toLocaleString()}</td>
            </tr>
        `;
    });

    html += "</table>";

    document.getElementById(
        targetId
    ).innerHTML = html;
}


