# Blog-NodeJs
Blog feito com NodeJs, sequelize e ejs

É necessário para rodar o programa ter instalado em sua máquina o nodejs, que pode ser instalado a partir desse link: https://nodejs.org/en/download

### Para rodar esse site, precisamos instalar algumas bibliotecas no computador

### express:

    npm install --save express 
### sequelize:

    npm install --save sequelize 

### mysql2:

    npm install --save mysql2 

### body-parser:

    npm install --save body-parser 

### ejs:

    npm install --save ejs

### express-session:

    npm install --save express-session

### bcryptjs:

    npm install --save bcryptjs

### slugify

    npm install --save slugify
### nodemon(opcional)

    npm install -g nodemon
### Funcionamento:
Esse site funciona da seguinte maneira, você pode entrar nele, e vizualizar artigos, escrito por diversar pessoas, com a sua conta criada e seu login feito, você consegue acessar a parte de administração, e também criar seus artigos e categorias de artigos.

### Banco de dados 
É importe que na conexão com o banco de dados, feita na pasta database/database.js, seja um banco que dados que já exista na sua máquina, o nome precisa ser igual para criar essa conexão, pode ser criado um banco vazio, apenas para ser criado a conexão, que as tabelas são geradas automaticamente com o sequelize, a única coisa que precisa ser feita é o nome do banco ser o mesmo, ou você criar um banco de dados mysql com o mesmo nome do banco de dados desse projeto em sua máquina. É preciso também alterar a senha do banco de dados, para a senha do seu banco, para que ele possa fazer a conexão

### Rodando o site:
Para rodar o site, basta iniciar o servidor, acessando o diretorio do projeto em algum terminal, e executar o comando: node index, ou se você estiver usando o nodemon: nodemon index, e depois acessar qualquer navegador e digitar localhost:8080, que é porta que definimos na criação do projeto.