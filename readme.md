# Creating a new NodeJS application
1. Make sure you are in the current folder (i.e the current working directory)
2. `npm initi` to create a new NodeJs application or `npm init -y to skip all the questions`
---
## Why use express.js?
Express allows our webpages to be dynamic, not that there is not javascript on the website but the variables can be input on the backend to it update dynamically on the frontend. Rather than going into the html page and changing each instances of say a news article.
3. Add in `express` with `npm install express`
4. Add in `handlebars`, with `npm install hbs` which will help with Statlic files
    1. After installing `hbs`, require it in with `const hbs = require('hbs')` 
    2. Setup the view engine, `app.set('view engine', 'hbs')`
    3. Setup a "views" folder for hbs to find
---
### STATIC FILES
Static files are files that will be used in all 