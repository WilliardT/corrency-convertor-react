import React, { useState, useEffect, useRef } from "react";
import { Block } from "./Block";


function App() {

  const ratesRef = useRef({});
  
  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  // useEffect(() => {
  //   fetch('')
  //   .then((res) => res.json())
  //   .then((json) => {
  //     setRates(json.rates);
  //   })
  //   .catch((err) => {
  //     console.warn(err);
  //     alert('не удалось получить информацию')
  //   })
  // },[])
 
  useEffect(() => {
    const data = {
      rates: {
        "RUB": 72.43,
        "USD": 1,
        "EUR": 0.94,
        "ETH": 88786.37,
        "TON": 1.23,
        "GBP": 1.43,
      },
    }
    ratesRef.current = data.rates;
    onChangeToPrice(1);
  },[]);

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(2));
    setFromPrice(value);
  }

  const onChangeToPrice = (value) => {
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrice(result.toFixed(2));
    setToPrice(value);
  }

  return (
    <div className="App">
      <Block 
        value={fromPrice} 
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice} 
      />
      <Block 
        value={toPrice} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice} 
      />
    </div>
  );
}

export default App;
