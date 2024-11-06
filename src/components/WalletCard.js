import React, { useState, useEffect, useCallback } from 'react';
import styles from './WalletCard.module.css';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { Address } from "@ton/core";
import { TonClient } from 'ton';

const formatAddress = (address) => {
    const tempAddress = Address.parse(address).toString();
    return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`;
  };
const formatBalance = (balance) => {
    const balanceNumber = Number(balance) / 1_000_000_000;
    return balanceNumber.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
function WalletCard() {
    const [tonConnectUI] = useTonConnectUI();
    const Wallet = useTonWallet();
    const [tonWalletAddress, setTonWalletAddress] = useState(null);
    const [balance, setBalance] = useState(0);

    const client = new TonClient({
        endpoint: 'https://toncenter.com/api/v2/jsonRPC',
      });
    const fetchBalance = async (address) => {
        try {
            const balance = await client.getBalance(Address.parse(address).toString());
            setBalance(formatBalance(balance));
            console.log("Balance", formatBalance(balance))
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    };

    const handleWalletConnection = useCallback(async (address) => {
        setTonWalletAddress(address);
        await fetchBalance(address); // Fetch balance when connected
        console.log("Wallet connected successfully!");
    }, []);

    const handleWalletDisconnection = useCallback(() => {
        setTonWalletAddress(null);
        setBalance(0); // Reset balance on disconnection
        console.log("Wallet disconnected successfully!");
    }, []);

    useEffect(() => {
        const checkWalletConnection = async () => {
            if (tonConnectUI.account?.address) {
                handleWalletConnection(tonConnectUI.account.address);
            } else {
                handleWalletDisconnection();
            }
        };

        checkWalletConnection();

        const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
            if (wallet) {
                handleWalletConnection(wallet.account.address);
            } else {
                handleWalletDisconnection();
            }
        });

        return () => {
            unsubscribe();
        };
    }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

    return (
        <div className={styles.walletCard}>
            <div className={styles.cardContent}>
                <div className={styles.cardContentTop}>
                    {tonWalletAddress ? <><div>
                        <h2>TON Wallet</h2>
                        <p>{tonWalletAddress && formatAddress(tonWalletAddress)}</p>
                    </div>
                    <h3>{balance} Ton</h3></>: <h2>Wallet</h2>}
                </div>
                {tonWalletAddress ? <div className={styles.cardContentBottom}>
                        <button><svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.6667 5.8335L6.33337 14.1668" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.6667 14.1668H6.33337V5.8335" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
Receive</button>
                        <button>Send<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.33337 14.1668L14.6667 5.8335" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.33337 5.8335H14.6667V14.1668" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button>
                </div> : <></>}
                
            </div>
        </div>
    );
}
/*
<div className={styles.walletCard}>
            <div className={styles.cardContent}>
                <h2>Wallet</h2>
            </div>
        </div>
*/

export default WalletCard;