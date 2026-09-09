let etfData = [];

async function loadETFList() {

    const response =
        await fetch("./data/ALL_ETF_MASTER_V2.csv");

    const text =
        await response.text();

    const rows =
        text.split("\n");

    etfData = [];

    rows.slice(1).forEach(row => {

        if (!row.trim())
            return;

        const cols = row.split(",");

        const etfType =
            cols[1].toUpperCase().includes("ACTIVE")
            ? "ACTIVE"
            : "PASSIVE";

        etfData.push({

            code: cols[0],

            name: cols[1],

            source: cols[2],

            etf_type: etfType

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

            <td>${etf.code}</td>

            <td>${etf.name}</td>

            <td>${etf.etf_type}</td>

            <td>${etf.source}</td>

        `;

        tr.onclick = () => {

            document.getElementById(
                "detail-box"
            ).innerHTML = `

                <h2>${etf.code}</h2>

                <p>
                    <b>ETF Name</b><br>
                    ${etf.name}
                </p>

                <p>
                    <b>ETF Type</b><br>
                    ${etf.etf_type}
                </p>

                <p>
                    <b>Source</b><br>
                    ${etf.source}
                </p>

                <hr>

                <p>
                    ETF Detail Page<br>
                    Coming Soon
                </p>

            `;
        };

        tbody.appendChild(tr);

    });
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

                etf.source
                   .toLowerCase()
                   .includes(keyword)

                ||

                etf.etf_type
                   .toLowerCase()
                   .includes(keyword)

            );

        renderTable(filtered);

    }
);

loadETFList();
