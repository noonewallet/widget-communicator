import {IErrorResponse, IResponse, ISendData} from '../types'
import {IframeManager} from '../init-widget'
import {ERRORS, WIDGET_TARGET} from '../config'

export class Connector {
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
          reject(this.throwError(ERRORS.NOT_TRUSTED_MESSAGE))
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
