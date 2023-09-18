import logo from '../../../public/logoUVV.png'
import styles from './Login.module.sass'
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <section className={styles.main_content}> 
      <div className={styles.login_page}>
        <img className={styles.logo} src={logo} alt="logo" />
        <div className={styles.login_text}>
          <h1 className={styles.title}>Welcome back!</h1>
          <p>Please enter your details</p>
        </div>
        <form className={styles.login_form}>
          <p>Usuário ou Email</p>
          <input
            className={styles.login}
            type="text"
          />
          <p>Senha</p>
          <input
            className={styles.password}
            type="password"
          />
                  <p style={{ fontSize: '0.775rem', textAlign: 'right', marginTop: '7px', cursor: 'pointer' }}>Esqueceu sua senha?</p>
        </form>
        <button className={styles.btn}>Entrar</button>
        <p className={styles.redirect_login} style={{ marginTop: '-15px', fontSize: '0.875rem' }}>Não tem uma conta ainda? <Link to='/register'><a>Criar conta</a></Link></p>
      </div>
    </section>
  )
}
