
//THIS IS THE EVENT LISTENER FOR THE DROPDOWN MENU
document.getElementById('cryptoID');
document.getElementById('cryptoSymbol');
document.getElementById('cryptoName');
document.getElementById('cryptoPriceUSD');
document.getElementById('crypto1hChange');
document.getElementById('crypto24hChange');
document.getElementById('crypto7dChange');
document.getElementById('crypto24hVolume')
document.getElementById('cryptoTotalSupply')
document.getElementById('cryptoMaxSupply')
document.getElementById('cryptoCirculatingSupply')

//LOADS BITCOIN (ID=90) DATA ON WEBPAGE STARTUP
var apiLink = 'https://api.coinlore.net/api/ticker/?id=90';
changeCrypto();

function makeAPIlink(){
    apiLink = (`https://api.coinlore.net/api/ticker/?id=${this.value}`);
    changeCrypto();
}
document.getElementById('list').onchange = makeAPIlink;


//
async function changeCrypto() {
  try {
    const response = await fetch(apiLink);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    cryptoHeader.textContent = (`(${json[0].symbol}) ${json[0].name}`);
    cryptoPriceUSD.textContent = (`Current Price: $${json[0].price_usd}`);
    crypto1hChange.textContent = (`1 Hour Percent Change: ${json[0].percent_change_1h}%`);
    crypto24hChange.textContent = (`1 Day Percent Change: ${json[0].percent_change_24h}%`);
    crypto7dChange.textContent = (`1 Week Percent Change: ${json[0].percent_change_7d}%`);
    crypto24hVolume.textContent = (`1 Day Volume Traded: ${(Math.round(json[0].volume24)).toLocaleString('en')} ${json[0].symbol}`);
    cryptoTotalSupply.textContent = (`Total Supply: ${(Math.round(json[0].tsupply)).toLocaleString('en')} ${json[0].symbol}`);

    //MAKES CIRCULATING SUPPLY 'Same as Total Supply' IF TOTAL AND CIRCULATING SUPPLY ARE EQUAL
    if (Math.round(json[0].csupply) === Math.round(json[0].tsupply)) {
      cryptoCirculatingSupply.innerHTML = '<p>Circulating Supply: <i>Same as Total Supply</i></p>';
    }
    else {
      cryptoCirculatingSupply.textContent = (`Circulating Supply: ${(Math.round(json[0].csupply)).toLocaleString('en')} ${json[0].symbol}`);
    }

    //MAKES MAX SUPPLY 'N/A' IF CRYPTO HAS NO MAX SUPPLY
    if (Math.round(json[0].msupply) === 0) {
      cryptoMaxSupply.innerHTML = ('<p>Max Supply: <i>N/A</i></p>');
    }
    else {
      cryptoMaxSupply.textContent = (`Max Supply: ${(Math.round(json[0].msupply)).toLocaleString('en')} ${json[0].symbol}`);
    }

  } catch (error) {
    console.error(error.message);
  }
}
