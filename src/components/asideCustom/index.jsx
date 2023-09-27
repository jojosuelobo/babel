import styles from './AsideCustom.module.sass'
import { BiHome } from 'react-icons/bi'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { FaRegUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function aside() {
  return (
    <aside className={styles.main_content}>
      <ul className={styles.list}>
        <Link to={'/'}>
          <li className={styles.list_btn}>
            <BiHome className={styles.icon} />
            <button className={styles.btn}>Página Inicial</button>
          </li>
        </Link>

        <Link to={'/notifications'}>
          <li className={styles.list_btn}>
            <IoMdNotificationsOutline className={styles.icon} />
            <button className={styles.btn}>Notificações</button>
          </li>
        </Link>

        <Link to={'/profile'}>
          <li className={styles.list_btn}>
            <FaRegUserCircle className={styles.icon} />
            <button className={styles.btn}>Perfil</button>
          </li>
        </Link>

        <Link to={'/newpost'} className={styles.list_btn}>
          <button className={styles.btn2}>Criar Lista</button>
        </Link>
      </ul>
    </aside>
  )
}
