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

        if(!row.trim()){
            return;
        }

        const c =
            row.split(delimiter);

        if(c.length < 7){
            return;
        }

        data.push({

            date:
                c[0].trim(),

            group:
                c[1].trim(),

            category:
                c[2].trim(),

            rank:
                c[3].trim(),

            code:
                c[4].trim(),

            name:
                c[5].trim(),

            value:
                c[6].trim()

        });

    });

    return data;
}
