*** TODAYLIST README ***
v2.0 - Firebase Integration
In this version:
- Integrated Firebase


For next versions:
- Most importantly - refactor code. It is still verbose and repetitive (esp. Firebase).
- Continue to refine UI/UX
- Add useful info to projects when closed - how many tasks, how many high priority tasks.
- Add button to collapse/ shrink the header/sidebar (narrow it to the side - add keyframes). Text and Div size using classnames - everything else should be responsive enough.
- Add ability to change category.
- Add some variation in colors (project boxes?).
- Make responsive for different screen sizes - including min and max widths.
- Colour coordinate to distinguish between projects/tasks
    - E.g. 'new project' lighter and matching project background color.
- Intro bubbles to show how to use.
- 'Are you sure' pop-ups for deleting things.
- Use icons instead of edit and delete task.
- Delete-all button.
- Align PP with modal styles.
- New Date for sample task - make it in future (or else reads 'Due: 0 seconds ago' and is a bit alarming.)
- FB Performance


- secure data

Deploy to Firebase Hosting
You can deploy now or later. To deploy now, open a terminal window, then navigate to or create a root directory for your web app.

Sign in to Google

$ firebase login
Initiate your project
Run this command from your app’s root directory:


$ firebase init
When you’re ready, deploy your web app
Put your static files (e.g., HTML, CSS, JS) in your app’s deploy directory (the default is “public”). Then, run this command from your app’s root directory:


$ firebase deploy
After deploying, view your app at the-today-list.web.app

Need help? Check out the Hosting docs


Go to 'Next Steps' - here
https://firebase.google.com/docs/web/setup

and then start with Authentication


Have done up to step 2 of Step 4 (Hosting) - in order to view locally