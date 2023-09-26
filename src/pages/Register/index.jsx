/* eslint-disable no-unused-vars */
import logo from '../../../public/logoUVV.png'
import styles from './Register.module.sass'

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthentication } from '../../firebase/useAuth';

export default function Register() {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const { createUser, error: authError, loading } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        const user = {
            displayName,
            email,
            password,
        };

        if (password !== confirmPassword) {
            setError("As senhas precisam ser iguais.");
            return;
        }

        const res = await createUser(user);

        //console.log(res);
        setDisplayName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")

    };

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

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
                    <input
                        type="text"
                        onChange={(e) => setDisplayName(e.target.value)}
                        value={displayName}
                    />
                    <p>Email</p>
                    <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <p>Senha</p>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <p>Confirmar Senha</p>
                    <input
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                </form>
                <button className={styles.btn} onClick={handleSubmit}>Criar conta</button>

                {/* {loading && (
                    <button className="btn" disabled>
                        Aguarde...
                    </button>
                )} */}
                {error && <p className="error">{error}</p>}
                <p className={styles.redirect_login}>
                    Já possui conta? <Link to='/login'>Entrar</Link>
                </p>
            </div>
        </section>
    )
}
