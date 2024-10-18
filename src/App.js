import React from 'react';
import './App.css';
import DeliveryList from './components/DeliveryList';
import Swap from './components/Swap';
import Referal from './components/Referal';
import Tab from './components/Tab';
import WalletCard from './components/WalletCard';

function App() {
  return <div className="App">
          <WalletCard/>
          <Tab/>
  </div>
}

export default App;
