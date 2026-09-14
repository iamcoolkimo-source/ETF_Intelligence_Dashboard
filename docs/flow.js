async function loadHistory() {

    const response =
        await fetch(
            "./data/ETF_BUY_SELL_HISTORY.csv"
        );

    const text =
        await response.text();

    const rows =
        text.trim().split("\n");

    const header =
        rows[0];

    const delimiter =
        header.includes("\t")
        ? "\t"
        : ",";

    const data = [];

    rows.slice(1).forEach(row => {

        if (!row.trim()) {
            return;
        }

        const c =
            row.split(delimiter);

        if (c.length < 7) {
            return;
        }

        data.push({

            date: c[0].trim(),

            group: c[1].trim(),

            category: c[2].trim(),

            rank: c[3].trim(),

            code: c[4].trim(),

            name: c[5].trim(),

            value: c[6].trim()

        });

    });

    return data;
}

function buildMatrixTable(
    data,
    group,
    category,
    title,
    dates
) {

    let html = `

    <div class="matrix-section">

    <h3>${title}</h3>

    <table class="matrix-table">

        <tr>

            <th>Rank</th>

    `;

    dates.forEach(date => {

        html += `
            <th>${date}</th>
        `;

    });

    html += `
        </tr>
    `;

    for (let rank = 1; rank <= 5; rank++) {

        html += `
            <tr>

                <td>${rank}</td>
        `;

        dates.forEach(date => {

            const row = data.find(

                x =>

                    x.date === date &&

                    x.group === group &&

                    x.category === category &&

                    Number(x.rank) === rank

            );

            html += `
                <td>

                ${
                    row
                    ?
                    `<b>${row.code}</b><br>${row.name}`
                    :
                    "-"
                }

                </td>
            `;

        });

        html += `
            </tr>
        `;

    }

    html += `
        </table>

    </div>
    `;

    return html;
}

async function showDaily() {

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

    let html = "";

    html += buildMatrixTable(

        data,

        "ALL",

        "BUY_STOCK",

        "全ETF 買超TOP5",

        dates

    );

    html += buildMatrixTable(

        data,

        "ALL",

        "SELL_STOCK",

        "全ETF 賣超TOP5",

        dates

    );

    html += buildMatrixTable(

        data,

        "ACTIVE",

        "BUY_STOCK",

        "主動ETF 買超TOP5",

        dates

    );

    html += buildMatrixTable(

        data,

        "ACTIVE",

        "SELL_STOCK",

        "主動ETF 賣超TOP5",

        dates

    );

    html += buildMatrixTable(

        data,

        "PASSIVE",

        "BUY_STOCK",

        "被動ETF 買超TOP5",

        dates

    );

    html += buildMatrixTable(

        data,

        "PASSIVE",

        "SELL_STOCK",

        "被動ETF 賣超TOP5",

        dates

    );

    document.getElementById(
        "flow-content"
    ).innerHTML = html;
}

window.showDaily = showDaily;

showDaily();
