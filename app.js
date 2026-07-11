let data = {};
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const order = [
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
    "INR"
];


async function loadCurrencies(){

    const currencyFile =
    await fetch("currencies.json");

    data =
    await currencyFile.json();


    const live =
    await fetch(
    "https://open.er-api.com/v6/latest/USD"
    );


    const liveData =
    await live.json();


    if(liveData.rates){

        data.rates =
        liveData.rates;

    }


    document.getElementById(
    "last-update"
    ).innerHTML =
    "Last update: "
    +
    new Date().toLocaleString();


    renderCurrencies();

    setupConverter();

    renderFavorites();

}



loadCurrencies();





function exchange(from,to){

    return (
        data.rates[to] /
        data.rates[from]
    );

}





function renderCurrencies(search=""){


let box =
document.getElementById(
"currency-list"
);


box.innerHTML="";



order.forEach(base=>{


if(!data.currencies[base])
return;



let currency =
data.currencies[base];



if(
search &&
!base.toLowerCase()
.includes(search.toLowerCase()) &&
!currency.name.toLowerCase()
.includes(search.toLowerCase())
){

return;

}



let html = `

<div class="card">


<div class="country-title">

${currency.flag}
${base}

<br>

<span class="currency-name">
${currency.name}
</span>


</div>


`;



order.forEach(target=>{


if(
target===base ||
!data.currencies[target]
)
return;



let rate =
exchange(base,target);



let reverse =
exchange(target,base);



html += `

<div class="pair-card">


<div class="pair-title">

${base} ⇄ ${target}

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


<button
onclick="addFavorite('${base}','${target}')">

⭐ Add

</button>


</div>

`;



});



html += "</div>";

box.innerHTML += html;


});


}




document
.getElementById("search")
.addEventListener(
"input",
function(){

renderCurrencies(this.value);

});







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
document.getElementById(
"favorite-list"
);


box.innerHTML="";


favorites.forEach(pair=>{


let p =
pair.split("/");


let rate =
exchange(
p[0],
p[1]
);



box.innerHTML += `

<div class="favorite-card">


<b>
${p[0]} ⇄ ${p[1]}
</b>


<br>


1 ${p[0]} =
${rate.toFixed(4)}
${p[1]}


</div>

`;



});


}







function setupConverter(){


let from =
document.getElementById("from");


let to =
document.getElementById("to");


if(from.options.length)
return;



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
exchange(
from,
to
);



document.getElementById(
"conversion-result"
)
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



document
.getElementById("refresh")
.addEventListener(
"click",
loadCurrencies
);
