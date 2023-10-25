import logo from '../../../public/logo.png'
import styles from './Register.module.sass'

import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthentication } from '../../supabase/useAuth';

export default function Register() {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [errorDisplayName, setDisplayNameError] = useState("");
    const { createUser, errors } = useAuthentication();

    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            setError(error);
        }
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            email,
            password,
        };

        if (password !== confirmPassword) {
            setError("As senhas precisam ser iguais.");
            return;
        }

        try {
            await createUser(user);
            navigate('/login');
        } catch (err) { /* empty */ }

        setDisplayName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    };

    const handleDisplayNameChange = (e) => {
        const enteredValue = e.target.value;

        // Verifica se o valor contém números usando uma expressão regular
        const containsNumbers = /\d/.test(enteredValue);

        if (containsNumbers) {
            setDisplayNameError("O nome não pode conter números.");
        } else {
            setDisplayNameError(""); // Limpa o erro se o valor for válido
            setDisplayName(enteredValue);
        }
    };

    return (
        <div id={styles.register}>
            <section className={styles.main_content}>
                <div className={styles.register_page}>
                    <img className={styles.logo} src={logo} alt="logo" />
                    <div className={styles.register_text}>
                        <h1>Babel</h1>
                        <p>Crie sua conta</p>
                    </div>
                    <form className={styles.register_form}>
                        <p>Nome</p>
                        <input
                            className={`${styles.register} ${errorDisplayName ? styles.input_error : ''}`}
                            type="text"
                            onChange={handleDisplayNameChange}
                            value={displayName}
                        />
                        {errorDisplayName && <p className={styles.text_error}>{errorDisplayName}</p>}
                        <p>Email</p>
                        <input
                            className={`${styles.register} ${errors.email ? styles.input_error : ''}`}
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        {errors.email && <p className={styles.text_error}>{errors.email}</p>}

                        <p>Senha</p>
                        <input
                            className={`${styles.register} ${errors.password || error ? styles.input_error : ''}`}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <p>Confirmar Senha</p>
                        <input
                            className={`${styles.register} ${errors.password || error ? styles.input_error : ''}`}
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                        />
                        {(errors.password || error) && <p className={styles.text_error}>{errors.password || error}</p>}
                    </form>
                    <button className={styles.btn} onClick={handleSubmit}
                        disabled={!displayName || !email || !password || !confirmPassword}
                    >Criar conta</button>


                    <p className={styles.redirect_login}>
                        Já possui conta? <Link to='/login'>Entrar</Link>
                    </p>
                </div>
            </section>
        </div>
    )
}
