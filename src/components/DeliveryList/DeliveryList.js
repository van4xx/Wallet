import React from 'react';
import styles from './DeliveryList.module.css';
import Button from '../Button/Button';

function DeliveryList() {
    return (
        <form className={styles.deliveryList}>
            <div>
                <label htmlFor="file">Загрузить файл</label>
                <input type="file" id="file" name="file" required />
            </div>
            <div>
                <label htmlFor="size">Размер товара</label>
                <input type="text" id="size" name="size" placeholder="Введите размер товара" required />
            </div>
            <div>
                <label htmlFor="weight">Вес товара</label>
                <input type="text" id="weight" name="weight" placeholder="Введите вес товара" required />
            </div>
            <Button className={styles.submitButton}>Подтвердить</Button>
        </form>
    );
}

export default DeliveryList;
