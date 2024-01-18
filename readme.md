# Creating a new NodeJS application
1. Make sure you are in the current folder (i.e the current working directory)
2. `npm initi` to create a new NodeJs application or `npm init -y to skip all the questions`
---
## Why use express.js?

Express allows our webpages to be dynamic, not that there is not javascript on the website but the variables can be input on the backend to it update dynamically on the frontend. Rather than going into the html page and changing each instances of say a news article.

1. Add in `express` with `npm install express`
2. Add in `handlebars`, with `npm install hbs` which will help with Statlic files
    1. After installing `hbs`, require it in with `const hbs = require('hbs')` 
    2. Setup the view engine, `app.set('view engine', 'hbs')`
    3. Setup a "views" folder for hbs to find

---
### STATIC FILES

Static files are files that don't change when your application is running or serving clients.
1. Create a directory named `public`
2. Import an image or style code into the public file 
3. Set up everything as you would with handlebars, with the exception of adding this code `app.use(express.static("public"))`
4. Refer to the image as you normally would on your index.hbs file `<img src="image_name"/>`

---
### Installing wax-on

When using duplicate code such as bootstrap styling, headers and footers, it makes sense to use template inheritance.
Template inheritance allows one to build a base 'skeleton' template that contains all the common elements of your site and defines blocks that child templates can override.
1. Download the `wax-on` package using `npm install wax-on`
2. Require it in with `const wax = require("wax-on")`
3. Set up the path for it with `wax.on(hbs.handlebars)` and `wax.setLayoutPath("./views/layouts")`
4. Create a layouts folder in the views folder, followed by a base.hbs files in that folder.
5. Import all the html and styling you would require on the base file with the expection of specific blocks you want to customise with{{#block "content"}}
6. Redo the index.hbs files with {{#extends "base"}} {{#block "content"}} Your content {{/block}} {{/extends}}

---
### Handlebar helpers

Handlebar helpers replicate the effects of conditional statements and loops in express. By using the `this` keyword we are able to combination of cycling through an array.
