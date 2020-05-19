# NikiSoft-Web-UI

## Versions

### 1.2.0.0
- Refactored forms module in ui lib to simplify it
- Month calendar weekend days are highlighted, different font size for day cells in diff screen sizes, Fixed click of disabled header items
- DI refactored - created configurator classes to configure DI and provide service and model for pages/forms etc
- Put back login button in case user is not in login page and he/she is not logged int
- Added all material design icons to ns-icon.enum.ts
- Dashboard component improved based on Page component
- Improved Clock component
- NsServiceProvider class has generic parameter
- Form Control Autocomplete simplified with better use of observable operators
- UI - buildDefaultRoute function added to handle default route
- Form control label ID made optional, added label(optional too)
- NsPageErrors component uses expansion panel on multiple errors, for single one uses one liner text

### 1.1.0.0
- Responsive width of right panel in month calendar and left panel with navigation items
- Improved not found and no permission components
- Allows to make icon focusable and set clear icon in forms to non-focusable
- Autocomplete and multiselect ignore Tab as search character
- Added 'Go to home page' link to not-found and no-permisssion page
- Removed global handler of Enter and Esc keys in edit and edit steps page
- Version number added to user log-in infomation menu and login button is hidden if in login screen
- Renamed text method to translate in localization-languages.service
- NsMediaQueryObserver added to handle media query breakpoints changes
- WeekDay names changes based on width of the screen
- Create 2 new model and service base classes to expose service provider api
- Fixed setting correct date and time locale and use in month calendar
- Fixed locale for date and date/time picker form control
- Refactored NsPageComponent and created service and model with a function to provide the service and model
- NsUserLogInInformationModel refactored use of rxjs
- Added app version to left navigation panel
- Renamed register* methods to provide* for providing service and it also requires the model too
- Refactored base page display with loading during navigation

### 1.0.0.0
- Custom classes for:
    - buttons
    - calendars
    - card
    - clock
    - dashboard
    - dialog
    - divider
    - expansion panel
    - form
    - icon
    - loading
    - localization
    - various pages: default, base, list, edit, edit with steps, errors, login, no-permission, not-found
    - search
    - table
    - user
