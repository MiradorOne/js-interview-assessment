import React from 'react';

import Header from './components/Header';
import CurrencyForm from './components/CurrencyForm';

function App() {
  return (
    <main className="App">
      <Header />
      <CurrencyForm />
      {/*Would be nice here to have a ConvertHistory component here that holds a list of previous conversions for current session*/}
    </main>
  );
}

export default App;
