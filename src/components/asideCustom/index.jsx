import styles from './AsideCustom.module.sass'

export default function aside() {
  return (
    <aside className={styles.main_content}>
      <ul>
        <li>
          <button className={styles.btn}><img src="inicial.png" width="30" height="30" align="left"/><h1>Página Inicial</h1></button>
        </li>
        <li>
          <button className={styles.btn}><img src="notificacao.png" width="30" height="30" align="left" /><h1>Notificações</h1></button>
        </li>
        <li>
          <button className={styles.btn}><img src="perfil.png" width="30" height="30" align="left" /><h1>Perfil</h1> </button>
        </li>
        <li>
          <button className={styles.btn2}><h1>Criar Lista</h1></button>
        </li>
      </ul>
    </aside>
  )
}
