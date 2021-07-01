<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Technical Challenge Description

The purpose of the exercise is to create an REST API for the customer of the bank that will be used to make money transfers between accounts. You will need to design and implement it

### Use Cases

- Create money transfers from one account to another

- View transactions after transfer completed under each account

### Tech Requirements

- You can use vanilla js or typescript

- No need to perform auth checks to keep things simple

- You can use frameworks/libraries if you like, keep at minimum as possible

- Do not use a DB Service like MongoDB or MySQL, instead use in-memory storage or build your own service. Also avoid to use a ORM module

- Use GIT to track your changes, please send us a zip file with ./git included*

- Include in the code automation testing to check that the API works as expected.

- Errors should be properly handled 

- It’s desirable to implement with DDD/Clean architecture is preferred

## In-Memory DB Schema

### Customer
    - id
    - name

### Account
    - id
    - customerId
    - name

### Transaction
    - id
    - accountId
    - amount
    - balance
    - createdAt
    - transferKey (account-A-id + account-B-id)

## API

### Global Prefix
    api/v1
### Customer
Create Customer:

    POST: {prefix}/customer 

Get All Customers:

    GET: {prefix}/customer
  
Get One Customer:

    GET: {prefix}/customer/:id

### Account
Create Account:

    POST: {prefix}/account
    
 Get All Accounts for a customer:

    GET: {prefix}/account/:customerId
  
 Get One Account:

    GET: {prefix}/account/detail/:id
    
 Update Account:

    PATCH: {prefix}/account/:id
    
 Delete Account:

    DELETE: {prefix}/account/:id
    
 Get Account Balance:
 
    GET: {prefix}/account/balance/:id
 
 Top-up Money:    
 
    POST: {prefix}/account/topup
    
 Transfer Money: 

    POST: {prefix}/account/transfer
    
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

**Important: Please note that only the e2e tests are implemented for this project**

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

behzad.ghaffarnejad@gmail.com

