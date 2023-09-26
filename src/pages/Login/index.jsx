/* eslint-disable no-unused-vars */
import logo from '../../../public/logoUVV.png'
import styles from './Login.module.sass'

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthentication } from '../../firebase/useAuth';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailPasswordError, setEmailPasswordError] = useState("");

  const { login, emailError: authError, emailPasswordError: testError } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setError("");
    setEmailError("");
    setEmailPasswordError("");

    const user = {
      email,
      password,
    };

    try {
      await login(user);
    } catch (err) {
      //setError(err.message);
      setEmailError(err.message);
      setEmailPasswordError(err.message);
    }

  };

  useEffect(() => {
    if (authError) {
      setEmailError(authError);
    } else if (testError) {
      setEmailPasswordError(testError);
    }
  }, [authError, testError]);




  return (
    <section className={styles.main_content}>
      <div className={styles.login_page}>
        <img className={styles.logo} src={logo} alt="logo" />
        <div className={styles.login_text}>
          <h1 className={styles.title}>Welcome back!</h1>
          <p>Please enter your details</p>
        </div>
        <form className={styles.login_form}>

          <p>Email</p>
          <input
            className={`${styles.login} ${emailError || emailPasswordError ? styles.input_error : ''}`}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className={styles.text_error}>{emailError}</p>}

          <p>Senha</p>
          <input
            className={`${styles.login} ${emailPasswordError ? styles.input_error : ''}`}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p style={{ fontSize: '0.775rem', textAlign: 'right', marginTop: '7px', cursor: 'pointer' }}>Esqueceu sua senha?</p>
          {emailPasswordError && <p className={styles.password_error}>{emailPasswordError}</p>}
        </form>
        <button className={styles.btn} onClick={handleSubmit} disabled={!email || !password}>Entrar</button>
        <p className={styles.redirect_login} style={{ marginTop: '-15px', fontSize: '0.875rem' }}>Não tem uma conta ainda? <Link to='/register'><a>Criar conta</a></Link></p>
      </div>
    </section>
  )
}
