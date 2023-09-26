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
    const [emailError, setEmailError] = useState("");

    const [passwordError, setPasswordError] = useState("");

    const { createUser, error: authError, emailError: testeEr, passwordError: senhaError } = useAuthentication();


    useEffect(() => {
        if (authError) {
            setError(authError);
        } if (testeEr) {
            setEmailError(testeEr);
        } if (senhaError) {
            setPasswordError(senhaError);
        }
    }, [authError, testeEr, senhaError]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setEmailError("");
        setPasswordError("");

        const user = {
            displayName,
            email,
            password,
        };

        if (password !== confirmPassword) {
            setError("As senhas precisam ser iguais.");
            return;
        }

        try {
            await createUser(user);
        } catch (err) {
            setEmailError(err.message);
            setError(err.message);
        }

        setDisplayName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")

    };

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
                        onChange={(e) => setDisplayName(e.target.value.replace(/[^A-Za-z]+/g, ''))}
                        value={displayName}
                    />
                    <p>Email</p>
                    <input
                        className={`${styles.register} ${emailError ? styles.input_error : ''}`}
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    {emailError && <p className={styles.text_error}>{emailError}</p>}

                    <p>Senha</p>
                    <input
                        className={`${styles.register} ${passwordError || error ? styles.input_error : ''}`}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <p>Confirmar Senha</p>
                    <input
                        className={`${styles.register} ${passwordError || error ? styles.input_error : ''}`}
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                    {(passwordError || error) && <p className={styles.text_error}>{passwordError || error}</p>}
                </form>
                <button className={styles.btn} onClick={handleSubmit}
                    disabled={!displayName || !email || !password || !confirmPassword || password !== confirmPassword}
                >Criar conta</button>


                <p className={styles.redirect_login}>
                    Já possui conta? <Link to='/login'><a>Entrar</a></Link>
                </p>
            </div>
        </section>
    )
}
