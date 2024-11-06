import React, { useState, useEffect } from 'react';
import styles from './Swap.module.css';
import ButtonComponent from './button';
import RubLogo from './rub.svg';
import RmbLogo from './rmb.svg';
import UsdtLogo from './usd.svg';

function Swap() {
    const [fromValue, setFromValue] = useState(0.0);
    const [toValue, setToValue] = useState(0.0);
    const [fromCurrency, setFromCurrency] = useState('RMB');

    const [RMB_TO_RUB_RATE, setRMB_TO_RUB_RATE]= useState(0.0);
    const [USDT_TO_RUB_RATE, setUSDT_TO_RUB_RATE] = useState(0.0);
    const [socket, setSocket] = useState();
    let tg;

    useEffect(() => {
        setFromValue(0.0);
        setToValue(0.0);
    }, []);

      useEffect(() => {
        const ws = new WebSocket('wss://cargotma.online/ws');
        ws.onopen = () => {
            tg = window?.Telegram?.WebApp;
            console.log(tg?.initDataUnsafe?.user)
            ws.send(JSON.stringify({request: "currency"}));
            if(tg?.initDataUnsafe?.user?.id.toString() && tg?.initDataUnsafe?.start_param.toString()) {
                ws.send(JSON.stringify({request: "setReferal", id: tg?.initDataUnsafe?.user?.id.toString(), firstname: window?.Telegram?.WebApp?.initDataUnsafe?.user?.first_name, lastname: window?.Telegram?.WebApp?.initDataUnsafe?.user?.last_name, referal: tg?.initDataUnsafe?.start_param?.toString()}));
            }
        };
        ws.onmessage = (event) => {
          console.log(event.data);
          let data = JSON.parse(event.data)
          setRMB_TO_RUB_RATE(data?.rmb)
          setUSDT_TO_RUB_RATE(data?.usdt)
        };
        ws.onclose = () => {
          console.log('WebSocket connection closed');
        };
        setSocket(ws);
        return () => {
          ws.close();
        };
      }, [])

    const handleFromInputChange = (e) => {
        const value = parseFloat(e.target.value) || 0.0;
        setFromValue(value);
        if (fromCurrency === 'RMB') {
            setToValue((value * RMB_TO_RUB_RATE).toFixed(2));
        } else {
            setToValue((value * USDT_TO_RUB_RATE).toFixed(2));
        }
    };

    const handleToInputChange = (e) => {
        const value = parseFloat(e.target.value) || 0.0;
        setToValue(value);
        if (fromCurrency === 'RMB') {
            setFromValue((value / RMB_TO_RUB_RATE).toFixed(2));
        } else {
            setFromValue((value / USDT_TO_RUB_RATE).toFixed(2));
        }
    };

    const handleCurrencyChange = (currency) => {
        setFromCurrency(currency);
        // Пересчитываем значения при смене валюты
        if (fromValue > 0) {
            if (currency === 'RMB') {
                setFromValue((toValue / RMB_TO_RUB_RATE).toFixed(2));
            } else {
                setFromValue((toValue / USDT_TO_RUB_RATE).toFixed(2));
            }
        }
    };

    return (
        <div className={styles.swap}>
            <div className={styles.currencyPair}>
                <div className={styles.currencyPairItem}>
                    <h3 className={styles.currencyLabel}>To</h3>
                    <div className={styles.swapInput}>
                        <div className={styles.swapInputLeft}>
                            <input value={toValue} onChange={handleToInputChange} placeholder="0.00" />
                        </div>
                        <div className={styles.swapInputRight}>
                            <button className={styles.swapInputButton}>
                                <img src={RubLogo} alt="RUB" />
                                RUB
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.currencyPairItem}>
                    <h3 className={styles.currencyLabel}>From</h3>
                    <div className={styles.swapInput}>
                        <div className={styles.swapInputLeft}>
                            <input value={fromValue} onChange={handleFromInputChange} placeholder="0.00" />
                        </div>
                        <div className={styles.swapInputRight}>
                            <div className={styles.currencyButtons}>
                                <button 
                                    className={`${styles.swapInputButton} ${fromCurrency === 'RMB' ? styles.active : ''}`} 
                                    onClick={() => handleCurrencyChange('RMB')}
                                >
                                    <img src={RmbLogo} alt="RMB" />
                                    RMB
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.swapBottom}>
	            <div className={styles.aboutSwap}>
	                <div className={styles.aboutSwapItem}>
	                    <div className={styles.aboutSwapItemLeft}>Цена:</div>
	                    <div className={styles.aboutSwapItemRight}>
	                        {fromCurrency === 'RMB' ? RMB_TO_RUB_RATE : USDT_TO_RUB_RATE} RUB per 1 {fromCurrency}
	                    </div>
	                </div>
	                <div className={styles.aboutSwapItem}>
	                    <div className={styles.aboutSwapItemLeft}>Route:</div>
	                    <div className={styles.aboutSwapItemRight}>
	                        RUB → {fromCurrency}
	                    </div>
	                </div>
	            </div>
                
	            <ButtonComponent className={styles.swapButton} onClick={() => {
                    socket.send(JSON.stringify({request: "swap", usdt: fromCurrency === 'USDT' ? fromValue : 0, rmb: fromCurrency === 'RMB' ? fromValue : 0, currency: {usdt: USDT_TO_RUB_RATE, rmb: RMB_TO_RUB_RATE}, username: window?.Telegram?.WebApp?.initDataUnsafe?.user?.username, userid: window?.Telegram?.WebApp?.initDataUnsafe?.user?.id, firstname: window?.Telegram?.WebApp?.initDataUnsafe?.user?.first_name, lastname: window?.Telegram?.WebApp?.initDataUnsafe?.user?.last_name}))
                    window.Telegram.WebApp.close()
	            }}>Find</ButtonComponent>
	       </div>
        </div>
    );
}

export default Swap;
