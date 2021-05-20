# Hamburger-App
This repository contains the front end of Hamburger-App

## Objetivos

Criar uma aplicação web para gerir a venda de lanches, de modo que alguns lanches são opções de cardápio e outros podem conter ingredientes personalizados.
 
A seguir, apresentamos a lista de ingredientes disponíveis:

| Ingredientes               | Valor     |
|:---------------------------| :-------- |
| Alface                     | R$ 0,40   |
| Bacon                      | R$ 2,00   |
| Hambúrguer de carne        | R$ 3,00   |
| Ovo                        | R$ 0,80   |
| Queijo                     | R$ 1,50   |

Segue as opções de cardápio e seus respectivos ingredientes:

| Lanche                     | Ingredientes                             |
|:---------------------------| :--------------------------------------- |
| X-Bacon                    | Bacon, hambúrguer de carne e queijo      |
| X-Burger                   | Hambúrguer de carne e queijo             |
| X-Egg                      | Ovo, hambúrguer de carne e queijo        |
| X-Egg Bacon                | Ovo, bacon, hambúrguer de carne e queijo |

O valor de cada opção do cardápio é dado pela soma dos ingredientes que compõem o lanche. Além destas opções, o cliente pode personalizar seu lanche e escolher os ingredientes que desejar. Nesse caso, o preço do lanche também será calculado pela soma dos ingredientes.
 
Existe uma exceção à regra para o cálculo de preço, quando o lanche pertencer à uma promoção. A seguir, apresentamos a lista de promoções e suas respectivas regras de negócio:

| Promoção        | Regra de negócio                                                                                                            |
|:----------------| :-------------------------------------------------------------------------------------------------------------------------- |
| Light           | Se o lanche tem alface e não tem bacon, ganha 10% de desconto.                                                              |
| Muita carne     | A cada 3 porções de carne o cliente só paga 2. Se o lanche tiver 6 porções, ocliente pagará 4. Assim por diante...          |
| Muito queijo    | A cada 3 porções de queijo o cliente só paga 2. Se o lanche tiver 6 porções, ocliente pagará 4. Assim por diante...         |
| Inflação        | Os valores dos ingredientes são alterados com frequência e não gastaríamos que isso influenciasse nos testes automatizados. |


# Especificações do desenvolvimento.
 - Desenvolvido utilizando Javascript, CSS com o React.js
 - Desenvolido separando os componentes com suas devidas resposabilidades.
 - Testes automatizados criados com o cypress.


# Como rodar o projeto
 - Fazer a cópia do projeto.
 - Acessar a pasta client-burger
 - Rodar o comando 'yarn install ou npm install' para baixar todas as dependências do projeto.
 - Em seguida iniciar o projeto com o comando 'yarn run start ou npm run start'
 - O App vai estar disponível no localhost:3000
 - Para rodar o testes do cypress, iniciar o cypress com o comando yarn run cypress. Com ele aberto acessar a pasta integration e clicar no teste automated-tests.js
  
