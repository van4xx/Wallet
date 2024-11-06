import React, { useEffect } from 'react';
import './App.css';
import Tab from './components/Tab';
import WalletCard from './components/WalletCard';
import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";
function App() {
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.expand();
    }
  }, [])
  return <TonConnectUIProvider
  manifestUrl="https://cargotma.online/tonconnect-manifest.json"
  uiPreferences={{ theme: THEME.DARK }}
  actionsConfiguration={{
      twaReturnUrl: 'https://t.me/cargopartners_bot/Cargo'
  }}
> 
  <div className="App">
          <WalletCard/>
          <Tab/>
  </div>
</TonConnectUIProvider>
}

export default App;
