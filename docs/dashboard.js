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

        const name = cols[1] || "";

        const upperName =
            name.toUpperCase();

        let etfType =
            "PASSIVE";

        if (
            upperName.includes("ACTIVE")
        ) {

            etfType =
                "ACTIVE";
        }

        etfData.push({

          code: cols[0],

          name: cols[1],

          type: cols[2],

          provider: cols[3]

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

            <td>${etf.type}</td>
            <td>${etf.provider}</td>

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
                ${etf.type}
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

function filterETF(type) {

    if (type === "ALL") {

        renderTable(
            etfData
        );

        return;
    }

    const filtered =
        etfData.filter(
            x => x.type === type
        );

    renderTable(
        filtered
    );
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

                etf.type
                   .toLowerCase()
                   .includes(keyword)

            );

        renderTable(filtered);

    }
);

loadETFList();
