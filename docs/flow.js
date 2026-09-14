async function loadHistory() {

    const response =
        await fetch(
            "./data/ETF_BUY_SELL_HISTORY.csv"
        );

    console.log(
        "status:",
        response.status
    );

    const text =
        await response.text();

    const rows =
        text.trim().split("\n");

    const data = [];

    rows.slice(1).forEach(row => {

        if (!row.trim()) {
            return;
        }

        const c = row.split(",");

        // ETF_BUY_SELL_HISTORY.csv
        // GROUP,CATEGORY,RANK,CODE,NAME,VALUE,SNAPSHOT_DATE

        data.push({

          date: c[0],

          group: c[1],

          category: c[2],

          rank: c[3],

          code: c[4],

          name: c[5],

          value: c[6]

      });

    });

    console.log(
        "Records:",
        data.length
    );

    return data;
}

function buildTable(rows, title) {

    let html = `

    <h4>${title}</h4>

    <table class="detail-table">

        <tr>
            <th>Rank</th>
            <th>Code</th>
            <th>Name</th>
            <th>Value</th>
        </tr>

    `;

    rows.forEach(row => {

        html += `

        <tr>

            <td>${row.rank}</td>

            <td>${row.code}</td>

            <td>${row.name}</td>

            <td>
                ${Number(row.value).toLocaleString()}
            </td>

        </tr>

        `;

    });

    html += `
    </table>
    `;

    return html;
}

async function showDaily() {

    try {

        const data =
            await loadHistory();

        const dates = [

            ...new Set(
                data.map(
                    x => x.date
                )
            )

        ]
        .sort()
        .reverse()
        .slice(0, 5);

        console.log(data[0]);
        console.log(dates);

        
        console.log(
            "Dates:",
            dates
        );

        let html = "";

        dates.forEach(date => {

            html += `

            <div class="date-block">

                <h2>${date}</h2>

                <div class="flow-grid">

            `;

            html += buildTable(

                data.filter(
                    x =>
                        x.date === date &&
                        x.group === "ALL" &&
                        x.category === "BUY_STOCK"
                ),

                "全ETF 買超TOP5"

            );

            html += buildTable(

                data.filter(
                    x =>
                        x.date === date &&
                        x.group === "ALL" &&
                        x.category === "SELL_STOCK"
                ),

                "全ETF 賣超TOP5"

            );

            html += buildTable(

                data.filter(
                    x =>
                        x.date === date &&
                        x.group === "ACTIVE" &&
                        x.category === "BUY_STOCK"
                ),

                "主動ETF 買超TOP5"

            );

            html += buildTable(

                data.filter(
                    x =>
                        x.date === date &&
                        x.group === "ACTIVE" &&
                        x.category === "SELL_STOCK"
                ),

                "主動ETF 賣超TOP5"

            );

            html += buildTable(

                data.filter(
                    x =>
                        x.date === date &&
                        x.group === "PASSIVE" &&
                        x.category === "BUY_STOCK"
                ),

                "被動ETF 買超TOP5"

            );

            html += buildTable(

                data.filter(
                    x =>
                        x.date === date &&
                        x.group === "PASSIVE" &&
                        x.category === "SELL_STOCK"
                ),

                "被動ETF 賣超TOP5"

            );

            html += `

                </div>

            </div>

            `;

        });

        document.getElementById(
            "flow-content"
        ).innerHTML = html;

    }

    catch(error) {

        console.error(error);

        document.getElementById(
            "flow-content"
        ).innerHTML = `
            <h3>Error</h3>
            <pre>${error}</pre>
        `;
    }
}

showDaily();

window.showDaily = showDaily;
