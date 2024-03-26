[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://github.com/noonewallet/widget-communicator/LICENSE)
[![Platform](https://img.shields.io/badge/platform-web-blue.svg?style=flat)]()
![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fnoonewallet%2Fwidget-communicator%2Fmain%2Fpackage.json&query=version&label=version)

# @noonewallet/widget-communicator

## Description

**@noonewallet/widget-communicator** is a TypeScript library that enables embedding an iframe with the Noone Wallet
crypto wallet onto a web page, and subsequently configuring communication between the iframe and the parent page.

## Installation

Installation is done using either of the following commands:

```shell
yarn add git+https://github.com/noonewallet/widget-communicator.git
```

or

```shell
npm install git+https://github.com/noonewallet/widget-communicator.git
```

**Note**: Node version >= 16.15.0

## Generating Iframe on Page

To generate an iframe on the page, execute the following code:

Add a `<div>` element to the page with a unique ID, for example, `wallet-iframe`.

```html

<body>
...
<div id="wallet-iframe"></div>
</body>
```

```ts
import {IframeManager} from '@noonewallet/widget-communicator'

const iframe = new IframeManager('wallet-iframe', 'https://iframe-url.com/')
const loaded = await iframe.render() // true

```

- **wallet-iframe** - the id attribute of the iframe, must be unique.
- **https://iframe-url.com/** - the iframe URL.
- **iframe.render()** - awaits until the iframe is rendered on the page.

After these steps, the iframe will appear on the page, and you can proceed to configure communication with it.

## Setting up Communicator

To establish communication between the iframe and the parent website, you need to instantiate the `EvmConnector` class.
Currently, only operations with EVM (Ethereum Virtual Machine) currencies are supported. You can retrieve the list of
available chains using the `.getAvailableChains()` method.

### Example of Communicator Setup:

```ts
const iframe = new IframeManager('noone-iframe', 'https://iframe-url.com/')
await iframe.render()
const evmConnector = new EvmConnector(iframe)
```

Now, you can send events to the iframe through the connector. Below, the available methods will be described.

## Communicator API

### Get Address

Returns the wallet address.

```ts
const result = await evmConnector.send({
  chainId: 1,
  method: 'getAddress'
})

if (result.success) {
  console.log('Address: ' + result.data) // 0x...
} else {
  console.log('Response error: ' + result.error.message)
}
```

### Get Balance

Returns the wallet balance.

```ts
const result = await evmConnector.send({
  chainId: 1,
  method: 'getBalance'
})

if (result.success) {
  console.log('Balance: ' + result.data) // 5000000000000000000 (wei)
} else {
  console.log('Response error: ' + result.error.message)
}
```

### Sign Message

Signs a provided message with your private key.
**Note:** User confirmation is required on the iframe side. A popup window with signature confirmation will appear in
the iframe. In case of rejection, an error will be returned.

```ts
const result = await evmConnector.send({
  chainId: 1,
  method: 'signMessage',
  params: 'hello'
})

if (result.success) {
  console.log('Signed message: ' + result.data) // 0x0234....
} else {
  console.log('Response error: ' + result.error.message)
}
```

### Sign Transaction

Signs a provided transaction. Returns the signed transaction in hex format.
**Note:** User confirmation is required on the iframe side. A popup window with signature confirmation will appear in
the iframe. In case of rejection, an error will be returned.
Parameters:

- `to`: sting - (required) The address the transaction is directed to.
- `value`: sting - (optional) Integer of the value sent with this transaction.
- `data`: sting - (optional) The compiled code of a contract OR the hash of the invoked method signature and encoded
  parameters.
- `gas`: sting - (optional, default: 21000) Integer of the gas provided for the transaction execution. It will return
  unused gas.
- `gasPrice`: sting - (required) Integer of the gasPrice used for each paid gas.
- `maxPriorityFeePerGas`: sting - (optional) - Maximum fee per gas the sender is willing to pay to miners in wei. Used
  in 1559 transactions.
- `maxFeePerGas`: sting - (optional) - The maximum total fee per gas the sender is willing to pay (includes the network
  / base fee and miner / priority fee) in wei. Used in 1559 transactions.

```ts
const transactionParameters = {
  "to": "0xca8a66887dfbef870a2d96de536986516a37fa12",
  "value": "0xad78ebc5ac6200000",
  "gasPrice": "0x2678011db",
  "gas": "0x5208",
  "nonce": '0x00',
}
const result = await evmConnector.send({
  chainId: 1,
  method: 'signTransaction',
  params: transactionParameters
})
if (result.success) {
  console.log('Signed transaction: ' + result.data) // 0x0234....
} else {
  console.log('Response error: ' + result.error.message)
}
```

### Send Transaction

Sends a signed transaction.

```ts
const signedTransaction = '0xf86b8....'
const result = await evmConnector.send({
  chainId: 1,
  method: 'sendTransaction',
  params: signedTransaction
})

if (result.success) {
  console.log('Transaction hash: ' + result.data) // 0x87dfbe....
} else {
  console.log('Response error: ' + result.error.message)
}
```

### Get Block Number

Retrieves the current block number from the blockchain.

```ts
const result = await evmConnector.send({
  chainId: 1,
  method: 'getBlockNumber'
})
console.log('Block number: ' + result.data) // 5238123
```

### Get Nonce

Retrieves the transaction nonce for the current account.

```ts
const result = await evmConnector.send({
  chainId: 1,
  method: 'getNonce'
})
console.log('Nonce: ' + result.data) // 0x00
```

### Get Gas Price

Retrieves the current gas price from the blockchain.

```ts
const result = await evmConnector.send({
  chainId: 1,
  method: 'getGasPrice'
})
// TODO: add response example
console.log('Gas price: ' + result.data) // 0x00
```

## License

@noonewallet/widget-communicator is available under the MIT license. See
the [LICENSE](https://github.com/noonewallet/widget-communicator/blob/main/LICENSE) file for more info.
