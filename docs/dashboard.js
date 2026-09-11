let etfData=[];async function loadETFList(){try{const r=await fetch("./data/WEB_ETF_MASTER_V5.csv");const t=await r.text();const rows=t.trim().split("\n");etfData=[];rows.slice(1).forEach(row=>{const c=row.split(",");etfData.push({code:c[0]||"",name:c[1]||"",type:c[2]||"",listdate:c[3]||"",lotsize:c[4]||"",sector:c[5]||"",assetclass:c[6]||"",topbuy:c[7]||"",netflow:c[8]||""});});renderTable(etfData);}catch(e){console.error(e);}}function renderTable(d){const tb=document.querySelector("#etf-table tbody");tb.innerHTML="";d.forEach(etf=>{const tr=document.createElement("tr");tr.innerHTML=`<td><input type="checkbox"></td><td>${etf.code}</td><td>${etf.name}</td><td>${etf.type}</td><td></td><td>${etf.listdate}</td><td>${etf.lotsize}</td><td>${etf.topbuy}</td><td>${etf.netflow}</td>`;tb.appendChild(tr);});}function filterETF(type){if(type==='ALL'){renderTable(etfData);return;}renderTable(etfData.filter(x=>String(x.type).toUpperCase().trim()===type));}document.getElementById('searchInput').addEventListener('keyup',function(){const k=this.value.toLowerCase();renderTable(etfData.filter(e=>e.code.toLowerCase().includes(k)||e.name.toLowerCase().includes(k)));});loadETFList();window.filterETF=filterETF;

let selectedETFs = [];

function toggleCompare(code){

    const idx =
        selectedETFs.indexOf(code);

    if(idx >= 0){

        selectedETFs.splice(idx,1);

    }else{

        selectedETFs.push(code);

    }

}
