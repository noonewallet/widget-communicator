import {IEvmSendData, IResponse, ISendData} from './types'
import {IframeManager} from './init-widget'

const WIDGET_TARGET = 'noone-widget'
const ERRORS = {
  iframeNotFound: 'iframe not found',
  iframeNotLoaded: 'iframe not loaded',
}

export {IframeManager}

class Connector {
  protected iframe: IframeManager

  constructor(iframe: IframeManager) {
    if (!iframe) {
      this.throwError(ERRORS.iframeNotFound)
    }
    this.iframe = iframe
  }

  protected _send(data: ISendData): Promise<IResponse> {
    return new Promise((resolve, reject) => {
      this.checkBeforeSend()

      const updatedData = {
        target: WIDGET_TARGET,
        ...data,
      }
      const channel = new MessageChannel()
      channel.port1.onmessage = (event) => {
        if (!event.isTrusted) {
          reject(new Error('Message is not trusted'))
        }

        const {data} = event
        resolve(data)
      }
      // @ts-ignore
      this.iframe.iframeElement.contentWindow.postMessage(
        updatedData,
        this.iframe.iframeSrc,
        [channel.port2],
      )
    })
  }

  private throwError(message: string) {
    throw new Error('Communicator: ' + message)
  }

  private checkBeforeSend() {
    if (!this.iframe) {
      this.throwError(ERRORS.iframeNotFound)
      return
    }

    if (!this.iframe.loaded) {
      this.throwError(ERRORS.iframeNotLoaded)
      return
    }
  }
}

export class EvmConnector extends Connector {
  constructor(iframe: IframeManager) {
    super(iframe)
  }

  send(data: IEvmSendData): Promise<IResponse> {
    const updatedData = {
      currency: 'EVM',
      method: data.method,
      chainId: data.chainId,
      params: data.params,
    }
    console.log('EvmConnector', updatedData)
    return super._send(updatedData)
  }
}
