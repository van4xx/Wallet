import React, { useState, useEffect } from 'react';
import styles from './Referal.module.css';

function Referal() {
	const [referals, setReferals] = useState([]);
	let url = 'https://t.me/cargopartners_bot';
	useEffect(() => {
		let tg = window?.Telegram?.WebApp;
		console.log(tg.initDataUnsafe.user.id)
		
        const ws = new WebSocket('wss://cargotma.online/ws');
        ws.onopen = () => {
            ws.send(JSON.stringify({request: "referals", id: tg?.initDataUnsafe?.user?.id}));
        };
        ws.onmessage = (event) => {
			let data = JSON.parse(event.data)
			setReferals(data)
        };
        ws.onclose = () => {
          console.log('WebSocket connection closed');
        };
        //setSocket(ws);
        return () => {
          ws.close();
        };
	}, []);

	const handleInviteFriend = () => {
		let tg = window?.Telegram?.WebApp;
		const inviteLink = `${url}/Cargo?startapp=${tg?.initDataUnsafe?.user?.id}`
		const inviteMessage = `Join to this telegram app`
		const uri = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(inviteMessage)}`
		window.open(uri, '_blank')
	}

	const handleCopyLink = () => {
		let tg = window?.Telegram?.WebApp;
		const inviteLink = `${url}/Cargo?startapp=${tg?.initDataUnsafe?.user?.id}}`
		navigator.clipboard.writeText(inviteLink)
	}

  return (
    <div className={styles.referalContainer}>
       <div className={styles.referalsContainer}>
       		<div className={styles.referalMessage}>
                  Приглашайте друзей и получайте процент от переводов
            </div>
       		<h2>Список ваших друзей ({referals.length})</h2>
       		<div className={styles.referalsBody}>
				{referals.length > 0 ? referals.map(function(element) {
					return <div className={styles.referal}>
						<div className={styles.referalImg}>{element.avatar}</div>
						<div className={styles.referalName}>{element.name}</div>
					</div>
				}) : ''}
	       		
	       		
	       	</div>
       </div>
       <div className={styles.referalsBottom}>
       		<button className={styles.inviteFriend} onClick={handleInviteFriend}>Пригласить друга</button>
       		<button className={styles.copyInviteUrl} onClick={handleCopyLink}>Скопировать ссылку</button>
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
