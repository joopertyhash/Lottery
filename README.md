# Lottery Pool

Lottery pool is a simple web based game where you can enter to compete with other players
to win money

# You need to have [Metamask](https://metamask.io/) installed to use this app

you can play [here](https://aklssl.now.sh)

The game works as follows:

1. A manager starts the game
2. Players has to pay a least 0.1 ether to enter the game
  * You need to have [metamask](https://metamask.io/) installed in your browser
    then create an account and get some ether to your account at [rinkeby-faucet](https://faucet.rinkeby.io/)
3. The game prize is created by collecting all the ether paid by players
4. The smart contract behind the game pick randomly a winner and sends the money to its account


## For devs

This game is interacting with a tested and deployed smart contract placed in this repo,
where you can find the smart contract solidity code, a **compile** and a **deploy** script,
together with lots of **test cases**. [lottery](https://github.com/Rafaell416/lottery)

The contract was deployed to Rinkeby Test Network using [infura](https://infura.io/)
and is located at this address [0xbEca329eBF7583cE37966f1de407a145B801944d](https://rinkeby.etherscan.io/address/0xbEca329eBF7583cE37966f1de407a145B801944d)


### Running the app locally

```
git clone git@github.com:Rafaell416/lottery-pool.git

cd lottery-pool

yarn install

yarn start
```
