import React, { useState } from 'react';

import Header from './components/Header';
import CurrencyForm from './components/CurrencyForm';
import ConvertHistory from './components/ConvertHistory';
import { ConvertResult } from './api/useFetchConvertResult';

export interface HistoryEntry {
  from: string,
  to: string,
  amount: string,
  result: string
}

const AMOUNT_LIMITATION = 5

function App() {
  const [history, setHistory] = useState<ConvertResult[]>([])

  const handleConversionSave = (conversion: ConvertResult) => {
    setHistory([conversion, ...history])
  }

  return (
    <main className="App">
      <Header />
      <CurrencyForm handleConversionSave={handleConversionSave} />
      <ConvertHistory history={history.slice(0, AMOUNT_LIMITATION)}  />
      {/*Would be nice here to have a ConvertHistory component here that holds a list of previous conversions for current session*/}
    </main>
  );
}

export default App;