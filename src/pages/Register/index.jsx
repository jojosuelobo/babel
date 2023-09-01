import logo from '../../../public/logoUVV.png'
import styles from './Register.module.sass'
import { Link } from 'react-router-dom';

export default function Register() {
    return (
        <section className={styles.main_content}>
            <div className={styles.register_page}>
                <img className={styles.logo} src={logo} alt="logo" />
                <div className={styles.register_text}>
                    <h1>Join to Company Name </h1>
                    <p>Company details here</p>
                </div>
                <form className={styles.register_form}>
                    <p>Nome Completo</p>
                    <input
                        type="text"
                    />
                    <p>Nome de Usuário</p>
                    <input
                        type="text"
                    />
                    <p>E-mail</p>
                    <input
                        type="text"
                    />
                    <p>Senha</p>
                    <input
                        type="password"
                    />
                    <p>Confirme a sua Senha</p>
                    <input
                        type="password"
                    />
                    <button className={styles.btn}>Criar conta</button>
                    <p className={styles.redirect_login}>Já possui conta?{' '}
                        <Link to={'/login'}>
                            <a>Entre aqui!</a>
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    )
}
