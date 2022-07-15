<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Pré-requis

Pour pouvoir exécuter cette applicaion vous devez avoir POSTGRES installé et lancé, NodeJS, NPM et le package manager YARN doivent être aussi installés.

A la racine du projet, créer deux fichiers .env.dev et .env.test avec les variables d'environnement décrites dans .env.example. N'oubliez pas d'assigner chaque valeur à la valeur réelle de votre environnement. Par exemple:

```bash
DB_TYPE=postgres
DB_HOST=192.168.1.21
DB_PORT=5432
DB_USERNAME=user
DB_PASSWORD=password
DB_NAME=ceiling
```

## Installation

Pour installer tous les packages requis, lancez la commande :

```bash
$ yarn
```

## Running the app

Pour lancer l'API, lancez l'une de ces deux commandes :

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Tester l'API

Pour lancer les test:

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Swagger

Pour lancer la documentation de l'API via swagger, allez sur le lien suivant après avoir lancé l'API:

```bash
http://localhost:3000/api
```

## NB:

N'oubliez pas, l'api se lance par défaut au port 3000, si vous voulez changer cette configuration, faites le dans le fichier main.ts à cette ligne :

```bash
await app.listen(process.env.PORT || 3000);
```
