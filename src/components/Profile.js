import React, { useState, useEffect, useCallback } from 'react';
import styles from './Profile.module.css';
import ButtonComponent from './button';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { useTonAddress } from '@tonconnect/ui-react';
function Profile() {
    let [authed, setAuthed] = useState(false)

  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleWalletConnection = useCallback((address) => {
    setTonWalletAddress(address);
    console.log("Wallet connected successfully!");
    setIsLoading(false);
  }, []);

  const handleWalletDisconnection = useCallback(() => {
    setTonWalletAddress(null);
    console.log("Wallet disconnected successfully!");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (tonConnectUI.account?.address) {
        handleWalletConnection(tonConnectUI.account?.address);
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

  const handleWalletAction = async () => {
    if (tonConnectUI.connected) {
      setIsLoading(true);
      await tonConnectUI.disconnect();
    } else {
      await tonConnectUI.openModal();
    }
  };

  /*const formatAddress = (address) => {
    const tempAddress = Address.parse(address).toString();
    return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`;
  };*/
    
    return (
        <div id="profile" className={[styles.profile, authed ? '' : styles.unconnected].join(" ")}>
        	<ButtonComponent className={styles.swapButton} onClick={handleWalletAction}>{tonConnectUI.account?.address ? "Disconnect Wallet" : "Connect Wallet"}</ButtonComponent>
        </div>
    );
}

export default Profile;
