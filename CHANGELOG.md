# NOTES

Conducteur :	     BT00249316

Véhicule :			    V0000017

Waypoint Codes : 00002268, 00002267

# TODO

> - Should test when no connectivity at all
> - Save all the datas of the way point even the commentary at the end taping on "next waypoint"
> - Write a new commentary on a waypoint and save it in the clues/dates
> - Create the pool of datas that can be resend with a better connectivity and in the background...

# DONE

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