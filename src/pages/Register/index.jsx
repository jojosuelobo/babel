import logo from '../../../public/logoUVV.png'

export default function Register() {
    return (
        <section>
            <div className="register_page">
                <img src={logo} alt="logo" />
                <h1>Join to Company Name</h1>
                <p>Company details here</p>
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
                <p>Já possui conta? Entrar</p>
            </div>
        </section>
    )
}
