const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");

async function convertValues() {
  const inputCurrencyValue = document.querySelector(".input-currency").value;
  const currencyValueToConvert = document.querySelector(
    ".currency-value-to-convert"
  );
  const currencyValueConvert = document.querySelector(".currency-value");

  if (!inputCurrencyValue || inputCurrencyValue <= 0) {
    currencyValueConvert.innerHTML = "";
    currencyValueToConvert.innerHTML = "Digite um valor válido.";
    return;
  }

  // 🔹 Pega as cotações em tempo real
  const response = await fetch(
    "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL"
  );
  const data = await response.json();

  const dolarToday = parseFloat(data.USDBRL.bid);
  const euroToday = parseFloat(data.EURBRL.bid);
  const libraToday = parseFloat(data.GBPBRL.bid);
  const bitcoinToday = parseFloat(data.BTCBRL.bid);

  // 🔹 Converte dependendo da seleção
  let convertedValue;
  if (currencySelect.value === "dolar") {
    // Se o valor digitado for em real, converte para dólar
    convertedValue = inputCurrencyValue / dolarToday;
    currencyValueConvert.innerHTML = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(convertedValue);
  } else if (currencySelect.value === "euro") {
    // Se o valor digitado for em real, converte para euro
    convertedValue = inputCurrencyValue / euroToday;
    currencyValueConvert.innerHTML = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(convertedValue);
  } else if (currencySelect.value === "real") {
    // Se o valor digitado for em dólar ou euro, converte para real
    if (document.querySelector(".currency-origin").value === "dolar") {
      convertedValue = inputCurrencyValue * dolarToday;
    } else if (document.querySelector(".currency-origin").value === "euro") {
      convertedValue = inputCurrencyValue * euroToday;
    }
    currencyValueConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(convertedValue);
  } else if (currencySelect.value === "libra") {
    convertedValue = inputCurrencyValue / libraToday;
    currencyValueConvert.innerHTML = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(convertedValue);
  } else if (currencySelect.value === "bitcoin") {
    convertedValue = inputCurrencyValue / bitcoinToday;

    currencyValueConvert.innerHTML = `${convertedValue.toFixed(8)} BTC`;
  }
   // 🔹 Mostra as cotações atuais
    const ratesDiv = document.querySelector(".exchange-rates");

    ratesDiv.innerHTML = `
    <h3>Cotações atuais:</h3>
    <p>💵 Dólar (USD): R$ ${dolarToday.toFixed(2)}</p>
    <p>💶 Euro (EUR): R$ ${euroToday.toFixed(2)}</p>
    <p>💷 Libra (GBP): R$ ${libraToday.toFixed(2)}</p>
    <p>₿ Bitcoin (BTC): R$ ${bitcoinToday.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}</p>
  `;

  // 🔹 Exibe o valor de origem formatado
  currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(inputCurrencyValue);
}
// 🔹 Atualiza nome e imagem da moeda
function changeCurrency() {
  const currencyName = document.getElementById("currency-name");
  const currencyImage = document.querySelector(".currency-img");

  if (currencySelect.value === "dolar") {
    currencyName.innerHTML = "Dólar americano";
    currencyImage.src = "./assets/dolar.png";
  } else if (currencySelect.value === "euro") {
    currencyName.innerHTML = "Euro";
    currencyImage.src = "./assets/euro.png";
  } else if (currencySelect.value === "real") {
    currencyName.innerHTML = "Real brasileiro";
    currencyImage.src = "./assets/brasil.png";
  } else if (currencySelect.value === "libra") {
    currencyName.innerHTML = "Libra Esterlina";
    currencyImage.src = "./assets/libra.png";
  } else if (currencySelect.value === "bitcoin") {
    currencyName.innerHTML = "Bitcoin";
    currencyImage.src = "./assets/bitcoin.png";
  }

  convertValues();
}

currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);
