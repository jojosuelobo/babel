import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../public/logoUVV.png';
import styles from './Login.module.sass';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
export default function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <section className={styles.main_content}>
            <div className={styles.login_page}>
                <img className={styles.logo} src={logo} alt="logo" />
                <div className={styles.text}>
                    <h1 className={styles.title}>Bem-vindo de volta!</h1>
                    <p>Por favor, insira suas informações</p>
                </div>
                <form className={styles.login_form}>
                    <p>Nome de Usuário ou Email</p>
                    <input className={styles.login} type="text" />
                    <p>Senha</p>
                    <div className={styles.password_input}>
                        <input
                            className={styles.password}
                            type={passwordVisible ? 'text' : 'password'}
                        />
                        <button
                            className={styles.password_toggle}
                            onClick={togglePasswordVisibility}
                            type="button"
                        >
                            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>
                    <p>Esqueceu sua senha?</p>
                    <button className={styles.btn}>Entrar</button>
                    <p className={styles.redirect_login}>
                        Não possui uma conta?{' '}
                        <Link to={'/register'}>
                            <a>Registre-se aqui!</a>
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
}
