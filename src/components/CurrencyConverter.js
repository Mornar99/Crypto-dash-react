import { useState } from "react";
import ExchangeRateDisplay from "./ExchangeRateDisplay";
import axios from "axios";

const CurrencyConverter = () => {
    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA']

    const [chosenPrimary, setChosenPrimary] = useState('BTC')
    const [chosenSecondary, setChosenSecondary] = useState('BTC')
    const [amount, setAmount] = useState(1)//za inicijalnu vrijednost neka konvertita 1 BTC
    const [exchangeRate, setExchangeRate] = useState(0)
    const [result, setResult] = useState(0)
    const [chosenPrimaryDisplay, setChosenPrimaryDisplay] = useState('BTC')
    const [chosenSecondaryDisplay, setChosenSecondaryDisplay] = useState('BTC')


    //FRONTEND nacin za api
    const convert = () => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/convert',
            params: {from_currency: chosenPrimary, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondary}
          };
          
          axios.request(options).then((response) => {
              //console.log(response.data);
              gettingData(response.data);
          }).catch( (error) => {
              console.error(error);
          });
    }

    const gettingData = (data) => {
        const x = data['Realtime Currency Exchange Rate']['5. Exchange Rate']; //api vraca data u obliku niza unutar niza tj matrice
        //console.log(x);
        setExchangeRate(x);
        setResult(amount * x);
        setChosenPrimaryDisplay(data['Realtime Currency Exchange Rate']['1. From_Currency Code'])
        setChosenSecondaryDisplay(data['Realtime Currency Exchange Rate']['3. To_Currency Code'])
    }

    return (
        <div className="currency-converter">
            <h2>CurrencyConverter</h2>

            <div className="input-box">

                <table>
                    <tbody>
                        <tr>
                            <td>Primary Currency</td>
                            <td>
                                <input 
                                    type="number" 
                                    name="currency-amount-1" 
                                    value={amount} 
                                    onChange={(e) => setAmount(e.target.value)}
                                />       
                            </td>
                            <td>
                                <select 
                                    onChange={(e) => setChosenPrimary(e.target.value)}
                                    value={chosenPrimary}
                                    name="currency-option-1"
                                    className="currency-options"
                                >
                                    {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>Secondary Currency</td>
                            <td>
                                <input 
                                    disabled={true}
                                    name="currency-amount-2"
                                     value={result} 
                                />
                            </td>
                            <td>
                                <select
                                    onChange={(e) => setChosenSecondary(e.target.value)}
                                    value={chosenSecondary}
                                    name="currency-option-2"
                                    className="currency-options"
                                >
                                    {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button id="convert-button" onClick={convert}>Convert</button>

            </div>

            <ExchangeRateDisplay 
                exchangeRate={exchangeRate}
                chosenPrimary={chosenPrimaryDisplay}
                chosenSecondary={chosenSecondaryDisplay}
            />
        </div>
    )
}

export default CurrencyConverter;
//tr - table row
//td - table data