let etfData = [];

async function loadETFList() {

    const response =
        await fetch("./data/WEB_ETF_MASTER_V3.csv");

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

            topbuy: cols[4] || "",

            netflow: cols[5] || ""

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

        <td>${etf.topbuy}</td>

        <td>${etf.netflow}</td>

        `;

        tr.onclick = () => {

            document.getElementById(
                "detail-box"
            ).innerHTML = `

                <h2>${etf.code}</h2>

                <h3>${etf.name}</h3>

                <p>
                    ETF Type :
                    ${etf.type}
                </p>

                <p>
                    Provider :
                    ${etf.provider}
                </p>

                <p>
                    Top Buy :
                    ${etf.topbuy}
                </p>

                <p>
                    Net Flow :
                    ${etf.netflow}
                </p>

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
            x =>
                x.type
                    .toUpperCase()
                    .trim()
                ===
                type
        );

    renderTable(filtered);
}

document
.getElementById(
    "searchInput"
)
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

                ||

                etf.provider
                   .toLowerCase()
                   .includes(keyword)

            );

        renderTable(filtered);
    }
);

loadETFList();
