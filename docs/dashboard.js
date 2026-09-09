async function loadETF() {

    const response =
        await fetch("./data/ALL_ETF_MASTER_V2.csv");

    const text =
        await response.text();

    const rows =
        text.split("\n");

    const tbody =
        document.querySelector(
            "#etf-table tbody"
        );

    document.getElementById(
        "status"
    ).innerText =
        "Rows: " + (rows.length - 1);

    rows.slice(1).forEach(row => {

        if (!row.trim())
            return;

        const cols = row.split(",");

        const tr =
            document.createElement("tr");

        cols.forEach(col => {

            const td =
                document.createElement("td");

            td.textContent = col;

            tr.appendChild(td);

        });

        tbody.appendChild(tr);
    });

}

loadETF();
