import logo from '../../../public/logoUVV.png'
import styles from './Register.module.sass'
import { Link } from 'react-router-dom';

export default function Register() {
    return (
        <section className={styles.main_content}>
            <div className={styles.register_page}>
                <img className={styles.logo} src={logo} alt="logo" />
                <div className={styles.register_text}>
                    <h1>Join to Company Name</h1>
                    <p>Company details here</p>
                </div>
                <form className={styles.register_form}>
                    <p>Nome</p>
                    <input type="text" />
                    <p>Email</p>
                    <input type="text" />
                    <p>Senha</p>
                    <input type="password" />
                    <p>Confirmar Senha</p>
                    <input type="password" />
                </form>
                <button className={styles.btn}>Criar conta</button>
                <p className={styles.redirect_login}>
                    Já possui conta? <Link to='/login'><a>Entrar</a></Link>
                </p>
            </div>
        </section>
    )
}
