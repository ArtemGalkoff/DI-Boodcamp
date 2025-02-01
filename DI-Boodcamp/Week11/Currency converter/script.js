const apiKey = '59a50f67503404ac6d4a19c5';
const apiUrl = 'https://v6.exchangerate-api.com/v6/59a50f67503404ac6d4a19c5/latest/USD';
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const resultElement = document.getElementById('result');

// Функция для загрузки списка валют
async function loadCurrencies() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.result === "success") {
      const currencies = Object.keys(data.conversion_rates);
      populateCurrencySelect(currencies);
    } else {
      console.error("Getting data error");
    }
  } catch (error) {
    console.error("Error of loading:", error);
  }
}

// Функция для заполнения выпадающих списков валют
function populateCurrencySelect(currencies) {
  currencies.forEach(currency => {
    const optionFrom = document.createElement('option');
    optionFrom.value = currency;
    optionFrom.textContent = currency;
    fromCurrency.appendChild(optionFrom);

    const optionTo = document.createElement('option');
    optionTo.value = currency;
    optionTo.textContent = currency;
    toCurrency.appendChild(optionTo);
  });
}


async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    resultElement.textContent = "Input correct amount!";
    return;
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.result === "success") {
      const conversionRateFrom = data.conversion_rates[from];
      const conversionRateTo = data.conversion_rates[to];

      if (!conversionRateFrom || !conversionRateTo) {
        resultElement.textContent = "Getting data error";
        return;
      }

     
      const convertedAmount = (amount * conversionRateTo) / conversionRateFrom;
      resultElement.textContent = `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
    } else {
      resultElement.textContent = "Getting data error";
    }
  } catch (error) {
    console.error("Converting error:", error);
    resultElement.textContent = "Converting error.";
  }
}


convertBtn.addEventListener('click', convertCurrency);


loadCurrencies();