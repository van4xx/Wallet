import React from 'react';
import styles from './Referal.module.css';

function Referal() {
  return (
    <div className={styles.referalContainer}>
       <div className={styles.referalsContainer}>
       		<div className={styles.referalMessage}>
                  Приглашайте друзей и получайте процент от переводов
            </div>
       		<h2>Список ваших друзей (3)</h2>
       		<div className={styles.referalsBody}>
	       		<div className={styles.referal}>
					<div className={styles.referalImg}>T</div>
					<div className={styles.referalName}>Tester Test</div>
	       		</div>
	       		<div className={styles.referal}>
					<div className={styles.referalImg}>I</div>
					<div className={styles.referalName}>Ioan</div>
	       		</div>
	       		<div className={styles.referal}>
					<div className={styles.referalImg}>F</div>
					<div className={styles.referalName}>Fedor</div>
	       		</div>
	       		
	       	</div>
       </div>
       <div className={styles.referalsBottom}>
       		<button className={styles.inviteFriend}>Пригласить друга</button>
       		<button className={styles.copyInviteUrl}>Скопировать ссылку</button>
       </div>
    </div>
  )
}
/*<div className={styles.referalContainer}>
      <div className={styles.referalMessage}>
        В данный момент реферальная система не доступна, но скоро она будет добавлена
      </div>
      <div className={styles.comingSoon}>Скоро!</div>
    </div>*/

export default Referal;
