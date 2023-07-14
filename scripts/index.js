function arvuta() {
    const hind = [ 
    [1.13, 0.447,  5.12, 6.16, 3.58, 4.23, 2.46, 2.28, 2.74, 1.58],
    [1.13, 0.1,  5.12, 6.16, 3.58, 4.23, 2.46, 2.28, 2.74, 1.58,],
    [1.04, 0.447, 5.28, 6.35, 3.69, 5.13, 2.98, 2.98, 3.58, 2.06],
    [0.89, 0.447, 5.28, 6.35, 3.69, 5.13, 2.98, 2.98, 3.58, 2.06],
    [1.13, 0.447,  5.12, 6.16, 3.58, 4.23, 2.46, 2.28, 2.74, 1.58],
    [1.13, 0.1,    5.53, 6.65, 3.86, 4.35, 2.52, NULL, 2.83, 1.62],
    [1.13, 0.447,  5.12, 6.16, 3.58, 4.23, 2.46, 2.28, 2.74, 1.58],
    [1.13, 0.447,  5.12, 6.16, 3.58, 4.23, 2.46, 2.28, 2.74, 1.58],
    [1.13, 0.447,  5.12, 6.16, 3.58, 4.23, 2.46, 2.28, 2.74, 1.58]
    ];
    const kuutasu = [ 
    [
        [ 125, 246,  285,  320,  369,  425,  495,  586],
        [ 184, 333,  410,  480,  578,  690,  830, 1012],
        [ 458, 988, 1201, 1446, 1788, 2180, 2670, 3307],
        [ NULL, , , , , , , ]
    ],
    [
        [ 125, 246,  285,  320,  369,  425,  495,  586],
        [ 184, 333,  410,  480,  578,  690,  830, 1012],
        [ 458, 988, 1201, 1446, 1788, 2180, 2670, 3307],
        [ NULL, , , , , , , ]
    ],
    [
        [ 125, 246,  285,  320,  369,  425,  495,  586],
        [ 125, 246,  285,  320,  369,  425,  495,  586],
        [ 419, 888, 1086, 1306, 1614, 1966, 2406, 2978],
        [ NULL, , , , , , , ]
    ],
    [
        [ 125, 246,  285,  320,  369,  425,  495,  586],
        [ 125, 246,  285,  320,  369,  425,  495,  586],
        [ 419, 888, 1086, 1306, 1614, 1966, 2406, 2978],
        [ NULL, , , , , , , ]
    ],
    [
        [ 125, 246,  285,  320,  369,  425,  495,  586],
        [ 184, 333,  410,  480,  578,  690,  830, 1012],
        [ 458, 988, 1201, 1446, 1788, 2180, 2670, 3307],
        [ NULL, , , , , , , ]
    ],
    [
        [ 141, 254,   295,  335,  391,  455,  535,  639],
        [ 200, 370,   455,  535,  647,  775,  935, 1143],
        [ 489, 1034, 1259, 1519, 1883, 2299, 2819, 3495],
        [ 218, 403,   496,  583,  705,  845, 1019, 1246]
    ]
    ];
    const aasta = document.getElementById("aasta").value;
    
    document.getElementById('tt').value = Math.round(Number(document.getElementById("kokkukW").value) * Number(hind[aasta][0])*100)/100;
    document.getElementById('ak').value = Math.round(Number(document.getElementById("kokkukW").value) * Number(hind[aasta][1])*100)/100;
    document.getElementById('v1').value = Math.round(Number(document.getElementById("kokkukW").value) * Number(hind[aasta][2])*100)/100;
    document.getElementById('v2').value = Math.round( ( Number(document.getElementById("p").value) * Number(hind[aasta][3]) + Number(document.getElementById("o").value) * Number(hind[aasta][4]) )*100)/100;
    document.getElementById('v3').value = Math.round( ( Number(document.getElementById("kokkukW").value) * Number(hind[aasta][7]) )*100)/100 + kuutasu[aasta][2][document.getElementById("kaitse").value];
    document.getElementById('v4').value = Math.round( ( Number(document.getElementById("p").value) * Number(hind[aasta][8]) + Number(document.getElementById("o").value) * Number(hind[aasta][9]) )*100)/100 + kuutasu[aasta][2][document.getElementById("kaitse").value];
    document.getElementById('v5').value = Math.round( ( Number(document.getElementById("p").value) * Number(hind[aasta][5]) + Number(document.getElementById("o").value) * Number(hind[aasta][6]) )*100)/100 + kuutasu[aasta][1][document.getElementById("kaitse").value];
    const tt_ak= document.getElementById('tt').value + document.getElementById('ak').value;
    
    document.getElementById('v1').innerHTML = document.getElementById('v1').value;
    document.getElementById('v2').innerHTML = document.getElementById('v2').value;
    document.getElementById('v3').innerHTML = document.getElementById('v3').value;
    document.getElementById('v4').innerHTML = document.getElementById('v4').value;
    document.getElementById('v5').innerHTML = document.getElementById('v5').value;
    document.getElementById('tt').innerHTML = document.getElementById('tt').value;
    document.getElementById('ak').innerHTML = document.getElementById('ak').value;

    document.getElementById('v1k').innerHTML = Math.round(1.2 * (Number(document.getElementById("v1").value) + tt_ak ) );
    document.getElementById('v2k').innerHTML = Math.round(1.2 * (Number(document.getElementById("v2").value) + tt_ak ) );
    document.getElementById('v3k').innerHTML = Math.round(1.2 * (Number(document.getElementById("v3").value) + tt_ak ) );
    document.getElementById('v4k').innerHTML = Math.round(1.2 * (Number(document.getElementById("v4").value) + tt_ak ) );
    document.getElementById('v5k').innerHTML = Math.round(1.2 * (Number(document.getElementById("v5").value) + tt_ak ) ); 
}

function summa() {
    let p = document.getElementById("p");
    let o = document.getElementById("o");
    if(/(,)/.test(p) || /(,)/.test(o)) {
        return alert("AAA");
    }

    return Math.round(100*(Number(p.value) + Number(o.value)))/100;
}
