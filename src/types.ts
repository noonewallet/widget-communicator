export interface ISendData {
  currency: string
  method: string
  params?: {
    [key: string]: string
  }
}

export interface IEvmSendData {
  chainId: number
  method: string
  params?: {
    [key: string]: string
  }
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
