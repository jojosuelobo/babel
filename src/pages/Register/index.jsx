import logo from '../../../public/logoUVV.png'
import './Register.sass'

export default function Register() {
    return (
        <section className='main-content'>
            <div className="register-page">
                <img className='logo' src={logo} alt="logo" />
                <div className="register-text">
                    <h1>Join to Company Name </h1>
                    <p>Company details here</p>
                </div>
                <form className="register_form">
                    <p>Nome</p>
                    <input
                        type="text"
                    />
                    <p>Email</p>
                    <input
                        type="text"
                    />
                    <p>Senha</p>
                    <input
                        type="password"
                    />
                    <p>Confirmar Senha</p>
                    <input
                        type="password"
                    />
                </form>
                <button>Criar conta</button>
                <p className='redirect-login'>Já possui conta? Entrar</p>
            </div>
        </section>
    )
}
