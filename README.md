A Demo Social Authentication Application using Okta's APIs.

# Technologies used

## Front-end

1.  jQuery
2.  Jade
3.  Foundation

## Back-end

1.  Okta's APIs
2.  NodeJS
3.  IndexedDb

# Setup

## Configuring a Facebook app for Facebook Login

1.  Visit <http://developers.facebook.com>.
2.  From the "My Apps" menu, select "Add a New App".
3.  You will be asked to "Select a platform", choose "Website".
4.  You will be prompted to "Chose an existing app or type the name
    of your new app". Type in "Okta Social Authentication Test".
5.  Click the "Create New Facebook App ID" button.
6.  Another prompt will open, set the category of the app to
    "Utilities", then click the blue "Create App ID" button.
7.  Click the "Skip Quickstart" button.
8.  Click on the "Settings" section.

**Optional:**

The steps above will make a Facebook app in "developer mode" which
means that only you can see it. Follow the steps below if you want
other people to be able to use your Facebook app.

1.  Visit <http://developers.facebook.com>.
2.  From the "My Apps" menu, select the app that you created above.
3.  Click on "Settings" which is located on the left side of the page.
4.  Enter in your email address in the field labeled "Contact Email".
5.  Click the dark blue "Save Changes" button.
6.  Click on "Status & Review" which is located on the left side of
    the page.
7.  Toggle the big button to "YES", this is the button labeled "Do
    you want to make this app and all its live features available
    to the general public?"

## Configuring Social Authentication in your Okta org

1.  Log in to your Okta org in an other browser or window.
2.  Click the blue "Admin" button.
3.  From the "Security" menu, select "Identity Providers".
4.  Click the "Add Identity Provider" button and select "Add
    Facebook" from the drop down.
5.  In the "Name" field, enter "Log in with Facebook".
6.  Using the drop-down menu, set the value of the "Transform username" field to "email".
7.  Now you will need to copy two values from your Facebook
    Developer App Settings page:
    -   Copy the value of the Facebook "App ID" to the "Client ID"
        field on the Okta Identity Provider configuration page.
    -   Copy the value of the Facebook "App Secret" to the "Client Secret"
        field on the Okta Identity Provider configuration page. You
        will need to click the "Show" button on the Facebook page to
        get the Client Secret.
8.  Click the green "Add Identity Provider" button.
9.  You will be returned to the Okta "Identity Providers" page.
10. Copy the "Login URL" from the Okta "Identity Providers" page
    into your clipboard.
11. On the Facebook Developer App Settings page, click the lage "Add
    Platform" button and select "Website" from the pop-up.
12. Paste the Okta Identity Provider Login URL from your clipboard
    into the field labeled "URL of your site".
    The Okta URL you paste into the "URL for your site" field 
    should look something like this: 
    "`https://example.okta.com/sso/authorize/0ab1c2de3fGHIjKLM4n5`"
13. Click the blue "Save Changes" button.
14. Log in to your Okta org
15. Click on the blue "Admin" button
16. From the "Security" menu, select "Identity Providers"
17. Click the "Add Identity Provider" button and select "Facebook"

## Configuring CORS in your Okta org

You need to do this because the URLs in the CORS page are used to
validate the `redirect_url` GET parameter used by this application.

1.  From the "Security" menu on the Okta page, select "API".
2.  Click on the "CORS" tab.
3.  Click on the grey "Edit" button.
4.  Make sure that the "Enable CORS for the following base URLs"
    option is selected.
5.  Enter the URL for this application into the text area.
    -   If you are running this application locally, use "<http://localhost:3000/>"
    -   If you are running this application on Heroku, use
        "<http://:name.herokuapp.com/>" where `:name` is the
        name of your application on Heroku.
6.  Click the green "Save" button.

## How to quickly set up "Tommy's Tires" on Heroku

Click the button below to quickly deploy this application running
in Heroku, then follow the prompts to configure the application.

<a href="https://heroku.com/deploy?template=https%3A%2F%2Fgithub.com%2FRobingaal%2Fokta-social-auth-demo-app">
  <img src="https://www.herokucdn.com/deploy/button.png" alt="Deploy">
</a>

## How to set up "Tommy's Tires" locally

1.  From this directory, switch to the `social-auth-demo` sub-directory: `cd social-auth-demo`
2.  Install the packages specified in the `packages.json` file using
    the `npm install` command.
3.  Start the application with the with `npm start` command.
4.  Open the "Tommy's Tires" sample application at <http://localhost:3000>
5.  Follow the instructions on the Admin page. After configuring the
    "Base URL" and "API Token", click on the green "Submit" button
6.  Click the blue "Home" button
7.  In your terminal window, restart the server by typing `Ctrl+C`
          then type `npm start` again.
8.  Switch back your browser <http://localhost:3000>
9.  You should now see a purple "Log in with Facebook" button, click
    that button.
10. You will be sent to Facebook, which will prompt you to approve
    the "Okta Social Authentication Test" application
11. Click the blue "Okay" button
12. If you see a page with your user name and Okta User ID, then you
    are done!

## Developer notes

### Key files

-   `social-auth-demo/routes/index.js` and `social-auth-demo/views/index.jade`
    
    These are the files with the code and template responsible for
    rendering the `/` route. The code uses the Okta API to fetch a list
    of available Social Authentication providers, which it passes to
    the template for rendering into buttons. The code is also
    responsible for rendering the `/social_auth_processing` route.
-   `social-auth-demo/routes/admin.js` and
    `social-auth-demo/views/admin.jade`
    
    The files responsible for rendering the `/admin` route.

### Endpoints

-   `/admin`
    
    The Admin panel.
-   `/social_auth_processing`
    
    The route that handles completed Social Authentication flows.
