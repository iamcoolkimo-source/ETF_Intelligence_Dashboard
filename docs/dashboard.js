function showYesterdayHot() {

    document.getElementById(
        "detail-content"
    ).innerHTML = `

    <div class="hot-panel">

        <div class="hot-title">
            昨日熱門 ETF
        </div>

        <div class="hot-section">

            <h3>全部 ETF</h3>

            <table class="hot-table">

                <tr>
                    <td>熱門股票</td>
                    <td>日本製鉄</td>
                </tr>

                <tr>
                    <td>熱門產業</td>
                    <td>鉄鋼</td>
                </tr>

                <tr>
                    <td>熱門類型</td>
                    <td>市場型ETF</td>
                </tr>

            </table>

        </div>

        <div class="hot-section">

            <h3>主動 ETF</h3>

            <table class="hot-table">

                <tr>
                    <td>熱門股票</td>
                    <td>いすゞ自動車</td>
                </tr>

                <tr>
                    <td>熱門產業</td>
                    <td>輸送用機器</td>
                </tr>

            </table>

        </div>

        <div class="hot-section">

            <h3>被動 ETF</h3>

            <table class="hot-table">

                <tr>
                    <td>熱門股票</td>
                    <td>日本製鉄</td>
                </tr>

                <tr>
                    <td>熱門產業</td>
                    <td>鉄鋼</td>
                </tr>

            </table>

        </div>

    </div>

    `;
}
