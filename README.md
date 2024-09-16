# BUBBLR

Welcome to Bubblr! At Bubblr there are a ton of drinks to browse or save for later. If you're feeling creative you can create your own drinks and share them with the community. You can always come back an edit your saved collections, and check out what your friends are liking!

**Features**
- Home page, here a random drink is displayed where users can click it and add it to favorites, users can also search for drinks by name here
- Account page, where users can search for others, view friends, concoctions, favorite originals, and reviews
- Community page, where users can see drinks by alphabet, and leave comments and reviews on them
- Bar Hop page, where users can create/delete events at different bars
- Creation Station page, where users can create their own drinks using a variety of mixers and even name them

# Developers

**Recent Node Version**
The most recently tested node version was node 22

**TECH STACK**
  - Api:
    - CocktailDB [Docs](https://www.thecocktaildb.com/api.php)
    - Local Business Data [Link](https://rapidapi.com/letscrape-6bRBa3QguO5/api/local-business-data)
  - Frontend: React [Docs](https://react.dev/)
  - Backend: Express [Docs](https://expressjs.com/en/4x/api.html)
  - Build: Webpack [Config Docs](https://webpack.js.org/configuration/)
  - Database: Mysql
  - Deployment: AWS [Make An Account Here](https://aws.amazon.com/free/?gclid=Cj0KCQjw8--2BhCHARIsAF_w1gxqy2n-xVXx_xy7dM4sYBu7QCjL7IfB_oLIrqY4XcT9CJ9VAIbVKbIaAlnlEALw_wcB&trk=7541ebd3-552d-4f98-9357-b542436aa66c&sc_channel=ps&ef_id=Cj0KCQjw8--2BhCHARIsAF_w1gxqy2n-xVXx_xy7dM4sYBu7QCjL7IfB_oLIrqY4XcT9CJ9VAIbVKbIaAlnlEALw_wcB:G:s&s_kwcid=AL!4422!3!651751058796!e!!g!!aws%20console!19852662149!145019243977&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all)
  - Auth: Passport [Docs](https://www.passportjs.org/tutorials/google/)
  - Styling: React Bootstrap [Docs](https://react-bootstrap.netlify.app/)

**STARTUP**
* Create the dot env file, copied from **.env.example**
* Install dependencies: ```npm install```
* Start a mySQL server: ```mysql.server start (mac)```  ```sudo service mysql start (WSL)```
* Connect to mySQL shell: ```mysql -u root (mac, WSL)```
* Start the server and build: ```npm start```
* Log in with Google
* If using seed file, fill it out: while connected to mySQL shell ```use bubblr;``` then ```SELECT * FROM users;```, use your googleId and displayName to fill out seed file in server/db/seed.js.
* Seed db with users: comment out your personal account then run ```npm run seed``` (this should then be uncommented for deployed instance)

**KNOWN BUGS**
- Bar Hop: Currently when making a new event, the bar list does not show correctly until a page refresh
- After refactoring, the filter in the nav bar is broken
- Searching for users is currently broken after refactor
- Users currently cannot save comments and ratings for drinks

# Contributors
Thanks to all the following people for contributing to this project:
- [@PeytonOwen](https://github.com/peytono)
- [@CamronCaldwell](https://github.com/ccaldwell11)
- [@KylanPatton](https://github.com/kycodee)
- [@DakotaDay](https://github.com/mothroom)
- [@AdonijahJohnson](https://github.com/AJ-Gamer)