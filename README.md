# Cypress API Automation – Serverest

Este projeto tem como objetivo automatizar testes de API utilizando [Cypress](https://www.cypress.io/) para a API RESTful disponível em: [https://serverest.dev](https://serverest.dev). A automação cobre operações de **CRUD de usuários**, com autenticação via **JWT**, e está integrada a uma pipeline de CI com **GitHub Actions**, incluindo geração de relatórios com `mochawesome`.

---

## Funcionalidades Testadas

Os testes implementados cobrem os principais endpoints da API de usuários:

- **POST /usuarios**: Criação de novo usuário.
- **POST /login**: Autenticação e obtenção de token JWT.
- **GET /usuarios**: Listagem de todos os usuários.
- **GET /usuarios/{id}**: Consulta de usuário específico por ID.
- **PUT /usuarios/{id}**: Atualização de usuário existente (com token).
- **DELETE /usuarios/{id}**: Exclusão de usuário (com token).

---

## Requisitos do ambiente

Antes de rodar os testes localmente, verifique se possui:

- Node.js v18+
- npm (gerenciador de pacotes)
- Git (opcional, para clonar o projeto)

---

## Como rodar os testes localmente

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. **Instale as dependências**

```bash
npm install
```

3. **Execute os testes**

```bash
npx cypress run --e2e
```

4. **Abrir o Cypress com interface gráfica (opcional)**

```bash
npx cypress open
```

---

## Relatórios de Teste

Os testes geram um relatório em formato HTML, que mostra o que foi testado e se passou ou não. Esse relatório é criado com a ajuda do plugin mochawesome, que organiza e apresenta os resultados dos testes de forma mais visual e compreensível.

Após a execução, o relatório pode ser encontrado em:

```bash
cypress/reports/mochawesome.html
```

Na **integração contínua (CI)**, esse relatório é salvo como artefato no GitHub Actions.

---

## Integração Contínua (CI)

Este projeto possui integração com **GitHub Actions**, que executa os testes automaticamente a cada `push` ou `pull request` nas branches `main` e `develop`.

**Pipeline executa as seguintes etapas:**

- Instala dependências
- Roda os testes Cypress
- Gera e salva relatório de testes
- Publica o relatório como artefato

---

## Estrutura de pastas

```
├── .github/
│   └── workflows/
│       └── cypress-api.yml
├── cypress/
│   ├── e2e/
│   │   └── serverestApi.cy.js
│   ├── reports/
│   │   └── mochawesome.html
│   └── support/
│       └── e2e.js
├── cypress.config.js
├── package.json
└── README.md
```

---

## Autor

Este projeto foi desenvolvido como parte de um desafio técnico para a vaga de QA Automation.
