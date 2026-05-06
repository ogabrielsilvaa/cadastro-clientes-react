# 📋 Cadastro de Clientes

Este é um projeto focado no desenvolvimento de uma interface frontend para o cadastro de clientes. O sistema conta com um formulário interativo, responsivo e com validações de dados no lado do cliente, garantindo uma melhor experiência do usuário e integridade inicial das informações.

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando o seguinte ecossistema:

* **[Next.js](https://nextjs.org/)** - Framework React para renderização e estruturação.
* **[React](https://reactjs.org/)** - Biblioteca principal para construção da interface.
* **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para maior segurança e previsibilidade do código.
* **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS utilitário para a estilização rápida e responsiva.

## ✨ Funcionalidades Atuais

* **Interface Responsiva:** Estilização limpa e adaptável focada na usabilidade.
* **Gestão de Estado:** Controle dos inputs de formulário (Nome, Email, Senha, Telefone, Data de Nascimento e CPF) utilizando hooks do React (\`useState\`).
* **Validação de Dados Estrita:**
  * Verificação de campos vazios.
  * Validação de formato de E-mail via Regex.
  * Validação de força de senha (8-16 caracteres, maiúsculas, minúsculas, números e caracteres especiais).
  * Verificação de comprimento exato do CPF (11 dígitos).
* **Feedback Visual:** Exibição dinâmica de mensagens de erro e alerta de sucesso.
* **Limpeza de Formulário:** Botão dedicado para redefinir o estado de todos os campos.

## 🛠️ Como Executar o Projeto Localmente

### Instalação

1. Clone o repositório:
   ```bash
   git clone <https://github.com/ogabrielsilvaa/cadastro-clientes-react.git>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   npm run dev
   ```

## 👨‍💻 Autor
Desenvolvido por **Gabriel Silva**.
