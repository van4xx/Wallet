import React from 'react';
import styles from './DeliveryList.module.css';
import ButtonComponent from './button';

function DeliveryList() {
    return (
       <form action="https://api.cargotma.online/send.php" method="post" enctype="multipart/form-data" class="DeliveryList_deliveryList__yiXod">
            <div>
                <label for="file">Загрузить файл</label>
                <input type="file" id="file" name="file" required="">
            </div>
            <div>
                <label for="size">Размер товара</label>
                <input type="text" id="size" name="size" placeholder="Введите размер товара" required="">
            </div>
            <div>
                <label for="weight">Вес товара</label>
                <input type="text" id="weight" name="weight" placeholder="Введите вес товара" required="">
            </div>
            <button class="button_button__VWeAX">Подтвердить</button>
        </form>
    );
}

export default DeliveryList;
