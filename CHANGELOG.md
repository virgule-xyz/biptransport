## 0.29.0

- FIX: array of real codes
- Sign code with netmize password

## 0.28.0

Finaliser l'enregistrement des données

```react
const webservice = ({ url, params, postit = false }) => {
  const options = {
    method: postit ? 'POST' : 'GET',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(params),
    url,
  };

  console.warn('webservice:OPTIONS', options);

  const sender = () => (postit ? axios(options) : axios.get(url, { params }));
  return new Promise((resolve, reject) => {
    sender()
      .then(({ data, status }) => {
        console.warn('webservice:DATAS', data);
        if (status === 200 && data.result === 'OK') {
          resolve(data);
        } else {
          reject((data.error && data.error) || data);
        }
      })
      .catch(err => {
        console.warn('webservice:ERROR', err);
        reject(err);
      });
  });
};

```



- Create installr account
- Changer the code to put GSM Number, see `web services/putgsmnumber.js`
- This is a good web service to use POST and GET

## 0.27.0

- ADD: Merge BIP with other project

## 0.26.0

- FIX: number of line displayed in address
- ADD: Merge BIP with other project

## 0.25.0

- Add member variable not present, usefull for the `put_passage` webservice
- Add the `sendWaypointToServer`function
- Add start and end time of waypoint's visit
- fix the `putWaypoint`function

## 0.24.0

- test if pool or datas are too old. Save appContext also. Propose to load the previous car and driver if less than 4 hours...
- `"noyellow": true`is finaly the best solution to hide yellow box and get them in some situations
- `clear, load, save, needDriverScan, read`are the new functions to manage persistent state

## 0.23.0

- Add `ScreenWaypointScanPickups` and `ScreenWaypointScanPickupsPhotos` to manage package pickupswith the `setPickupCount`state in the app context
- Add the `PRIMARY`color
- `ScreenWaypointResume`display the right numbers
- Picture in `onPressValidatePicture` of `ScreenWaypointScanPickupsPhotos`is not saved at all in the context

## 0.22.0

- Add `ScreenWaypointScanShipments`to get scan of packages
- Test `ScreenWaypointScanArrival`in E2E
- Add the managment of packages with `shippingCodes`, `shippingCodeIndex` and `needAnotherShipmentCode` plus `nextShipmentCode`.

## 0.21.0

- DONE: Add all the code to have persistent storage that can be flush to the server
- DONE: The `putwaypoint.js` web service
- FIX: import the Async Local Storage plugin

## 0.20.0

- DONE: Code the scanner of barcode of waypoints with multiple barcodes
- DONE: Test go to next waypoint since the first
- DONE: Filter other waypionts by not done. Added the `done`flag in the waypoint collection
- DONE: Code passage to "ARRIVE!"
- DONE: Logo should bring to list of managers
- DONE: Re-Read the WS to see what's changed
- DONE: Fill conditions with what's read on WS : added `ConditionShape`and `ClueShape`
- DONE: Rescue button should just call a WS, no more
- DONE: Coder l'envoie d'un SMS à tous les responsables et gérer les cas d'erreurs
- DONE: Coder l'appel téléphonique simple sur les boutons manager
- FIX: Manager page has no back button, better in a modal ? It needs to know witch screen it comes from
- FIX: E2E that was not running anymore

## 0.19.0

- DONE: Code buttons to take another picture or confirm the impossibility to go away

- DONE: Code the "Take a picture" and save the picture for later use in a send pool

- FIX: `resizeMode`in the CImage component

- DONE: Start of the `clues` array in the app context to conatin all what's to be sent to the server

- ## 0.18.0


- FIX: Add a prop to disable or enable input box for scanner

- FIX: Great modifications on `CWaypointTemplate`because of flex layout

- DONE: Code passage to "AÏE"

- DONE: Create the `CCamera`component to take pictures...

- DONE: Create the `CInfo` component

- DONE: Create the `ScreenWaypointScanArrival`.

- ## 0.17.0


- ADD: The `ScreenWaypointBadCondition` and `ScreenWaypointResume`
- ADD: function `ColorsByNumber` tha t display colors from green to red
- ADD: `TextInput`that wrap a NativeBase Textarea
- ADD: `CWaypointCounters`is now colorized
- FIX: `Space`do some trouble when in between `flex:1`Views

## 0.16.0

- DONE: Add the `ScreenWaypointBadCondition` to the navigator
- ADD: `CWaypointTemplate` is the template to use to build screens with little header
- ADD: `loadFakeContext`is a way to load fake datas for stories
- ADD: `ScreenWaypointBadCondition`
- FIX: Restore storybook because of AppContext
- FIX: Now `story===true`remove yellowBox
- FIX: Modales are now fullsize
- FIX: `Managers`changed to use `AppContext`
- FIX: `ScreenWaypointDashboard`use the new template

## 0.15.0

- FIX: Change the way barcodes are read so the value is correct
- FIX: the way list of waypoints display datas
- FIX: Major crash on scanning barcodes
- FIX: Background color of headers
- FIX: Blur and SVG package removed because make crash the app

## 0.14.0

- DONE: Put in rows the address in the waypoint list and change row colors
- FIX: All `useEffect` now should follow 

```react
  useEffect(() => {
    const useEffectAsync = async v => {
      setIsStateVisible(v);
    };

    useEffectAsync(show);
  }, [show]);

```

## 0.13.0

- FIX: `webservice`is now a default because of import errors
- FIX: `WS.URL`in `webservice` calls
- FIX: when calling `axios` the result is spread in `data` and `status`
- FIX: change case of file Modal.js to modal.js with `git mv Modal.js modal.js`
- FIX: getCommands return undefined
- BREAK: `driver`screen is based on new `AppContext`
- BREAK: `car`screen is based on new `AppContext`
- BREAK: `wpdashboard`is based on the new context `AppContext` 
- BREAK: `App` is now containing `AppContext`
- ADD: test on webservice
- ADD: older context are keep in archive
- ADD: `AppContext` that contain all previous contexts...

## 0.12.1

- DONE: Select the first waypoint of the list
- DONE: All scene1 detox tests
- CHANGE: `env` variable can be `e2e` or `test`to disable yellow box
- ADD: `WaypointContextProvider` to App shell
- ADD: `testID` to various components
- ADD: `isTest` function from `@webservices`
- FIX: `wpdashboard`is wrap in `DriverContext.Consumer` to access driver props

## 0.12.0

- DONE: Add the whole navigator
- DONE: Driver read fake webservice
- DONE: Car read fake webservice
- ADD: `NAVS`in `@screens` to have constantes for routes
- ADD: Context provider (**DO NOT FORGET TO ADD THEM**) for `DriverContextProvider`
- FIX: Navigation in `ScreenCar`and `ScreenDriver`
- FIX: Remove native-modalbox as useless plugin
- FIX: Change state of driver for a slip and a driver one
- FIX: Remove the code of setGSMNumber
- FIX: Driver screen to reflect new DriverState
- FIX: Read datas from web service in test mode

## 0.11.0

- DONE: Link the new modal of pictures to the waypoint dashboard
- ADD: A new look for disabled `CButton`
- ADD: The photo button in `CWaypointButtons`now contain the number of pictures and is disabled if no pictures
- ADD: `waypointPictureCollection`to the waypoint state
- ADD: newly created modal to the waypoint dashboard
- FIX: `name`and `address`property for `ScreenWaypointGalery`

## 0.10.0

- DONE: Picture gallery of the waypoint
- ADD: `ScreenWaypointGalery` to display...
- ADD: The `CGreyBox` component to wrap other content
- FIX: Wrap `CWaypointAddress` in a `View` to fix inside Text display