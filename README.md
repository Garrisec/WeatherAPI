# WeatherAPI

Neste projeto, em vez de confiar em meus próprios dados meteorológicos, criei uma API meteorológica que busca e retorna dados meteorológicos de uma API de terceiros. Este projeto me ajudou a entender como trabalhar com APIs de terceiros, cache e variáveis de ambiente.

## Design

![Weather Design](/Weather-Project.png)

## Como usar

1. Clonar o repositório

```
git clone https://github.com/Garrisec/WeatherAPI.git
```

2. Instalar e iniciar o Redis

Linux:

```
sudo apt install redis
```

```
sudo systemctl start redis
```

3. Instalar dependencias

```
npm install
```

4. Iniciar servidor

```
node app.js
```