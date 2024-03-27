const DEFAULT_IFRAME_WIDTH = '375'
const DEFAULT_IFRAME_HEIGHT = '600'
const DEFAULT_IFRAME_ID = 'wallet-iframe'

const ERRORS = {
  documentNotFound: 'document not found',
  containerElementNotFound: (containerId: string) =>
    `container element with id ${containerId} not found`,
}

export class IframeManager {
  public readonly containerId: string
  public readonly iframeSrc: string
  public iframeElement: HTMLIFrameElement | null
  protected containerElement: HTMLElement | null

  constructor(containerId: string, iframeSrc: string) {
    this.containerId = containerId
    this.iframeSrc = iframeSrc
    this.containerElement = null
    this.iframeElement = null
    this._loaded = false
  }

  private _loaded: boolean

  get loaded() {
    return this._loaded
  }

  public render(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this._loaded) resolve(true)
      if (!document) {
        this.throwError(ERRORS.documentNotFound)
        return
      }

      this.containerElement = document.getElementById(this.containerId)
      if (!this.containerElement) {
        this.throwError(ERRORS.containerElementNotFound(this.containerId))
        return
      }

      this.iframeElement = document.createElement('iframe')
      this.iframeElement.id = DEFAULT_IFRAME_ID
      this.iframeElement.width = DEFAULT_IFRAME_WIDTH
      this.iframeElement.height = DEFAULT_IFRAME_HEIGHT
      this.iframeElement.frameBorder = '0'
      this.iframeElement.src = this.iframeSrc
      this.iframeElement.addEventListener(
        'load',
        () => {
          this._loaded = true
          resolve(true)
        },
        false,
      )
      this.containerElement.appendChild(this.iframeElement)
    })
  }

  private throwError(message: string) {
    throw new Error('IframeManager: ' + message)
  }
}
