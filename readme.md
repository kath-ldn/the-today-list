# The Today List - V3.1

## About

The Today List is a project/task management app. It allows the user to track their projects and tasks within those projects, prioritise these, and add/remove as needed.

The Today List allows the user to sign in and store their data using their Google account, via Firebase.

The today list is in a Beta phase! This means there may be bugs/issues. Please let me know if you find any.

### Live Site

The Today List can be found [here](https://the-today-list.web.app/).

### Demo

[To add screenshot]

### Built with

* HTML
* CSS
* Javascript
* Webpack
* Firebase

## Prerequisites & Installation

If you would like to run a local copy of The Today List, you will need:
* Webpack;
* A package manager such as Node;
* A Firebase account.

## Usage

To use The Today List, sign in with your Google account using the link provided.

The today list is not yet mobile responsive - that will come in the next release. Therefore please use a laptop/desktop for best experience.

## Contributing

Contributions are welcome and appreciated, for any significant changes - please open an issue first.

## Licence

Copyright (c) 2021 Kath Turner

## Contact
Kath Turner - Twitter @kath_ldn - kath.develops@gmail.com

## Roadmap

For the next version of the Today List I will:
* Make responsive to mobile/other devices.
* Refactor code - some areas where I'd like to make it more modular and less repetitive/verbose.
    * Continue to revisit control flow/how data moves through functions, and see where can simplify.
    * Check props for consistency - e.g. index means multiple things in different functions and can be confusing.
* Add useful info to projects when closed - how many tasks, how many 'high priority' tasks.
* Check all colors used for accessibility.
* Check all elements for accessibility.
* Improve the preview page - currently just a screenshot - make a DIV/interactive.
* Add 'are you sure' popups for deleting things.
* Add a 'clear all projects' button.
* See where else can use icons/symbols instead of text - e.g. could priority be a coloured dot instead of text?
* Think about interactivity - animations, transitions (subtle).
* Loaders for signing in and out.
* Add dark/light modes.
* Webpack performance recommendations.
* Check styles and try to 'break' -  e.g. when adding long titles/descriptions.

### Known Issues

* In './addRmvTasks.js, -208: makeTaskDivs / -225: makeNewTaskDiv - these functions are 95% the same. This was a workaround that fixed a bug whereby if a user deleted a project then tried to add a project to a project that followed the deleted project, the app would not identify the correct parent container. To refactor the 'add task' pathway to reduce duplication.

## Acknowledgements

* Google
* Firebase
* Git / GitHub
* CSS Tricks
* Webpack
* [Ayub Irawan via Iconfinder](https://www.iconfinder.com/Ayub_Irawan)
* [Umar Irshad via Iconfinder](https://www.iconfinder.com/Umar)