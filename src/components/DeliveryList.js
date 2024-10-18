import React from 'react';
import styles from './DeliveryList.module.css';
import ButtonComponent from './button';

function DeliveryList() {
    return (
       <form action="https://api.cargotma.online/send.php" method="post" enctype="multipart/form-data" className={styles.deliveryList}>
            <div>
                <label hmtlFor="file">Загрузить файл</label>
                <input type="file" id="file" name="file" required />
            </div>
            <div>
                <label htmlFor="size">Размер товара</label>
                <input type="text" id="size" name="size" placeholder="Введите размер товара" required />
            </div>
            <div>
                <label for="weight">Вес товара</label>
                <input type="text" id="weight" name="weight" placeholder="Введите вес товара" required />
            </div>
            <button className={styles.submitButton}>Подтвердить</button>
        </form>
    );
}

export default DeliveryList;
