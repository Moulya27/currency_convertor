const currencyOne = document.querySelector('#currency-one');
const currencyTwo = document.querySelector('#currency-two');
const amountOne = document.querySelector('#amount-one');
const amountTwo = document.querySelector('#amount-two');
const swapButton = document.querySelector('.btn');
const rateEl = document.querySelector('.rate');
const errorMessage = document.querySelector('.err_message');


//Calculate function to fetch currency rates

function calculate(){
    const currency_one = currencyOne.value;
    const currency_two = currencyTwo.value;
    if(amountOne.value < 0 || amountTwo.value < 0){
        amountTwo.value = '';
            errorMessage.innerHTML = `Enter a positive value`;     
    }
    else{
        errorMessage.innerHTML = '';
    fetch(`https://v6.exchangerate-api.com/v6/0a8724f8d325969fedf0f714/latest/${currency_one}`)
    .then(res => res.json())
    .then(data =>{
    const rate = data.conversion_rates[currency_two];
    rateEl.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`;
    amountTwo.value = (amountOne.value * rate).toFixed(2);
    })
}
}

//event listener for currency element 1
currencyOne.addEventListener('change',calculate);
currencyTwo.addEventListener('change',calculate);
amountOne.addEventListener('input',calculate);
amountTwo.addEventListener('input',calculate);

swapButton.addEventListener('click',function(){
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();
})
calculate();

