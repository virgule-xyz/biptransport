# 0.14.0

> **Should test when no connectivity at all**
>
> Rescue button should just call a WS, no more
>
> Logo should bring to list of managers

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



# 0.13.0

- FIX: `webservice`is now a default because of import errors
- FIX: `WS.URL`in `webservice` calls
- FIX: when calling `axios` the result is spread in `data` and `status`
- ADD: test on webservice
- BREAK: `driver`screen is based on new `AppContext`
- BREAK: `car`screen is based on new `AppContext`
- BREAK: `wpdashboard`is based on the new context `AppContext` 
- BREAK: `App` is now containing `AppContext`
- ADD: older context are keep in archive
- ADD: `AppContext` that contain all previous contexts...
- FIX: change case of file Modal.js to modal.js with `git mv Modal.js modal.js`
- FIX: getCommands return undefined

# 0.12.1

- DONE: Select the first waypoint of the list
- DONE: All scene1 detox tests
- CHANGE: `env` variable can be `e2e` or `test`to disable yellow box
- ADD: `WaypointContextProvider` to App shell
- ADD: `testID` to various components
- ADD: `isTest` function from `@webservices`
- FIX: `wpdashboard`is wrap in `DriverContext.Consumer` to access driver props
- 

# 0.12.0

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

# 0.11.0

- DONE: Link the new modal of pictures to the waypoint dashboard
- ADD: A new look for disabled `CButton`
- ADD: The photo button in `CWaypointButtons`now contain the number of pictures and is disabled if no pictures
- ADD: `waypointPictureCollection`to the waypoint state
- ADD: newly created modal to the waypoint dashboard
- FIX: `name`and `address`property for `ScreenWaypointGalery`

# 0.10.0

- DONE: Picture gallery of the waypoint
- ADD: `ScreenWaypointGalery` to display...
- ADD: The `CGreyBox` component to wrap other content
- FIX: Wrap `CWaypointAddress` in a `View` to fix inside Text display