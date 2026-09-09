fetch("../data/ETF_DAILY_REPORT.csv")
    .then(response => response.text())
    .then(text => {

        const rows = text.split("\n");

        const tbody = document.querySelector(
            "#report-table tbody"
        );

        document.getElementById(
            "last-update"
        ).innerHTML =
            "Rows : " + (rows.length - 1);

        rows.slice(1).forEach(row => {

            if (row.trim() === "")
                return;

            const cols = row.split(",");

            const tr = document.createElement("tr");

            cols.forEach(col => {

                const td =
                    document.createElement("td");

                td.innerText = col;

                tr.appendChild(td);

            });

            tbody.appendChild(tr);

        });

    });
