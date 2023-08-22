# Tela de Login

## Descrição

Tela onde o usuário fará log in no sistema e acessar sua conta.

**Como** um usuário já cadastrado

**Quero** me logar com o serviço

**Para** ter acesso a minha conta, e utilizar da plataforma 

## Critérios de aceite

O formulário deve conter os seguintes campos

- Campo nome de usuário ou email
- Campo senha
- Botão “Entrar”
- Label “Esqueci a senha”
- Label “Não possui conta? Cadastre-se”

## Regras de negócio

### Campo nome de usuário ou Email

- Campo é obrigatório
- Campo deve conter um limite máximo de 64 caracteres
- Caso não tenha sido preenchido, ao clicar no botão de Entrar, deve ser apresentado a mensagem “Informe nome de usuário ou email”

### Campo Senha

- Campo é obrigatório
- A validação pode seguir a validação padrão do `<input type=”password”/>`

### Botão “Entrar”

- Caso os campos obrigatórios não tenham sido preenchidos corretamente, ao clicar no botão de Emtrar, deve ser apresentado a mensagem “Preencha os campos com corretamente”
- Caso os valores correspondem com um usuário válido cadastrado dentro do sistema, ao clicar em Entrar, o usuário em questão será levado até a página de home
- Caso os valores **não** correspondem com um usuário válido cadastrado dentro do sistema, ao clicar em Entrar, será lançado a mensagem de erro “Usuário ou senha incorretos”