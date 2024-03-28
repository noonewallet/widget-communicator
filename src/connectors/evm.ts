import {IframeManager} from '../init-widget'
import {Connector} from './index'
import {IEvmSendData, IResponse} from '../types'

export class EvmConnector extends Connector {
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
