# 🐾 Find A Friend API  

Uma API para conectar pessoas interessadas em adotar pets a organizações (ONGs) responsáveis pelos animais.  

Feito para estudos e aplicação de conhecimento. Como: TDD, testes automatizados, CI/CD, Inverse dependency. 

## 🚀 Tecnologias Utilizadas  

- **[Node.js](https://nodejs.org/)** - Plataforma para construção da API  
- **[Fastify](https://fastify.dev/)** - Framework web rápido e eficiente  
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para maior segurança  
- **[Prisma ORM](https://www.prisma.io/)** - Manipulação eficiente do banco de dados  
- **[Zod](https://zod.dev/)** - Validação de schemas  
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Gerenciamento de variáveis de ambiente  
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)** - Hashing de senhas  
- **[FastifyJWT](https://www.npmjs.com/package/fastify-jwt)** - Autenticação JWT  
- **[FastifyCookie](https://www.npmjs.com/package/fastify-cookie)** - Manipulação de cookies  
- **[Vitest](https://vitest.dev/)** - Testes automatizados  
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD  

## 📦 Instalação  

1. Clone este repositório:  
   ```bash
   git clone https://github.com/seu-usuario/find-a-friend-api.git
   cd find-a-friend-api
  ```

  ```bash
   npm install
  ```

2. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```bash
DATABASE_URL="postgresql://docker:docker@localhost:5432/findafriendapipg?schema=public"
JWT_SECRET="sua_chave_secreta"
NODE_ENV="dev"
```

3. Suba o banco de dados PostgreSQL:

```bash
docker-compose up -d
```

4.Execute as migrações do banco de dados:

```bash
npx prisma migrate dev
```

5.Inicie o server:

```bash
npm run start:dev
```

## 🛠️ Rotas da API  

### 🏢 Rotas de ONGs  

| Método | Rota               | Descrição                            |
|--------|--------------------|--------------------------------------|
| PATCH  | `/token/refresh`   | Atualiza o token de autenticação    |
| POST   | `/org/authenticate`| Realiza login de uma ONG            |
| POST   | `/org`             | Cadastra uma nova ONG               |
| GET    | `/org/:id`         | Busca uma ONG por ID                |
| GET    | `/orgs`            | Lista todas as ONGs                 |
| GET    | `/orgs/nearby`     | Lista ONGs próximas ao usuário      |

### 🐶 Rotas de Pets  

| Método | Rota        | Descrição                         |
|--------|------------|----------------------------------|
| GET    | `/org/pets`| Lista os pets de uma ONG        |
| DELETE | `/org/pet` | Remove um pet                   |
| POST   | `/org/pet` | Cadastra um pet na plataforma   |


# 📜 Regras da Aplicação

- ✅ Deve ser possível cadastrar um pet  
- ✅ Deve ser possível deletar um pet  
- ✅ Deve ser possível listar todos os pets disponíveis para adoção em uma cidade  
- ✅ Deve ser possível filtrar pets por suas características  
- ✅ Deve ser possível visualizar detalhes de um pet para adoção  
- ✅ Deve ser possível se cadastrar como uma ONG  
- ✅ Deve ser possível realizar login como uma ONG  
- ✅ Deve ser possível visualizar as ONGs perto de você  

---

# 📜 Regras de Negócio

- ✅ Para listar os pets, obrigatoriamente precisamos informar a cidade  
- ✅ Uma ONG precisa ter um endereço e um número de WhatsApp  
- ✅ Um pet deve estar ligado a uma ONG  
- ✅ Todos os filtros, além da cidade, são opcionais  
- ✅ Para uma ONG fazer ações na aplicação, precisa estar logada  
- ✅ Apenas a ONG pode cadastrar um pet  
- ✅ Apenas a ONG pode excluir um pet  
- ✅ Nome da ONG deve ser único  
- ✅ Email da ONG deve ser único  
- ✅ Telefone da ONG deve ser único  


# 🧪 Testes

Este projeto utiliza o **Vitest** para a realização de testes automatizados.

## 📌 Comandos disponíveis

- **Rodar todos os testes**  
  ```sh
  npm run test
```

- **Rodar todos os testes de e2e**  
  ```sh
  npm run test:e2e
```

- **Rodar todos os testes de e2e e ver o resultado em tempo real**  
  ```sh
  npm run test:e2e:watch
  ```