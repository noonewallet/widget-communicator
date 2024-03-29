# Errors
Below is a list of errors that the widget may return.

| code |         name          |                  message                   |
|------|-----------------------|-------------------------------------------|
| 100  |      NO_WINDOW        |           No window object                |
| 101  |  CURRENCY_TURNED_OFF  |   The currency is turned off in the wallet|
| 102  |      INVALID_ORIGIN   |          Invalid window origin            |
| 103  |      INVALID_TARGET   |           Invalid target origin           |
| 104  |     INVALID_CURRENCY  |              Invalid currency              |
| 105  |      INVALID_PORT     |                Invalid port                |
| 106  |      SESSION_EXPIRED  |               Session expired              |
| 107  |   WALLET_NOT_CREATED  |             Wallet not created            |
| 108  |       USER_REJECT     |          User rejected the request        |
| 109  |    SMTH_WENT_WRONG    |             Something went wrong          |
| 200  |      INVALID_METHOD   |     Invalid method: ${method}             |
| 201  |    CHAIN_ID_REQUIRED  |  chainId is required for EVM currency     |
| 202  |     CHAIN_ID_INVALID  |   Unsupported chainId: ${id}               |
| 203  |    SIGN_MSG_REQUIRED  |     Message is required for signMsg method|
| 204  |     SIGN_MSG_FAILED   |             Failed to sign message         |
| 205  |     SIGN_TX_FAILED    |           Failed to sign transaction       |
| 206  |     SEND_TX_FAILED    |            Failed to send transaction      |
