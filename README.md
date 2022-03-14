# Accessing private data

## Dependencies

* Node v14.17.5
* npm 6.14.14
* web3 v1.7.1 
* truffle v5.1.55

## Resources

* [Solidity by Example](https://solidity-by-example.org/hacks/accessing-private-data/)


## Testing
Compile contract:
```
truffle compile
```
Before deploy it, you should run in a console:
```
ganache-cli
```
Deploy contract into a local blockchain:
```
truffle migrate --network development
```
Go into src folder and run:
```
node get_data.js
```
