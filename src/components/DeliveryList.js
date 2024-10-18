import React from 'react';
import styles from './DeliveryList.module.css';
import ButtonComponent from './button';

function DeliveryList() {
    return (
        <form action="/src/components/php/send.php" method="post" className={styles.deliveryList}>
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
            <ButtonComponent className={styles.submitButton}>Подтвердить</ButtonComponent>
        </form>
    );
}

export default DeliveryList;
