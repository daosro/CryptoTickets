# CryptoTickets

TFM- UE Master Blockchain

Requisitos NodeJS v14

# https://trufflesuite.com/boxes/react/

En la consola:
truffle develop

compile
migrate

Tambíen se puede ejecutar con el comando:
sudo truffle compile

sudo truffle migrate --network matic
sudo truffle migrate --reset --network matic

Antes de ejecutar dicho comando es necesario modificar el fichero .env añadiendo las palabras semilla
MNEMONIC="Palabras semilla"

cd client
npm install
npm run start

# Todo / Nice to have

- Area de administración
  - Añadir cuenta de usuario a la lista de Abonados -
  - Airdrop de las entradas: TODO Modificar contrato para mintear las entradas
- Area de entradas
  - Mintear mi token de Abonado - Listo, faltan más NFT de ejemplo
    - Falta añadir mensaje de ok / ko
  - Ir al market
    - Visualizar las entradas de mi wallet -
    - Visualizar entradas disponibles
    - Poner a la venta mi entrada
    - Comprar una entrada
- Generación de la recompensa
  - Quema de la entrada
  - Airdrop de las recompensas
