const currencies = {
    "MYR": {
        name: "🇲🇾 Malaysian Ringgit",
        rates: {
            "USD": 0.2500,
            "SGD": 0.3175,
            "HKD": 1.9608,
            "EUR": 0.2299
        }
    },

    "SGD": {
        name: "🇸🇬 Singapore Dollar",
        rates: {
            "MYR": 3.1500,
            "USD": 0.7900,
            "HKD": 5.8500
        }
    },

    "USD": {
        name: "🇺🇸 US Dollar",
        rates: {
            "MYR": 4.0000,
            "SGD": 1.2658,
            "HKD": 7.8000
        }
    }
};


function displayCurrencies(search="") {

    let output = "";

    Object.keys(currencies).forEach(base => {

        let currency = currencies[base];


        if (
            search &&
            !base.toLowerCase().includes(search.toLowerCase()) &&
            !currency.name.toLowerCase().includes(search.toLowerCase())
        ) {
            return;
        }


        output += `
        <div class="card">

        <div class="country-title">
        ${base} — ${currency.name}
        </div>
        `;


        Object.keys(currency.rates).forEach(target => {

            let rate = currency.rates[target];
            let reverse = (1 / rate).toFixed(4);


            output += `
            <div class="pair-card">

            <b>${base} ⇄ ${target}</b>

            <div class="rate">
            1 ${base} = ${rate} ${target}
            </div>

            <div class="reverse">
            1 ${target} = ${reverse} ${base}
            </div>

            </div>
            `;

        });


        output += `</div>`;

    });


    document.getElementById("currency-container").innerHTML = output;

}



displayCurrencies();



document
.getElementById("search")
.addEventListener("input", function(){

    displayCurrencies(this.value);

});
