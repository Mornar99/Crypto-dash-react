const ExchangeRateDisplay = ({exchangeRate, chosenPrimary, chosenSecondary}) => {
    return(
        <div className="exchange-rate-display">
            <h3>Exchange rate:</h3> 
            <h1>{exchangeRate}</h1>
            <p>{chosenPrimary} to {chosenSecondary}</p>
        </div>
    )
}

export default ExchangeRateDisplay;