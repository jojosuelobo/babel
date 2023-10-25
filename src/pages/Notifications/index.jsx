/* eslint-disable no-unused-vars */
// Estilos
import styles from './Notifications.module.sass'

// Componentes 
import Aside from '../../components/asideCustom'
import Header from '../../components/header'

// Icons
import {RiNotificationFill} from 'react-icons/ri'

export default function Notifications() {
  return (
    <>
      <Header />
      <Aside />

      <section className={styles.main}>
        {/* Menu a esquerda dá página */}
        {/* Conteúdo principal da página */}
        <div className={styles.notifications}>
          <h1>Notificações</h1>
          <ul className={styles.list}>
            <li className={styles.item}>
              <p><RiNotificationFill/> Perfil COMPRINHAS SHEIN publicou uma nova lista! </p>
              <p>13:22 15/05</p>
            </li>
            <li className={styles.item}>
              <p><RiNotificationFill/> TropaDoCoronel_\|/_ começou a seguir você </p>
              <p>13:22 15/05</p>
            </li>
            <li className={styles.item}>
              <p><RiNotificationFill/> TaylorSwiftFC começou a seguir você </p>
              <p>13:22 15/05</p>
            </li>
            <li className={styles.item}>
              <p><RiNotificationFill/> KanyeWeeestLovers deixou de seguir você </p>
              <p>13:22 15/05</p>
            </li>
            <li className={styles.item}>
              <p><RiNotificationFill/> GaliShell começou a seguir você </p>
              <p>13:22 15/05</p>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}