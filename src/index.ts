import {IErrorResponse, IEvmSendData, IResponse, ISendData} from './types'
import {IframeManager} from './init-widget'
import {ERRORS} from './errors'

const WIDGET_TARGET = 'noone-widget'

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

export {
  IframeManager,
  EvmConnector,
  IEvmSendData,
  IResponse,
  ISendData,
  IErrorResponse,
}
