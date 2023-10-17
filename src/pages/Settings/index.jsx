/* eslint-disable no-unused-vars */
import styles from './Settings.module.sass'

// Componentes 
import Aside from '../../components/asideCustom'
import Header from '../../components/header'

export default function Settings() {
  return (
    <>
      <Header />
      <Aside />
      <div className={styles.main}>
        <div className={styles.settings}>
          <h1>Configurações</h1>
          <div className={styles.options}>
            <ul className={styles.list}>
              <li>
                <div className={styles.desc}>
                  <h2>Notificações por SMS</h2>
                  <p>Receba notificação e alertas via SMS</p>
                </div>
                <div className={styles.button}>
                  <button>Ativar</button>
                </div>
              </li>
              <li>
                <div className={styles.desc}>
                  <h2>Notificações por E-mail</h2>
                  <p>Receba notificação e alertas via E-mail</p>
                </div>
                <div className={styles.button}>
                  <button>Ativar</button>
                </div>
              </li>
              <li>
                <div className={styles.desc}>
                  <h2>Verificação em duas etapas</h2>
                  <p>Com a verificação em duas etapas, também chamada de autenticação de dois fatores, você pode adicionar uma camada a mais de segurança à sua conta</p>
                </div>
                <div className={styles.button}>
                  <button>Ativar</button>
                </div>
              </li>
            </ul>
            <ul className={styles.list}>
              <li>
                <div className={styles.desc}>
                  <h2>Idioma</h2>
                  <select>
                    <option>Português</option>
                    <option >Inglês</option>
                    <option>Espanhol</option>
                  </select>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
