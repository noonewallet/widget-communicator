[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://github.com/noonewallet/widget-communicator/LICENSE)
[![Platform](https://img.shields.io/badge/platform-web-blue.svg?style=flat)]()
![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fnoonewallet%2Fwidget-communicator%2Fmain%2Fpackage.json&query=version&label=version)

# @noonewallet/widget-communicator

## Description
**@noonewallet/widget-communicator** is a TypeScript library that enables embedding an iframe with the Noone Wallet crypto wallet onto a web page, and subsequently configuring communication between the iframe and the parent page.

## Installation
Installation is done using either of the following commands:

```bash
yarn add git+https://github.com/noonewallet/widget-communicator.git
```
or

```bash
npm install git+https://github.com/noonewallet/widget-communicator.git
```

## Generating Iframe on Page
To generate an iframe on the page, execute the following code:

Add a `<div>` element to the page with a unique ID, for example, `wallet-iframe`.
```html
<body>
...
  <div id="wallet-iframe"></div>
</body>
```
```typescript
import { IframeManager } from '@noonewallet/widget-communicator'

const iframe = new IframeManager('wallet-iframe', 'http://localhost:8080/')
const loaded = await iframe.render() // true

```
- **wallet-iframe** - the id attribute of the iframe, must be unique.
- **http://localhost:8080/** - the iframe URL.
- **iframe.render()** - awaits until the iframe is rendered on the page.

After these steps, the iframe will appear on the page, and you can proceed to configure communication with it.

## Connecting Communicator
TBD

### Communicator API
TBD

## License

@noonewallet/widget-communicator is available under the MIT license. See the [LICENSE](https://github.com/noonewallet/widget-communicator/blob/main/LICENSE) file for more info.
