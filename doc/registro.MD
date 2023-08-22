# Tela de Registro

## Descrição

Tela onde será cadastrado um novo usuário dentro do sistema.

**Como** um novo usuário

**Quero** me cadastrar no serviço

**Para** ter acesso a uma conta, e utilizar da plataforma 

## Critérios de aceite

O formulário deve conter os seguintes campos

- Campo nome de usuário
- Campo e-mail
- Campo senha
- Campo confirmar senha
- Botão “Criar conta”
- Label “Já possui conta? Entre”

## Regras de negócio

### Campo nome de usuário

- Campo é obrigatório
- Campo único, não podendo se repetir com outros usuários já cadastrados
- Campo deve conter um limite máximo de 64 caracteres
- Campo deve conter um valor mínimo de 3 caracteres
- Caso não tenha sido preenchido, ao clicar no botão de salvar, deve ser apresentado a mensagem “Informe nome de usuário válido”
- Os nomes de usuário pode conter letras (a-z), números (0-9)
- Os nome de usuário **não** podem conter acentos, letras acentuadas, "e" comercial (&), sinais de igual (=), maior e menor (<,>) e sinais de adição (+ ), vírgulas (,) ou pontos de exclamação (!), traços (-), sublinhados (_), apóstrofes (') e pontos (.)
- Campo não deve possuir espaços

### Campo E-mail

- Campo é obrigatório
- Campo único, não podendo se repetir com outros registros já cadastrados
- Campo não deve possuir espaços
- Campo deve estar no formato nome@dominio.com | .com.br
- A validação pode seguir a validação padrão do `<input type=”email”/>`

### Campo Senha

- Campo é obrigatório
- A senha deve conter no mínimo 8 caracteres
- A validação pode seguir a validação padrão do `<input type=”password”/>`

### Campo Confirmar Senha

- Campo é obrigatório
- O valor do campo deve ser o mesmo do campo Senha
- A validação pode seguir a validação padrão do `<input type=”password”/>`

### Botão “Criar conta”

- Caso os campos obrigatórios não tenham sido preenchidos corretamente, ao clicar no botão de salvar, deve ser apresentado a mensagem “Preencha os campos com corretamente”
- Botão deve somente fazer envio dos dados quando todos os campos atenderem aos requisitos dos mesmo

### Mensagens de erro

- e-mail não cadastrado que não atenda aos critérios de validação
    - Insira um endereço de E-mail válido!
- e-mail já cadastrado no sistema
    - Este e-mail já está sendo usado.
- Senha com quantidade de caracteres inferior a 8
    - Senha deve conter mais de 8 caracteres.
- Campo email ou senha nulo
    - Campos email ou senha não podem ser nulos