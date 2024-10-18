import React from 'react';
import styles from './WalletCard.module.css';

function WalletCard() {
    return (
        <div className={styles.walletCard}>
            <div className={styles.cardContent}>
                <h2>Wallet</h2>
            </div>
        </div>
    );
}

export default WalletCard;