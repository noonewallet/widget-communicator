import {
  IErrorResponse,
  IEvmSendData,
  IResponse,
  ISendData,
  IWalletSendData,
} from './types'
import {IframeManager} from './init-widget'
import {ERRORS, WIDGET_TARGET} from './config'

export {ERRORS, LISTENING_METHODS} from './config'

class Connector {
  protected iframe: IframeManager

  constructor(iframe: IframeManager) {
    if (!iframe) {
      this.throwError(ERRORS.IFRAME_NOT_FOUND)
    }
    this.iframe = iframe
  }

  protected _send(data: ISendData): Promise<IResponse> {
    return new Promise((resolve, reject) => {
      this.checkBeforeSend()

      const channel = new MessageChannel()
      channel.port1.onmessage = (event) => {
        if (!event.isTrusted) {
          reject(new Error('Message is not trusted'))
        }

        const data: IResponse = event.data
        resolve(data)
      }
      // @ts-ignore
      this.iframe.iframeElement.contentWindow.postMessage(
        {
          target: WIDGET_TARGET,
          ...data,
        },
        this.iframe.iframeSrc,
        [channel.port2],
      )
    })
  }

  private throwError(error: IErrorResponse) {
    // throw new Error('Communicator: ' + error.message)
    throw error
  }

  private checkBeforeSend() {
    if (!this.iframe) {
      this.throwError(ERRORS.IFRAME_NOT_LOADED)
      return
    }

    if (!this.iframe.loaded) {
      this.throwError(ERRORS.IFRAME_NOT_LOADED)
      return
    }
  }
}

class EvmConnector extends Connector {
  constructor(iframe: IframeManager) {
    super(iframe)
  }

  public send(data: IEvmSendData): Promise<IResponse> {
    const updatedData = {
      currency: 'EVM',
      method: data.method,
      chainId: data.chainId,
      params: data.params,
    }
    return super._send(updatedData)
  }
}

class WalletConnector extends Connector {
  private listeningMethods: string[]

  constructor(iframe: IframeManager) {
    super(iframe)
    this.listeningMethods = []
  }

  public send(data: IWalletSendData): Promise<IResponse> {
    const updatedData = {
      method: data.method,
      params: data.params,
    }
    return super._send(updatedData)
  }

  public listen(method: string, callback: (data: IResponse) => void) {
    if (this.listeningMethods.includes(method)) {
      console.log('already listening', method)
      return
    }
    this.listeningMethods.push(method)
    window.addEventListener('message', (event) => {
      const {data} = event
      if (data.target !== WIDGET_TARGET) return
      if (data.method !== method) return
      callback(data)
    })
  }
}

export {
  IframeManager,
  EvmConnector,
  WalletConnector,
  IEvmSendData,
  IResponse,
  ISendData,
  IErrorResponse,
}
