# Projeto de Atualização de Preços por CSV

## Introdução

Este projeto é parte de um desafio técnico para aprimorar minhas habilidades no desenvolvimento de software. O objetivo é criar uma ferramenta que permita um time de compras atualizar os preços de produtos de forma massiva através de um arquivo CSV, garantindo a consistência dos dados e o cumprimento das regras de negócio.

## Cenário

Alguns dos aspéctos importantes do cenário apresentados no desafio:

1. O time de Compras gera um arquivo CSV contendo códigos de produtos e seus novos preços.

2. O time Financeiro deseja impedir que o preço de venda fique abaixo do custo.

3. O time de Marketing quer evitar reajustes superiores ou inferiores a 10% dos preços atuais.

4. Alguns produtos são vendidos em pacotes, e reajustar o preço do produto deve atualizar os preços dos pacotes de forma que a soma permaneça a mesma. O mesmo deve acontecer ao atualizar o preço de um pacote, reajustando o valor do produto correspondente.

## Requisitos do Projeto

O projeto teve que ser desenvolvido seguindo os seguintes requisitos:

- **Back-end:** (Node.js);

- **Front-end:** (React.js);

- **Linguagem**: JavaScript ou TypeScript;

- **Banco de Dados**: MySQL (versão 5 ou 8).

- **Carregamento de Arquivo**: Deve ser possível carregar um arquivo CSV.

- **Validação**: O sistema deve verificar se todos os campos necessários estão presentes no arquivo, se os códigos de produtos existem, se os preços são válidos, e se as regras do cenário são atendidas.

- **Exibição de Informações**: Após a validação, o sistema deve mostrar informações sobre os produtos, incluindo código, nome, preço atual e novo preço.

- **Regras Quebradas**: Se alguma regra for quebrada, o sistema deve indicar qual regra foi violada.

- **Botão de Atualização**: O sistema deve ter um botão "ATUALIZAR" que permita salvar os novos preços no banco de dados.

- **Atualização de Preço de Custos**: Os preços de custo dos pacotes devem ser atualizados conforme a regra de soma dos componentes.

# Dependências Utilizadas

Este repositório contém um projeto backend que faz uso de várias dependências para funcionar corretamente. Abaixo, listamos as principais dependências e suas versões correspondentes:

## Dependências Principais - Backend

- **Express**: Um framework web rápido e minimalista para Node.js.

- **body-parser**: Middleware para analisar dados JSON ou de formulário em solicitações HTTP.

- **express-validator**: Um conjunto de middlewares express.js que envolvem validator.js validator e sanitizer.

- **multer**: Middleware para o manuseio de uploads de arquivos.

- **mysql2**: Um driver MySQL para Node.js.

- **papaparse**: Um analisador CSV para JavaScript.

- **sequelize**: Uma biblioteca ORM para Node.js, suportando os bancos de dados PostgreSQL, MySQL, SQLite e MSSQL.

- **cors**: Middleware para permitir solicitações de diferentes origens (CORS).

## Dependências de Desenvolvimento

- **sequelize-cli**: CLI (Command Line Interface) para o Sequelize, facilitando a criação e migração de bancos de dados.

Certifique-se de executar `npm install` para instalar todas as dependências necessárias antes de iniciar o projeto.

## Dependências Principais - Frontend

- **react**: Biblioteca para construir interfaces de usuário.

- **axios**: Cliente HTTP para realizar solicitações de rede.

Certifique-se de executar `npm install` para instalar todas as dependências necessárias antes de iniciar o projeto.

# Instruções para Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto após clonar o repositório do GitHub.

## Backend

**1.** Abra o terminal no diretório "backend" e certifique-se de que as dependências estão instaladas.

    npm install

**2.** No terminal acesse o MySQL 

    mysql -u root -p

**3.** Crie o banco de dados

    CREATE DATABASE meu_banco_precificacao;

**4.** De volta ao terminal da pasta backend execute as migrações do banco de dados com o seguinte comando:

    npx sequelize-cli db:migrate

**5.** Execute as migrações do banco de dados com o seguinte comando:

    npx sequelize db:seed:all
   
   Caso encontre algum erro ao utilizar o comando acima, pode ser por conta das tabelas estarem relacionadas, mas não há problema, pois podemos iniciar os seeder um de cada vez para evitar essas colisões. Em ordem, execute:
   
    npx sequelize-cli db:seed --seed 20230907214006-demo-products.js
    
    npx sequelize-cli db:seed --seed 20230907214010-demo-packs.js
    
**6.** Inicie o servidor backend de forma local:

    node server.js

## Frontend

**1.** Abra o terminal no diretório "frontend".

**2.** Execute o aplicativo React com o seguinte comando:

    npm start

Isso iniciará a aplicação frontend e você poderá acessá-la em seu navegador em [http://localhost:3000](http://localhost:3000).

Certifique-se de que todas as dependências foram instaladas corretamente antes de executar os comandos acima. Se você encontrar algum problema, verifique se todas as etapas foram seguidas corretamente e se as dependências estão atualizadas.

# Instruções de uso da aplicação

Ao realizar todas as inicializações do projeto, tanto no servidor backend quanto na aplicação frontend, carregará no navegador padrão da sua máquina uma página HTML contendo três botões:

**- Escolher arquivo:** Permite que o usuário selecione o arquivo CSV desejado.

**- Verificar:** Permite que o sistema faça a leitura e verificação do arquivo selecionado, retornando se o arquivo está de acordo com as regras de negócio da aplicação ou não. Caso esteja, o botão 'Atualizar' ficará habilitado.

**- Atualizar:** Caso todos os dados sejam válidos este botão ficará habilitado e permitirá enviar os dados novos para o backend atualizando nosso banco de dados.

# Estado atual do projeto
## Requisitos Alcançados
	
A aplicação está rodando os seguintes requisitos mínimos do projeto:
1. Permitir o upload de arquivos CSV à aplicação;
2. Leitura do arquivo CSV;
3. Validação do arquivo CSV conforme os dados passados no arquivo;
4. Validação do arquivo CSV conforme o reajuste de preços passado no arquivo respeitando a regra dos 10% máximos de reajuste, impedindo caso passe do limite.
## Requisitos Pendentes
O único requisito mínimo não atingido até esse momento é permitir o reajuste dos preços dos *produtos* atravéz da atualização dos preços dos *pacotes*. A base dessa regra de negócio já foi iniciada, porém ainda não finalizada.
## Bugs conhecidos
Até o momento a aplicação possui um erro ao adicionar o arquivo ao sistema, sendo necessário clicar duas vezes no botão de *Validar* para que possa aparecer o botão de *Atualizar* para mudar os dados dos produtos no backend da aplicação.
## Observações
A aplicação tem alguns ajustes a serem feitos como refatoração dos códigos e estilização no frontend e ajustes de responsividade. Os componentes podem receber alguns ajustes para melhor manutenção e leitura do código também.
