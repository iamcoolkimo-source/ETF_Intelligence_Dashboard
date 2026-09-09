async function loadETFList() {

    const response = await fetch(
        "./data/ALL_ETF_MASTER_V2.csv"
    );

    const text = await response.text();

    const rows = text.split("\n");

    const tbody =
        document.querySelector(
            "#etf-table tbody"
        );

    tbody.innerHTML = "";

    rows.slice(1).forEach(row => {

        if (!row.trim())
            return;

        const cols = row.split(",");

        const tr =
            document.createElement("tr");

        tr.innerHTML = `
            <td>
                <input type="checkbox">
            </td>

            <td>${cols[0]}</td>

            <td>${cols[1]}</td>

            <td>${cols[2]}</td>

            <td>-</td>
            <td>-</td>
            <td>-</td>
        `;

        tbody.appendChild(tr);

    });
}

loadETFList();
