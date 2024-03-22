export type Method = 'getAddress' | 'sendTransaction'

export interface ISendData {
  currency: string
  method: Method
  params?: {
    [key: string]: string
  }
}

export interface IEvmSendData {
  chainId: number
  method: Method
  params?: {
    [key: string]: string
  }
}

export interface IResponse {
  success: boolean
  error?: string
  result?: {
    [key: string]: string
  }
}

export interface HTMLIFrameCustom extends HTMLIFrameElement {
  contentWindow: Window
}
