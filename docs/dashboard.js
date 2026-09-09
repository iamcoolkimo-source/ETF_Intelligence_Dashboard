let etfData = [];

async function loadETFList() {

    const response =
        await fetch("./data/WEB_ETF_MASTER.csv");

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
            netflow: cols[4] || "",
            topbuy: cols[5] || "",
            topbuychange: cols[6] || "",
            topsell: cols[7] || "",
            topsellchange: cols[8] || ""

        });

    });

    renderTable(etfData);
}

function renderTable(data) {

    const tbody =
        document.querySelector("#etf-table tbody");

    if (!tbody) return;

    tbody.innerHTML = "";

    data.forEach(etf => {

        const tr =
            document.createElement("tr");

        tr.innerHTML = `
            <td>${etf.code}</td>
            <td>${etf.name}</td>
            <td>${etf.type}</td>
            <td>${etf.provider}</td>
        `;

        tr.onclick = () => {

            const detail =
                document.getElementById(
                    "detail-box"
                );

            if (!detail) return;

            detail.innerHTML = `
                <h2>${etf.code}</h2>

                <h3>${etf.name}</h3>

                <p><b>ETF Type</b><br>
                ${etf.type}</p>

                <p><b>Provider</b><br>
                ${etf.provider}</p>

                <p><b>Net Flow</b><br>
                ${etf.netflow}</p>

                <p><b>Top Buy Stock</b><br>
                ${etf.topbuy}</p>

                <p><b>Top Buy Change</b><br>
                ${etf.topbuychange}</p>

                <p><b>Top Sell Stock</b><br>
                ${etf.topsell}</p>

                <p><b>Top Sell Change</b><br>
                ${etf.topsellchange}</p>
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

                    ||

                    etf.provider
                        .toLowerCase()
                        .includes(keyword)

                    ||

                    etf.type
                        .toLowerCase()
                        .includes(keyword)

                );

            renderTable(filtered);
        }
    );
}

loadETFList();
