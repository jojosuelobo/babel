/* eslint-disable no-unused-vars */
import logo from '../../../public/logoUVV.png'
import styles from './Login.module.sass'

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthentication } from '../../firebase/useAuth';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
    };

    const res = await login(user);

    console.log(res);
  };

  useEffect(() => {
    console.log(authError);
    if (authError) {
      setError(authError);
    }
  }, [authError]);

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
            className={styles.login}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Senha</p>
          <input
            className={styles.password}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p style={{ fontSize: '0.775rem', textAlign: 'right', marginTop: '7px', cursor: 'pointer' }}>Esqueceu sua senha?</p>
        </form>
        <button className={styles.btn} onClick={handleSubmit}>Entrar</button>
        <p className={styles.redirect_login} style={{ marginTop: '-15px', fontSize: '0.875rem' }}>Não tem uma conta ainda? <Link to='/register'><a>Criar conta</a></Link></p>
      </div>
    </section>
  )
}
