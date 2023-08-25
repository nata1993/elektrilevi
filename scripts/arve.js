// Apply cookies when page has loaded
document.addEventListener("DOMContentLoaded", function(event){
  GetMüügiMarginaalCookie("marginaal");
  GetOstuMarginaalCookie("tmarginaal");
});

var u_kw = [], u_summa = 0, el_paev = 0, el_oo = 0, el_paev_tipp = 0, el_puhke_tipp = 0;
 const el_hinnad =
 [
  [5.53,6.65,3.86,[141,254,295,335,391,455,535,639],4.35,2.52,[200,370,455,535,647, 775, 935,1143],2.83,1.62,[489,1034,1259,1519,1883,2299,2819,3495],3.95,6.07,2.26,3.52,[218,403,496,583,705, 845,1019,1246]],
  [6.26,7.53,4.38,[160,287,334,379,443,515,606,725],4.92,2.85,[227,419,515,606,734, 878,1059,1295],3.20,1.83,[554,1171,1429,1721,2134,2605,3195,3960],4.47,6.88,2.57,3.99,[247,457,561,660,799, 957,1155,1411]],
	[6.38,7.68,4.47,[163,293,341,387,452,525,618,739],5.02,2.90,[232,427,525,618,749, 895,1080,1321],3.26,1.86,[565,1194,1455,1755,2176,2657,3259,4039],4.55,7.02,2.61,4.07,[252,466,572,673,815, 976,1178,1439]],
	[7.21,8.68,5.05,[184,331,385,437,511,593,699,835],5.67,3.28,[262,483,593,699,847,1012,1221,1493],3.69,2.10,[639,1350,1645,1984,2460,3003,3684,4566],5.14,7.94,2.95,4.60,[285,527,647,761,921,1103,1332,1627]]
];

function csvToArray(text) {
  let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
  for (l of text) {
    if ('"' === l) {
      if (s && l === p) row[i] += l;
      s = !s;
    }
    else if (',' === l && s) l = row[++i] = '';
    else if ('\n' === l && s) {
      if ('\r' === p) row[i] = row[i].slice(0, -1);
      row = ret[++r] = [l = '']; i = 0;
    }
      else row[i] += l;
      p = l;
  }
  return ret;
};
  
function addRow(row_nr, Row_value) {
  var tableRef = document.querySelector("#extension_table");
  tableRef.innerHTML = tableRef.innerHTML + Row_value;
}

function display(msg) {
  let table_element = document.getElementById("extension_table");
  table_element.style.marginTop = "20px";
  var rida = { hind:[0] }, rows = csvToArray(msg);
  var rowNum, row, KP = "", r_date, priceRow, algus = 5, tootmine = 1, toodang = 0, tarbimine = 0;
  var cells, arve_summa = 0, kogu_kw = 0, kogu_ukw = 0, paeva_kw = [],  t_summa = 0, t_usumma = 0, week_day = 0;  //        var cellNum;
  cells = rows[0][0].split(";");
  if ( cells[0] == "EIC" ) { algus = 4; tootmine = 4 }; // elektrilevi
  if ( cells[0] == "Kuupäev" ) { alert ( "Palun kasuta https://estfeed.elering.ee/ andmelao andmeid." ); return 1; }; // Alexela
  cells = rows[4][0].split(";");
  if ( cells[1].includes("Toodetud" ) ) { tarbimine = 0; }
  if ( cells[1].includes("Tarbitud" ) ) { tarbimine = 1; u_kw = []; u_summa = 0; }
  cells = rows[algus-1][0].split(";");
  console.log ( "ALGUS " + algus + rows[0] + " " + tootmine + " C " + cells[1] );
  //  if ( /^tarbi/.exec(cells[1]) ) { tarbimine = 1; alert ( "Leidsin esimesena tarbimise" ); }; // tarbimine
  
  var first_row_time = rows[algus].join().slice(11,16);
  if  ( first_row_time != "00:00" ) {
    alert ( "Palun kontrolli oma ajasätteid, ega\nFirefoxis about:config -> privacy.resistFingerprinting pole sisse lülitatud?\nTe tunnitarbimise algusaeg pole 00:00");
  }
  addRow(0, "<th colspan='2'>KUUP&Auml;EV</th><th>00-01</th><th>01-02</th><th>02-03</th><th>03-04</th><th>04-05</th><th>05-06</th><th>06-07</th><th>07-08</th><th>08-09</th><th>09-10</th><th>10-11</th><th>11-12</th>" +
          "<th>12-13</th><th>13-14</th><th>14-15</th><th>15-16</th><th>16-17</th><th>17-18</th><th>18-19</th><th>19-20</th><th>20-21</th><th>21-22</th><th>22-23</th><th>23-00</th><th>KOKKU</th>");
  for (rowNum = algus; rowNum < rows.length; ++rowNum) {
    //      row = rows[rowNum].join();
    cells = rows[rowNum].join().split(";"); 
    r_date = cells[0].replace(/(\d{2})\.(\d{2})\.(\d{4}) [A-Za-z0-9.,-:]*/, '$3-$2-$1'); //split(" ");
    if ( !KP ) {
      KP = r_date;
      var yesterday = new Date(Date.parse(KP) - 1000*3600*24).toJSON().slice(0,10), reads;
    }
    if ( KP != r_date ) {
      GetPrice(yesterday , KP, paeva_kw );
      yesterday = new Date(Date.parse(KP)).toJSON().slice(0,10), reads;
      KP = r_date;
      paeva_kw = [];
    } //  if KP
    if (cells.length <= tootmine) { tootmine = 2 };
    //	      console.log ( tootmine + cells + " " + cells.length + " " + cells[1] + "X" + cells[tootmine] );
    toodang = cells[tootmine].replace(",", ".");
    paeva_kw.push(toodang);
  } // for rowNum
  KP = new Date(Date.parse(r_date)).toJSON().slice(0, 10);
  GetPrice(yesterday , KP ,paeva_kw);
  console.log( Math.round(rowNum/24) + " " + rowNum + " " + paeva_kw );

  function GetPrice(start_time,end_time, kws) {
    wd = new Date(r_date);
    week_day = wd.getDay();
    if ( tarbimine ) {
      if ( week_day == 0 || week_day == 6 ) {
        el_oo += 1*kws[0] + 1*kws[1] + 1*kws[2] + 1*kws[3] + 1*kws[4] + 1*kws[5] + 1*kws[6] + 1*kws[7] + 1*kws[8] + 1*kws[9]+ 1*kws[10]+
                1*kws[11] + 1*kws[12] + 1*kws[13] + 1*kws[14] + 1*kws[15] + 1*kws[20] + 1*kws[21] + 1*kws[22]+ (kws[23]) ? (1*kws[23]) : (0);
        el_puhke_tipp += 1*kws[16] + 1*kws[17] + 1*kws[18] + 1*kws[19];
        console.log(r_date +" 1 " + el_puhke_tipp + " 2 " + el_oo +  " 3 " + kws);
      }
      else {
        el_oo += 1*kws[0] + 1*kws[1] + 1*kws[2] + 1*kws[3] + 1*kws[4] + 1*kws[5] + 1*kws[6] + 1*kws[22];
        if ( kws[23] ) { el_oo += 1*kws[23]; }  // kellakeeramine ja puuduolev tund
        el_paev += 1*kws[7] + 1*kws[8] + 1*kws[12] + 1*kws[13] + 1*kws[14] + 1*kws[15] + 1*kws[20] + 1*kws[21];
        el_paev_tipp += 1*kws[9] + 1*kws[10]+ 1*kws[11] + 1*kws[16] + 1*kws[17] + 1*kws[18] + 1*kws[19];
      }
    }
    //	console.log("KWs"+kws);
    //	console.log("u KWs" + ukws);	     
    function transferComplete(evt) {
      answer(xhr.status == 200 ? xhr.responseText : null);
    }
    var xhr = new XMLHttpRequest();
    var i, hind; 
    xhr.onreadystatechange = handleStateChange;
    // "https://dashboard.elering.ee/api/nps/price/csv?start=2020-12-31T21:00:00.000Z&end=2021-01-01T20:59:59.999Z&fields=ee");
    //             console.log( "DAY " + Date(start_time) + " " + end_time + " " + kws );
    a1 = new Date(end_time); 
    if ( a1.getTimezoneOffset() == -180 ) {
      xhr.open("GET", "https://dashboard.elering.ee/api/nps/price/csv?start="+ start_time+"T21:00:00.000Z&end="+end_time+"T20:59:59.999Z&fields=ee"); // - suveajal
    }
    else {
      xhr.open("GET", "https://dashboard.elering.ee/api/nps/price/csv?start="+ start_time+"T22:00:00.000Z&end="+end_time+"T21:59:59.999Z&fields=ee"); // talveajal
      //		   		  	console.log("TALV "+ a1.getTimezoneOffset() );
    }
    xhr.send();  

    function handleStateChange() {
      var rows, cells;
      if ( xhr.readyState == 4 ) { 
        var vahe_summa = 0, vahe_kw = 0, vahe_ukw = 0, vahe_t_summa = 0, marginaal = 0;
        let tekst = (tarbimine) ? "tarbimine" : "tootmine";
        let p_row1 = "<tr><td>" + end_time + "</td><td></td>", p_row2 = "<tr><td></td><td>" + tekst+ "</td>", p_row3 = "<tr><td></td><td>€ senti</td>";
        rows = [];
        rows = csvToArray(xhr.responseText);
        //             console.log( "Kilowats " + start_time + " " + end_time + " " + kws );
        //             console.log( "PRICE" + rows.length + " " + rows[1] );
        marginaal = (tarbimine) ? document.getElementById("tmarginaal").value * -1 : document.getElementById("marginaal").value;
        for (i = 1; i < rows.length-1 && i <= kws.length; i++) {
          cells = rows[i][0].split(";");
          hind = cells[2].replace(",",".");
          vahe_summa += Math.round( kws[i-1]*hind*100 );
          vahe_t_summa += Math.trunc( kws[i-1]*(hind-marginaal*10)*100 );
          vahe_kw += Math.round(kws[i-1]*1000);
          p_row1 += "<td>" + hind + "</td>";
          p_row2 += "<td>" + kws[i-1] + "</td>";
          p_row3 += "<td>" +Math.round( kws[i-1]*hind*10 )/10 + "</td>";
        }
        p_row1 = p_row1 + "<td></td></tr>";
        p_row2 = p_row2 + "<td>" + Math.round(vahe_kw * 10/1000)/10 + " kWh </td></tr>";						
        p_row3 = p_row3 + "<td>" + Math.round(vahe_summa) + "</td></tr>";			
        addRow(-1,  p_row1);
        addRow(-1,  p_row2);
        addRow(-1,  p_row3);
        kogu_kw += vahe_kw;
        if ( tarbimine) {
          u_summa += vahe_summa;
          t_usumma += vahe_t_summa;
          document.getElementById("ukw").innerHTML = Math.round(kogu_kw/10)/100;
          document.getElementById("usumma").innerHTML = -Math.round(u_summa/100)/1000;
          document.getElementById("usumma_km").innerHTML = -Math.round(u_summa/100*1.2)/1000;
          document.getElementById("m_usumma").innerHTML = Math.round(kogu_kw*marginaal/1000)/100;
          document.getElementById("m_usumma_km").innerHTML = Math.round(kogu_kw*marginaal/1000*1.2)/100;
          document.getElementById("t_usumma").innerHTML = -Math.round(t_usumma/100)/1000;
          document.getElementById("t_usumma_km").innerHTML = -Math.round(t_usumma/1000*1.2)/100;
        }
        else {
          arve_summa += vahe_summa;
          t_summa += vahe_t_summa;
          document.getElementById("summa").innerHTML = Math.round(arve_summa/1000)/100;
          document.getElementById("summa_km").innerHTML = Math.round(arve_summa/1000*1.2)/100;
          document.getElementById("kw").innerHTML = Math.round(kogu_kw/10)/100;
          document.getElementById("m_summa").innerHTML = -Math.round(kogu_kw*marginaal/1000)/100;
          document.getElementById("m_summa_km").innerHTML = -Math.round(kogu_kw*marginaal/1000*1.2)/100;
          document.getElementById("t_summa").innerHTML = Math.round(t_summa/100)/1000;
          document.getElementById("t_summa_km").innerHTML = Math.round(t_summa/1000*1.2)/100;
        }
        Checkboks();
      }
    }; // handleStateChange
  } // GetPrice
} // display
  
function readFile(input) {
  let file = input.files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function() {
    display(reader.result);
  };
  reader.onerror = function() {
    console.log(reader.error);
  };
}
   
  
function kuva() {
  var yesterday = new Date(kp).toJSON().slice(0,10), reads;
  var utc = new Date(kp + 1000*3600*24).toJSON().slice(0,10);
  GetPrice(yesterday,utc,null,function(reads) {
    alert ( "READS " + reads );       
  });
  var rida = showData(reads);
  var data = {
    labels: rida.aeg ,
    series: [ 
      {
        name: 'HIND',
        data: rida.hind
      }
    ]
  };
  new Chartist.Line('.ct-chart', data, {
    high: Math.ceil(Math.max.apply(Math,rida.hind)/10)*10,
    low: 0,
    showPoint: false,
    axisY: {
      Offset: 20,
      onlyInteger: true
    },
    series: { 'HIND': { lineSmooth: Chartist.Interpolation.step() } } // Näitab hind ühtlaselt tunni jooksul
  }); // Chartist.Line    
} // kuva 

function showData(data) {
  var _utc = [], _aeg = [], _hind = [];
  var rows = csvToArray(data);
  var rowNum;
  var cells; 
  //        var cellNum;
  for (rowNum = 1; rowNum < rows.length-1; ++rowNum) {
    cells = rows[rowNum][0].split(";");
    _utc.push(cells[0]);
    _aeg.push(cells[1].substr(-5,5));
    _hind.push(cells[2].replace(",","."));
  } // for rowNum
  return {
    utc: _utc,
    aeg: _aeg,
    hind: _hind
  };
} // showData
  
function Checkboks() {
  var i = 0;
  var cb = document.querySelectorAll('input[name="chk"]:checked');
  cb.forEach((checkbox) => { i += Number(document.getElementById(checkbox.value).innerHTML); });
  document.getElementById("kokku").innerHTML = i;
  document.getElementById("kokku_km").innerHTML = i * 1.2;
  var summa = document.getElementById("summa"), kw = document.getElementById("kw");
  document.getElementById("t_kesk").innerHTML = Math.round( summa.innerHTML/ kw.innerHTML*1000)/1000;
  document.getElementById("t_kesk_km").innerHTML = Math.round(summa_km.innerHTML / kw.innerHTML*1000)/1000;
  document.getElementById("u_kesk").innerHTML = Math.round(Math.sign(summa.innerHTML)*Math.abs( summa.innerHTML )/ kw.innerHTML *1000)/1000;
  document.getElementById("u_kesk_km").innerHTML = Math.round(Math.sign(summa.innerHTML)*Math.abs(usumma_km.innerHTML) / kw.innerHTML *1000)/1000;
}
  
function UT() { var  ukw = document.getElementById("ukw").innerHTML;
  // console.log ( ukw );
  document.getElementById("UT_220").innerHTML = Math.round( Math.abs(ukw*1919) ) /100 + 199;
  document.getElementById("UT_EE").innerHTML = Math.round( Math.abs(ukw*1924) ) /100 + 199;
  document.getElementById("UT_EG").innerHTML = Math.round( Math.abs(ukw*1915) ) /100 + 195;
  document.getElementById("UT_Elektrum").innerHTML = Math.round( Math.abs(ukw*1972) ) /100 + 185;
  document.getElementById("UT_VKG").innerHTML = Math.round( Math.abs(ukw*1995) ) /100;
  document.getElementById("UT_eT").innerHTML = Math.round( Math.abs(ukw*1910) ) /100;
}

function VT() {
  var kaitse = document.querySelector('#KAITSE').selectedIndex, aja_valik = document.querySelector('#AEG').selectedIndex;
  console.log ( "VT ARVUTAMINE", kaitse, el_paev , el_paev_tipp , el_oo, el_puhke_tipp, el_hinnad[aja_valik][6][kaitse], " XXX ", el_hinnad[aja_valik][1]*( el_paev*1 + el_paev_tipp*1), el_hinnad[aja_valik][2]*(el_oo*1 + el_puhke_tipp*1) );
  document.getElementById("v1").innerHTML = ( Math.round( el_hinnad[aja_valik][0]*( el_paev*1 + el_paev_tipp*1 + el_oo*1 + el_puhke_tipp*1)));
  document.getElementById("v2").innerHTML = ( Math.round( el_hinnad[aja_valik][1]*( el_paev*1 + el_paev_tipp*1)) + Math.round(el_hinnad[aja_valik][2]*(el_oo*1 + el_puhke_tipp*1)));
  document.getElementById("v2k").innerHTML = ( Math.round( el_hinnad[aja_valik][4]*( el_paev*1 + el_paev_tipp*1)) + Math.round(el_hinnad[aja_valik][5]*(el_oo*1 + el_puhke_tipp*1)) + el_hinnad[aja_valik][6][kaitse] );
  document.getElementById("v4").innerHTML = ( Math.round( el_hinnad[aja_valik][7]*( el_paev*1 + el_paev_tipp*1)) + Math.round(el_hinnad[aja_valik][8]*(el_oo*1 + el_puhke_tipp*1)) + el_hinnad[aja_valik][9][kaitse] );
  document.getElementById("v5").innerHTML = ( Math.round( el_hinnad[aja_valik][10]*el_paev*1) + Math.round(el_hinnad[aja_valik][11]*el_paev_tipp*1) + Math.round(el_hinnad[aja_valik][12]*el_oo*1) + Math.round(el_hinnad[aja_valik][13]*el_puhke_tipp*1) + el_hinnad[aja_valik][14][kaitse] );
}

// Set cookies
function setMüügiMarginaalCookie(id) {
  const element = document.getElementById(id);
  let value = element.value;
  const isError = simpleSanitizer(value);
  if(isError !== "error") {
      value = value.replace(",", ".");
      element.value = value;
      console.log("hye");
      localStorage.setItem("MüügiMarginaal", value);
  }
}

function setOstuMarginaalCookie(id) {
  const element = document.getElementById(id);
  const value = element.value;
  const isError = simpleSanitizer(value);
  if(isError !== "error") {
      value = value.replace(",", ".");
      element.value = value;
      console.log("hye");
      localStorage.setItem("OstuMarginaal", value);
  }
}

function GetMüügiMarginaalCookie(id) {
  const element = document.getElementById(id);
  element.value = localStorage.getItem("MüügiMarginaal");
}
function GetOstuMarginaalCookie(id) {
  const element = document.getElementById(id);
  element.value = localStorage.getItem("OstuMarginaal");
}

// Väga lihtsustatud sisendi puhastus kasutaja müksamisega sisestamaks marginaali arvu korrektses arvuvormis.
// Toimib põhimõttel, et kui on rohkem kui üks komakoht arvus, siis see ei ole enam arv kujul, mida me vajame.
function simpleSanitizer(value) {
  const length = value.length;
  let dot = 0;
  for(let i = 0; i < length; i++) {
    if(value[i] === ",") {
      value = value.replace(",", ".");
    }
  }
  for(let i = 0; i < length; i++) {
    if(value[i] === ".") {
      dot++;
    } 
  }

  if(dot > 1) {
    alert("Sisesta marginaal korrektse arvväärtusena - punkt komakoha eraldajana!");
    return "error";
  }
  return value;
}