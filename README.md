# Twitter Posts App

This responsive [web app](https://joel-rojas.github.io/twitter-posts-app/) uses a Twitter REST API endpoint from a custom server app [created by me](https://github.com/joel-rojas/twitter-posts-rest-api) to show and handle custom UI functionalities of 10 twitter posts from 3 specific twitter users.

## Motivation

The main reason of developing this app is to show and use some good practices that an Angular 7 app could have. Also to keep up practicing and to understand basic/complex functionalities by some of the integrated libraries like Rxjs and Ngrx; so I hope you found it useful and interesting. :)

Last but not least, the idea to build this app has been proposed by a software company's coding challenge interview I had some months ago but some requirements of it have been modified by me.

## Angular Good Practices

This app has some of the 'good' practices that a developer could consider to apply:

* State management is set up in the app to isolate app's data operations from UI components.

* Parent and child (Container & presentational) UI components are created and split into their own namespaces. Although Angular docs suggest to structure your app's folders with the [Folders-by-feature principle](https://angular.io/guide/styleguide#overall-structural-guidelines), it's up to the developer to apply it.

* Use of HTTPInterceptor service to handle succeeded/failed call of the API, to show/hide a custom loading-mask UI component and to show an error message if the app couldn't load API data properly.

* Use of Rxjs operators to specifically set the latest data to the app's state by combining data from API and localStorage. If any data has been changed manually on the app and the browser is reloaded, localStorage data will persist and format the data shown on the app.

About State management, there are some specific 'good' points to consider:

* Uses Ngrx Entity API to create all-in-one twitter posts state data main files (like action and reducer) for a single 'entity'. Plus, other files have been created, by enabling Ngrx Schematics commands to Angular CLI, as twitter effects and manually like Ngrx 'selectors'.

* Implements inmutable operations on its state data.

* Performs Time Travel feature either when user increments/decrements twitter posts or when it clears the app state to return state data to its default values. Both processes are done by Edit-Layout children components described on the Feature section.

## General Info

Twitter posts are shown in a column-form view (by splitting them into 3 columns) when the app is rendered in devices with screen-width larger than 1024 pixels. E.g: Big tablets, laptops and desktop computers.

While app is shown in devices with screen-width less than the pixels mentioned above, twitter posts are shown in a single column.

The use of this app is pretty straightforward so any user who will interact with it, won't find any issues. However, in a further section, I'm going to explain the app's features in more detail.

**_This app has been created using Angular 7 CLI and Node.js v8.15.0._**

## Features

* API call of the app is made to a custom server, as I mentioned in the description part, which is a REST API server working in a AWS EC2 instance. If the API call fails then a custom error message will be shown at the middle of the screen. **Note:** It is possible to get less posts data per twitter user (max-posts-quantity: 10). It could happen since any user could just remove previous twitter posts. However, that API feature was a bug and now is fixed on the app, so it will reflect the max twitter posts per user delivered by the API endpoint.

* While API data has finished to load and render, you'll see a button called **Edit Layout** placed on the right-side of the header component for large screen width-devices and as a menu-item button when navbar menu button is clicked for small screen-width ones. If it is pressed, it will show different options as UI menu items to interact with the layout of the app.

* The layout items are described as the following points:

  1. **_Sort Columns_**: This component works like a checkbox UI component. If it is activated, every twitter posts column is highlighted with dashed borders and enabled to drag n' drop between them. If it is deactivated, twitter posts columns are displayed as normal without the ability to use the drag n' drop functionality. If they are dragged and dropped then their data change between them and they are reflected on **Increase/Decrease Tweets** components and the localStorage. **Note:** This item can only be used for large screen-width devices, it is hidden for small screen-width ones.

    ![sortColumns](https://github.com/joel-rojas/twitter-posts-app/blob/master/docs/images/sortColumns.png)

  2. **_Increase/Decrease Tweets_**: This one is split into three UI components which represent the three twitter posts columns. For every component, it has two buttons and number input. Each button has `+` and `-` as labels. Each clicked button will handle how many twitter posts are going to be displayed either in its columns and in the input placed between these two buttons. The maximum shown posts are ten per each column and minimum is one per each. The input is disabled by default which an user cannot change its value manually. By decreasing/increasing twitter posts quantity, these will show as a list of descending-date-created order posts for a single column.

    ![increaseDecreaseTwitterPosts](https://github.com/joel-rojas/twitter-posts-app/blob/master/docs/images/incDecTweets.png)

  3. **_Change Theme_**:  This component works like a set of radio buttons, only one of them can be selected. For this case, three UI themes 'radio-buttons' have been created and if one of them is selected then all UI styles are changed in the app. The UI styles that are changed are font-colors, background colors and hovered-buttons colors.

    ![changeTheme](https://github.com/joel-rojas/twitter-posts-app/blob/master/docs/images/changeTheme.png)

  4. **_Clear Changes_**: This last one is a simple button that resets default data state shown at the beginning of the app. Specifically, data (twitter-posts data shown as column views) are sorted and the quantity of each one of them gets back to the same default value. These changes are noted visually on edit-layout components and in the column views. Also the UI theme is changed by its default value. These values are referred as well in the browser's localStorage object.

    ![clearChanges](https://github.com/joel-rojas/twitter-posts-app/blob/master/docs/images/clearChanges.png)

* Browser's LocalStorage is created for the first time when the app is loading and it's persisted once created. It saves UI local data which is set with the key name `twitterPostsApp` and its default value as a stringified JSON structure:

```javascript
  {
    "defaultStatus": true,
    "sortColumns": false,
    "twitterColumns": [
      {"user": "MakeSchool", value: 10},
      {"user": "newsycombinator", value: 10},
      {"user": "ycombinator", value: 10}
    ],
    "twitterTheme": "theme1"
  }
```

* Each property data from app's localStorage (alias `twitterPostsApp`) gets saved and updated independently for each edit-layout UI component used within its dropdown-menu UI parent component.

For to-do features and as a personal opinion, the app could implement the following:

* Create an abstraction layer which splits and comunicates UI components and state data in a single Angular service.
* Implement missing localStorage properties in a custom Ngrx state data in order to improve data operations/manipulation on them throughout the app. For instance:

```javascript
import {
  twitterReducerFn,
  uiReducerFn
} from 'state/index';
  //On global state
  {
    ui: uiReducerFn
    twitter: twitterReducerFn
  }
```

* Refactor app to implement folder-by-feature principle of Angular folder structure.
* Implement custom Typescript namespaces to group and load integrated interfaces in a ordered manner.
* It is possible to build different Angular Modules but it could be optional.
* Split UI style themes into their own files and include them into the main style file.
* Implement unit testing either on UI components, services or state management files.

## Tech Stack

* Angular 7 (with CSS stylesheet format)
* Angular Material & CDK
* Ngrx
* Rxjs
* Bootstrap 4

## Setup and Usage

Before cloning the app, make sure you have installed [Node.js 8.x](https://nodejs.org/en/download/releases/) version and [Angular CLI](https://github.com/angular/angular-cli/blob/master/packages/angular/cli/README.md) npm package globally.

After that, you could start the development server by using Angular CLI command: `ng serve`

## License

MIT license - 2019 Emerson Joel Rojas Soliz
