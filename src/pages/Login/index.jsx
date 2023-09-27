import logo from '../../../public/logoUVV.png'
import styles from './Login.module.sass'

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
//import { useAuthentication } from '../../firebase/useAuth';
import { useAuthentication } from '../../supabase/useAuth';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState("");

  const { login, error } = useAuthentication();

  useEffect(() => {
    if (errors) {
      setError(errors);
    }
  }, [errors]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const user = {
      email,
      password,
    };

    try {
      await login(user);
    } catch (err) {
      /* empty */
    }
  };

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
            className={`${styles.login} ${ (errors.email || errors.global) ? styles.input_error : ''}`}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className={styles.email_error}>{errors.email}</p>}

          <p>Senha</p>
          <input
            className={`${styles.login} ${errors.password || errors.global ? styles.input_error : ''}`}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p style={{ fontSize: '0.775rem', textAlign: 'right', marginTop: '7px', cursor: 'pointer' }}>Esqueceu sua senha?</p>
          {(errors.password || errors.global) && <p className={styles.password_error}>{errors.password || errors.global}</p>}
        </form>
        <button className={styles.btn} onClick={handleSubmit} disabled={!email || !password}>Entrar</button>
        <p className={styles.redirect_login} style={{ marginTop: '-15px', fontSize: '0.875rem' }}>Não tem uma conta ainda? <Link to='/register'><a>Criar conta</a></Link></p>
      </div>
    </section>
  )
}
