# Toughts
## sobre
projeto usando express para anotação de pensamentos e idéias,usando sistema de login e autenticação, e para isso precisei usar bibliotecas como bcryptjs para encriptografar a senha,express-session,session-file-store,cookie-sesion e cookie-parser
para estabelecer uma sessão quando o usuário logar no sistema,onde salvo um cookie que possui uma expiração de um dia ou também pode ser destruido caso o usuario faça logout,também usei sequelize para trabalhar com banco de dados,e também usei 
libs como express-flash para disparar flash messages para o usuario para dar um norte sobre suas atividades.

## rodando o projeto
-instale todas as  dependencias no npm com:

` npm install bcryptjs connect-flash cookie-parser cookie-session dotenv express express-flash express-handlebars express-session mysql2 nodemon sequelize session-file-store`
