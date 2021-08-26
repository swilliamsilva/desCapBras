const request = require('supertest');
const app = require('../index');
const { default_user } = require('../prisma/seed');
const { populateDB, clearDB } = require('../prisma/seed');

beforeAll(async () => {
  await clearDB();
  await populateDB();
});

afterAll(async () => {
  await clearDB();
  await populateDB();
});

let tokenJWT = '';

let createdPost = '';

let validSLUG = 'how-did-i-decide-to-become-a-developer';
let failedSLUG = 'failed-slug';
let testDeleteSLUG = 'why-did-i-choose-to-be-back-end';

let userOK = {
  username: default_user.username,
  password: default_user.password_hash,
};

let newPost = {
  username: default_user.username,
  title_post: 'A New Post.',
  content_post: 'Example',
};

let failedPost = {
  username: default_user.username,
  title_post: 'Failed Post',
};

let failUserPost = {
  username: 'failuser',
  title_post: 'Failed Post',
};

let updatePost = {
  new_title: 'An Updated Post',
  new_content: 'Example of Update',
};

describe('Auth Endpoint', () => {
  // Teste de Login na Aplicação: Usuário e Senha Válidos
  it('Successful Login Test in Application', function (done) {
    request(app)
      .post('/v1/auth')
      .send(userOK)
      .set('Accept', 'application/json')
      .expect(202)
      .expect('Content-Type', /json/)
      .expect((res) => {
        let { token } = res.body;
        console.log(res.body);
        tokenJWT = token;
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('BlogPost Endpoint', () => {
  // Teste para validar o endpoint para CRIAR um Novo Post
  // Este teste valida também a função 'findPost (id)'
  it('Create New Post', function (done) {
    console.log('TokenJWT:', tokenJWT);
    console.log('newPost:', newPost);
    request(app)
      .post('/v1/blogpost')
      .auth(tokenJWT, { type: 'bearer' })
      .send(newPost)
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', /json/)
      .expect((res) => {
        let { returnPost } = res.body;
        createdPost = returnPost;
        console.log('✅ Criado um novo Posto - Sucesso:', res.body);
      })
      .end((err) => {
        console.log(err);
        if (err) return done(err);
        done();
      });
  });

  // Teste para validar erro no corpo da requisição
  it('Falha na criação de um novo Post', function (done) {
    console.log('TokenJWT:', tokenJWT);
    console.log('newPost:', failedPost);
    request(app)
      .post('/v1/blogpost')
      .auth(tokenJWT, { type: 'bearer' })
      .send(failedPost)
      .set('Accept', 'application/json')
      .expect(400)
      .expect('Content-Type', /json/)
      .expect((res) => {
        let { returnPost } = res.body;
        console.log('❌ Não pode criar o seu post.');
      })
      .end((err) => {
        console.log(err);
        if (err) return done(err);
        done();
      });
  });

  // Teste para validar Username Inválido
  it('Falha na criação de um novo Post porque o usuário é invalido.', function (done) {
    console.log('TokenJWT:', tokenJWT);
    console.log('newPost:', failUserPost);
    request(app)
      .post('/v1/blogpost')
      .auth(tokenJWT, { type: 'bearer' })
      .send(failUserPost)
      .set('Accept', 'application/json')
      .expect(401)
      .expect('Content-Type', /json/)
      .expect((res) => {
        let { returnPost } = res.body;
        console.log('❌ Invalido nome do usuário.');
      })
      .end((err) => {
        console.log(err);
        if (err) return done(err);
        done();
      });
  });

  // Teste para validar o endpoint para EXIBIR um Post
  it('Show Post by SLUG', function (done) {
    console.log('TokenJWT:', tokenJWT);
    console.log('findPost(bySLUG):', validSLUG);
    request(app)
      .get(`/v1/blogpost/${validSLUG}`)
      .auth(tokenJWT, { type: 'bearer' })
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        let { getPost } = res.body;
        console.log('✅ Show Post Successo', res.body);
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Teste para validar quando um slug inválido for informado como parâmetro ao tentar EXIBIR um Post
  it('Fail to show Post by SLUG', function (done) {
    console.log('TokenJWT:', tokenJWT);
    console.log('findPost(bySLUG):', failedSLUG);
    request(app)
      .get(`/v1/blogpost/${failedSLUG}`)
      .auth(tokenJWT, { type: 'bearer' })
      .set('Accept', 'application/json')
      .expect(404)
      .expect('Content-Type', /json/)
      .expect((res) => {
        let { getPost } = res.body;
        console.log('❌ Erro exobindo Post by SLUG');
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Teste para validar o endpoint para ATUALIZAR um Post
  it('Update Post by SLUG', function (done) {
    console.log('TokenJWT:', tokenJWT);
    console.log('findPost(bySLUG):', validSLUG);
    request(app)
      .put(`/v1/blogpost/${validSLUG}`)
      .auth(tokenJWT, { type: 'bearer' })
      .send(updatePost)
      .expect(202)
      .expect('Content-Type', /json/)
      .expect((res) => {
        let { updatePost } = res.body;
        console.log('✅ Alteração no  Post Sucesso:', res.body);
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Teste para validar quando um slug inválido for informado como parâmetro ao tentar ATUALIZAR um Post
  it('Fail to update Post by SLUG', function (done) {
    console.log('TokenJWT:', tokenJWT);
    console.log('findPost(bySLUG):', failedSLUG);
    request(app)
      .put(`/v1/blogpost/${failedSLUG}`)
      .auth(tokenJWT, { type: 'bearer' })
      .send(updatePost)
      .expect(406)
      .expect('Content-Type', /json/)
      .expect((res) => {
        let { updatePost } = res.body;
        console.log('❌ Fechado para update!');
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Teste para validar o endpoint para DELETAR um Post
  it('Delete Post by SLUG', function (done) {
    console.log('TokenJWT:', tokenJWT);
    console.log('findPost(bySLUG):', testDeleteSLUG);
    request(app)
      .delete(`/v1/blogpost/${testDeleteSLUG}`)
      .auth(tokenJWT, { type: 'bearer' })
      .expect(202)
      .expect('Content-Type', /json/)
      .expect((res) => {
        let { deletePost } = res.body;
        console.log('✅ Post eliminado com sucesso:', res.body);
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Teste para validar quando um slug inválido for informado como parâmetro ao tentar DELETAR um Post
  it('Falha em apagar o Post by SLUG', function (done) {
    console.log('TokenJWT:', tokenJWT);
    console.log('findPost(bySLUG):', failedSLUG);
    request(app)
      .delete(`/v1/blogpost/${failedSLUG}`)
      .auth(tokenJWT, { type: 'bearer' })
      .expect(406)
      .expect('Content-Type', /json/)
      .expect((res) => {
        let { deletePost } = res.body;
        console.log('❌ Não pode apagar!');
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

// PARA RODAR ESTE ARQUIVO DE TESTES:
// $ npx yarn test routes/blogpost.test.js
