`barcodereader` (component)
===========================

Scan for a barcode, the verificator take the barcode and returns a promise with a returned value in onSuccess or an error in onError if the barcode is wrong
hide the camera for some display errors

Props
-----

### `hide` (required)

type: `bool`


### `input`

type: `bool`
defaultValue: `true`


### `onError` (required)

type: `func`


### `onSuccess` (required)

type: `func`


### `verificator` (required)

type: `func`

