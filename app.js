// FX Watchlist Main Engine


let data = {};
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const API_URL = 
"https://open.er-api.com/v6/latest/USD";


// Load currency database

async function loadCurrencies(){

    const local =
    await fetch("currencies.json");

    data =
    await local.json();


    const live =
    await fetch(API_URL);

    const liveData =
    await live.json();


    if(liveData.rates){

        data.rates =
        liveData.rates;

        data.updated =
        new Date().toLocaleString();

    }


    renderCurrencies();

    setupConverter();


    document.getElementById("last-update").innerHTML =
    "Last update: " + data.updated;

}


    document.getElementById("last-update").innerHTML =
    "Last update: " + data.updated;

}



loadCurrencies();




// Calculate exchange rate

function exchange(from,to){

    let usdFrom = data.rates[from];

    let usdTo = data.rates[to];


    return usdTo / usdFrom;

}





// Display currency dashboard

function renderCurrencies(search=""){


    const container =
    document.getElementById("currency-list");


    container.innerHTML="";



    [
"MYR",
"SGD",
"HKD",
"USD",
"CNY",
"JPY",
"EUR",
"GBP",
"AUD",
"NZD",
"THB",
"IDR",
"PHP",
"VND",
"INR",
"AED",
"SAR",
"CHF",
"CAD",
"KRW",
"TWD",
"ZAR",
"BRL",
"MXN",
"TRY",
"RUB"

].forEach(base=>{


        let name =
        data.currencies[base];



        if(
            search &&
            !base.toLowerCase()
            .includes(search.toLowerCase()) &&
            !name.toLowerCase()
            .includes(search.toLowerCase())
        ){

            return;

        }



        let html = `

        <div class="card">

        <div class="country-title">

        ${base} — ${name}

        </div>

        `;



        Object.keys(data.currencies)
        .forEach(target=>{


            if(base===target)
            return;



            if(
            search &&
            !target.toLowerCase()
            .includes(search.toLowerCase())
            )
            return;



            let rate =
            exchange(base,target);



            let reverse =
            exchange(target,base);



            html += `


            <div class="pair-card">


            <div class="pair-header">

            <span>
            ${base} ⇄ ${target}
            </span>


            <span 
            class="star"
            onclick="addFavorite('${base}','${target}')">

            ⭐

            </span>


            </div>


            <div class="rate">

            1 ${base} =
            ${rate.toFixed(4)}
            ${target}

            </div>


            <div class="reverse">

            1 ${target} =
            ${reverse.toFixed(4)}
            ${base}

            </div>


            </div>


            `;


        });



        html += "</div>";


        container.innerHTML += html;


    });



}




// Search


document
.getElementById("search")
.addEventListener(
"input",
function(){

renderCurrencies(this.value);

});






// Favorites


function addFavorite(from,to){


let pair =
from + "/" + to;


if(!favorites.includes(pair)){

favorites.push(pair);

localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);

}


renderFavorites();

}




function renderFavorites(){

let box =
document.getElementById("favorite-list");


box.innerHTML="";


favorites.forEach(pair=>{


let parts =
pair.split("/");


let rate =
exchange(parts[0],parts[1]);


box.innerHTML += `

<div class="favorite-card">

<b>
${parts[0]} / ${parts[1]}
</b>

<br>

1 ${parts[0]} =
${rate.toFixed(4)}
${parts[1]}

</div>

`;

});


}


let box =
document.getElementById("favorite-list");


box.innerHTML="";


favorites.forEach(pair=>{


let parts =
pair.split("/");


box.innerHTML += `


<div class="favorite-card">

${parts[0]} ⇄ ${parts[1]}

</div>


`;


});


}


renderFavorites();






// Converter


function setupConverter(){


let from =
document.getElementById("from");


let to =
document.getElementById("to");



Object.keys(data.currencies)
.forEach(code=>{


from.innerHTML +=
`<option>${code}</option>`;


to.innerHTML +=
`<option>${code}</option>`;


});



from.value="USD";

to.value="MYR";



updateConverter();



}





function updateConverter(){


let amount =
Number(
document.getElementById("amount").value
);



let from =
document.getElementById("from").value;


let to =
document.getElementById("to").value;



let result =
amount *
exchange(from,to);



document
.getElementById("conversion-result")
.innerHTML =

amount +
" " +
from +
" = " +

result.toFixed(4)
+
" "
+
to;


}



document
.getElementById("amount")
.addEventListener(
"input",
updateConverter
);



document
.getElementById("from")
.addEventListener(
"change",
updateConverter
);



document
.getElementById("to")
.addEventListener(
"change",
updateConverter
);
