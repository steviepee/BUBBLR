# BUBBLR

Welcome to Bubblr! At Bubblr there are a ton of drinks to browse or save for later. If you're feeling creative you can create your own drinks and share them with the community. You can always come back an edit your saved collections, and check out what your friends are liking!

# Developers

**DOT ENV FILE**
Create a dot env file and with the following variables:
```
GOOGLE_CLIENT_ID=(your google client id)
GOOGLE_CLIENT_SECRET=(your google secret)
```

**STARTUP**
* Has been used successfully with Node versions 20-21
* Create the dot env file
* Install dependencies: ```npm install```
* Start a mySQL server: ```mysql.server start (mac)```  ```sudo service mysql start (WSL)```
* Connect to mySQL shell: ```mysql -u root (mac, WSL)```
* Build the webpack: ```npm run build```
* Start the server: ```npm run start```
* Log in through bubblr
* Fill out seed file: while connected to mySQL shell ```use bubblr;``` then ```SELECT * FROM users;```, use your googleId and displayName to fill out seed file in server/db/seed.js.
* Seed db with users: comment out your personal account then run ```npm run seed``` (this should then be uncommented for deployed instance)

**KNOWN BUGS**
* Navigation bar shows up on login page
* Logging in navigates you to the logout ejs view(literally just a logout button), with no navigation
* Community page is loading data from FakeData.json instead of dynamically

# Contributors
Thanks to all the following people for contributing to this project:
[@PeytonOwen](https://github.com/peytono)
[@CamronCaldwell](https://github.com/ccaldwell11)
[@KylanPatton](https://github.com/kycodee)