import logo from '../../../public/logoUVV.png'
import styles from './Login.module.sass'

export default function Login() {
  return (
    <section className={styles.main_content}> 
            <div className={styles.login_page}>
                <img className={styles.logo} src={logo} alt="logo" />
                <div className={styles.text}>
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
                    <p>Esqueceu sua senha?</p>
                </form>
                <button>Criar conta</button>
                <p className={styles.redirect_login}>Não tem uma conta ainda? <a>Criar conta</a></p>
            </div>
        </section>
  )
}
