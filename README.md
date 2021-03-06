
API baseada em **Nodejs** 
 JavaScript

 É uma API REST para um sistema de criação, edição, visualização e exclusão de
 BlogPosts, com um sistema de autenticação simples.


## Tecnologias Aplicadas

---

> _Em ordem alfabética_

- [Docker](https://www.docker.com/ 'Docker'): "Contêinirização"
- [Express](https://expressjs.com/ 'Express'): Framework
- [Nodejs](https://nodejs.org/en/ 'Nodejs'): Eventos voltados para o Backend
- [Prisma](https://www.prisma.io/ 'Prisma'): ORM responsável pela Conexão com o Banco de Dados
- [PostgreSQL](https://www.postgresql.org/ 'PostgreSQL'): Sistema Gerenciador do Banco de Dados

## Dependências

---

> _Em ordem alfabética_

- [bcrypt](https://www.npmjs.com/package/bcrypt 'bcrypt'): Biblioteca para realizar _hash_ de senhas.
- [cross-env](https://www.npmjs.com/package/cross-env 'cross-env'): Módulo que permite executar scripts que definem e usam variáveis de ambiente.
- [ESLint](https://eslint.org/ 'ESLint'): "Corretor" de erros de Código/Sintaxe).
- [Jest](https://jestjs.io/ 'Jest'): Estrutura de testes de JavaScript.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken 'jsonwebtoken'): Módulo de Autenticação para Segurança da Aplicação.
- [nodemon](https://www.npmjs.com/package/nodemon 'nodemon'): Ferramenta que reinicia automaticamente o servidor quando mudanças são detectadas.
- [Prettier](https://prettier.io/ 'Prettier'): "Formatador" de Código
- [SuperTest](https://www.npmjs.com/package/supertest 'SuperTest'): Módulo para testes de Integração.
- [slugify](https://www.npmjs.com/package/slugify 'slugify'): Módulo para gerar _slugs_ automaticamente.
- [uuidv4](https://www.npmjs.com/package/uuidv4 'uuidv4'): Módulo para criar UUID (_Universally Unique IDentifier_) conforme [RFC1422].
- [winston](https://www.npmjs.com/package/winston 'winston'): Biblioteca para o registro de logging de Aplicações.

## MER (Modelo Entidade Relacionamento)

---

## Modelos de JSON para uso na Aplicação

---

**DICA:** Para facilitar as os testes utilizando o [Insomnia](https://insomnia.rest/ 'Insomnia'), crie uma "Enviroment":

```json
{
  "baseurl": "localhost:2121/v1"
}
```

> Para utilizar a "Enviroment", na barra de endereços utilize as teclas **Ctrl+Espaço**

### Login na Aplicação

#### Auth

- Login

Usuário Válido:

```json
{
  "username": "williamsilva",
  "password": "codigo@2021"
}
```

> **ATENÇÃO:** Após logar na Aplicação, será necessário "guardar" o Token gerado para prosseguir nos demais endpoints

Teste utilizando o Insomnia:

---
#### BlogPost

- POST (_Para criar um BlogPost_)

Exemplo de "Novo" Post:

> Inserir na barra do Insomnia

```
    localhost:2121/v1/blogpost/
```

JSON de "carga":

```json
{
  "username": "williamsilva",
  "title_post": "Um novo Post.",
  "content_post": "Exemplo"
}
```

> **IMPORTANTE:** Os três campos são obrigatórios.

**Retorno esperado:**

```json
{
  "post": {
    "user": {
      "username": "williamsilva"
    },
    "title": "Um novo Post.",
    "content": "Exemplo"
  },
  "msg": "Novo Post Criado!"
}
```


---

- GET (_Exibir um BlogPost pelo slug_)

Exemplo de consulta:

> Inserir na barra do Insomnia

```
    localhost:2121/v1/blogpost/the-history-of-my-life
```

**Retorno esperado:**

```json
{
  "post": {
    "user": {
      "username": "williamsilva"
    },
    "title": "Minha historia profissional!",
    "content": "Sumario da minha trajetória profissional",
    "slug": "A-historria-do-meu-trabalho"
  },
  "msg": "Post foi um sucessol!"
}
```
---

- PUT (_Para atualizar um BlogPost_)

Exemplo de Atualização de um Post:

> Inserir na barra do Insomnia

```
    localhost:2121/v1/blogpost/the-history-of-my-life
```

JSON de "carga":

```json
{
  "new_title": "Update Post",
  "new_content": "Example"
}
```

> **IMPORTANTE:** Os dois campos são obrigatórios.

**Retorno esperado:**

```json
{
  "post": {
    "user": {
      "username": "williamsilva"
    },
    "title": "Post alterado",
    "content": "Exemplo"
  },
  "msg": "Post alterado com sucesso!"
}
```

---

- DELETE (_Para deletar um BlogPost_)

Exemplo de Exclusão de um Post:

> Inserir na barra do Insomnia

```
    localhost:2121/v1/blogpost/why-did-i-choose-to-be-back-end
```

**Retorno esperado:**

```json
{
  "user": "williamsilva",
  "msg": " Post excluido com sucesso!"
}
```
---

## Comandos úteis para uso da Aplicação

---

### Developmente Server

Iniciar o servidor da Aplicação:

```
    $ npx yarn dev
```

### Docker

Subir as configurações do contêiner:

```
    $ docker-compose -f docker/docker-compose.yml up -d
```

### PostgreSQL (Banco de Dados) / ORM Prisma

Interface Visual no navegador para acessar o Banco de Dados:

```
    $ npx prisma studio
```

Iniciar Migration:

```
    $ npx yarn migrate
```

Carregar os dados de teste no Banco:

```
    $ npx yarn seed
```

Realizar o _reset_ das Migrations e limpar o Banco de Dados:

```
    $ npx yarn reset
```

> _**Atenção:** Após utilizar o comando "reset" será necessário rodar o comando '$ npx yarn seed'._

---

## Testes

Comando para rodar todos os testes:

```
    $ npx yarn test
```

> _**Atenção:** Após utilizar o comando '$ npx yarn test' a base do Banco de Dados será "limpa" e "populada" novamente de maneira automática._

### Testes de Integração

Comando para testar o arquivo **auth.test.js** (_diretório routes_) :

```
    $ npx yarn test routes/auth.test.js
```

Comando para testar o arquivo **blogpost.test.js** (_diretório routes_) :

```
    $ npx yarn test routes/blogpost.test.js
```

---

### Testes Unitários

Comando para testar o arquivo **crypt.test.js** (_diretório utilities_) :

```
    $ npx yarn test utilities/crypt.test.js
```

Comando para testar o arquivo **findPost.test.js** (_diretório controllers/blogPost_) :

```
    $ npx yarn test controllers/blogPost/findPost.test.js
```

Comando para testar o arquivo **findUsername.test.js** (_diretório controllers_) :

```
    $ npx yarn test controllers/findUsername.test.js
```

Comando para testar o arquivo **token.test.js** (_diretório auth_) :

```
    $ npx yarn test auth/token.test.js
```

---

### Coverage

Comando para validar o coverage:

```
    $ npx yarn test --coverage
```

---

## Logging

| Level |         Observação         |
| :---: | :------------------------: |
| info  |           Teste            |
| debug |      Dados do Usuário      |
| error | Erros de Banco / Aplicação |

---

_Aplicação desenvolvida por William Silva