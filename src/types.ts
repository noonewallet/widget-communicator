export type AnyParams = {
  [key: string]: string
}

export interface ISendData {
  method: string
  currency?: string
  params?: AnyParams
}

export interface IEvmSendData {
  chainId: number
  method: string
  params?: AnyParams
}

export interface IWalletSendData {
  method: string
  params?: AnyParams
}

export interface IErrorResponse {
  name: string
  message: string
  code: number
}

export interface IResponse {
  success: boolean
  error?: IErrorResponse
  data?: string
}
