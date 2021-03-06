const prisma = require('./prisma');
const { hash } = require('../utilities/crypt');
const slugify = require('slugify'); // Função que cria o slug com base no título de cada BlogPost

// Usuário Padrão para utilizarmos nos testes
const default_user = {
    username: 'WillamSilva',
    email: 'william.simuleagora@gmail.com',
    password_hash: 'Codigo@2021',
};

// Usuário Bloqueado/Sem acesso para utilizarmos nos testes
const user_block = {
    username: 'faileduser',
    email: 'fail@email.com',
    password_hash: '123456',
};

const blogpost_1 = {
    title: 'Historico de profissional',
    content: 'Sumário da tragetória profissional.',
};

const blogpost_2 = {
    title: 'Como você decide desenvolver?',
    content: 'Processo de transição de carreira',
};

const blogpost_3 = {
    title: 'Você conhece as coisas de Back-end?',
    content: 'As mundanças e oportunidades de back-end  que a universidade oferece.',
};

// Função para Limpar o Banco de Dados
async function clearDB() {
    await prisma.blogPost.deleteMany({ where: {} });
    await prisma.user.deleteMany({ where: {} });
}

// Função para "Popular" o Banco de Dados
async function populateDB() {
    const new_user = await prisma.user.create({
        data: {
            username: default_user.username,
            email: default_user.email,
            password_hash: await hash(default_user.password_hash),
        },
    });

    const blogpost1 = await prisma.blogPost.create({
        data: {
            created_by: new_user.id,
            title: blogpost_1.title,
            content: blogpost_1.content,
            slug: slugify(blogpost_1.title, {
                // A propriedade remove, ignora caracteres especiais ao gerar o slug
                remove: /[*+~.()'"!?:@]/g,
                // A propriedade lower, já formata todos os caracteres para minúsculo
                lower: true,
            }),
        },
    });

    const blogpost2 = await prisma.blogPost.create({
        data: {
            created_by: new_user.id,
            title: blogpost_2.title,
            content: blogpost_2.content,
            slug: slugify(blogpost_2.title, {
                // A propriedade remove, ignora caracteres especiais ao gerar o slug
                remove: /[*+~.()'"!?:@]/g,
                // A propriedade lower, já formata todos os caracteres para minúsculo
                lower: true,
            }),
        },
    });

    const blogpost3 = await prisma.blogPost.create({
        data: {
            created_by: new_user.id,
            title: blogpost_3.title,
            content: blogpost_3.content,
            slug: slugify(blogpost_3.title, {
                // A propriedade remove, ignora caracteres especiais ao gerar o slug
                remove: /[*+~.()'"!?:@]/g,
                // A propriedade lower, já formata todos os caracteres para minúsculo
                lower: true,
            }),
        },
    });
}

async function main() {
    await populateDB();
}
if (process.env.NODE_ENV !== 'test') {
    main()
        .catch((e) => {
            console.error(e);
            process.exit(1);
        })
        .finally(async() => {
            await prisma.$disconnect();
        });
}

module.exports = {
    default_user,
    user_block,
    clearDB,
    populateDB,
};