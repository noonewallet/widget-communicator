import {IframeManager} from '../init-widget'
import {Connector} from './index'
import {IResponse, IWalletSendData} from '../types'
import {WIDGET_TARGET} from '../config'

export class WalletConnector extends Connector {
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
