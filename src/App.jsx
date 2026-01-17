import { useState } from 'react'
import InputBox from "./assets/components/InputBox"
import useCurrencyInfo from "./assets/hooks/useCurrencyInfo"
import './App.css'

function App() {
  const [amount,setAmount] = useState(0);
  const [from,setFrom] = useState('usd');
  const [to,setTo] = useState('inr');
  const [convertedamount,getConvertedValue] = useState(0);

  const CurrencyInfo = useCurrencyInfo(from);

  const options = Object.keys(CurrencyInfo);

  const convert = ()=>{
    getConvertedValue(amount*CurrencyInfo[to])
  }
  const swap = ()=>{
    setFrom(to);
    setTo(from);
    setAmount(convertedamount);
    getConvertedValue(amount);
  }
   return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: "url('https://images.pexels.com/photos/187041/pexels-photo-187041.jpeg')",
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert()
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount = {amount}
                                currencyoptions = {options}
                                selectCurrency = {from}
                                onAmountChange = {(value)=>{
                                  setAmount(value)
                                }}
                                onCurrencyChange = {(Currency)=>{
                                  setFrom(Currency)
                                }}
                                
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                selectCurrency = {to}
                                currencyoptions = {options}
                                amount = {convertedamount}
                                onCurrencyChange = {(currency) => {
                                  setTo(currency)
                                }}
                                amountDisable
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App
