import logo from '../../../public/logoUVV.png'
import './Login.sass'

export default function Login() {
  return (
    <section className='main-content'>
            <div className="login-page">
                <img className='logo' src={logo} alt="logo" />
                <div className="login-text">
                    <h1>Welcome back!</h1>
                    <p>Please enter your details</p>
                </div>
                <form className="login_form">
                    <p>Usuário ou Email</p>
                    <input
                        className='login'
                        type="text"
                    />
                    <p>Senha</p>
                    <input
                        className='password'
                        type="password"
                    />
                    <p>Esqueceu sua senha?</p>
                </form>
                <button>Criar conta</button>
                <p className='redirect-login'>Já possui conta? Entrar</p>
            </div>
        </section>
  )
}
