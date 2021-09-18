const path = require('path')
const solc = require('solc')
const fs = require('fs-extra')

const buildPath = path.resolve(__dirname, 'build')
fs.removeSync(buildPath)

const contractPath = path.resolve(__dirname, 'contracts', 'ReceivePayment.sol');
const source = fs.readFileSync(contractPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'ReceivePayment.sol' : {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': [ '*' ]
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
//const interface = output.contracts['ReceivePayment.sol'].ReceivePayment.abi;
//const bytecode = output.contracts['ReceivePayment.sol'].ReceivePayment.evm.bytecode.object;

for (let contract in output.contracts['ReceivePayment.sol']) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output.contracts["ReceivePayment.sol"][contract]
  )
}
