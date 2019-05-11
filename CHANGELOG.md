# 0.12.0

- DONE: Add the whole navigator
- DONE: Driver read real webservice
- DONE: Car read real webservice
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