Kaffeesatz: Server
==================

The server keeps the data in a mongodb database, delivers the (web) apps and 
provides a REST interface as well as websockets. The REST interface is meant 
to be the main source for interfacing with the server, while the websockets 
are merely meant to keep the interface up-to-date.

App locations
-------------------

* __/app/__ - location of the coffee list (see the readme.md at /app)
* __/admin/__ - location of the administrative interface (see the readme.md at /admin)

REST interface
----------------------

The HTTP interface is used to retrieve data of the current state, as well as 
changing it. Except for adding a beverage to a user, all writing access is 
restricted by (very weak) password protection using [Basic access authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).

- __GET /users__ - complete list of all users with all consumed beverages
- __GET /users/:user__ - get a specific user object
- __POST /users__ - add user to user list (protected)
- __PUT /users/:user__ - change a user, using transmitted user object (protected)
- __POST /users/:user/:beverage__ - add beverage to users list
- __DELETE /users/:user__ - remove user from user list (protected)
- __GET /beverages__ - list of all available beverages
- __GET /beverages/:beverage__ - get a specific beverage
- __PUT /beverages/:beverage__ - change an existing beverage  (protected)
- __POST /beverages__ - create a beverage (protected)
- __DELETE /beverages__/:beverage__ - remove a beverage (protected)


Websocket events
----------------

The server emits several events to connected websocket clients, and listens 
none.

- __userAdded__ - emitted when a user has been added, sends the new user object
- __userChanged__ - emitted when a user changes, sends the changed user object
- __userDeleted__ - emitted when a user has been deleted, sends the removed user object
- __beverageAdded__ - emitted when a beverage has been added, sends the new beverage object
- __beverageChanged__ - emitted when a beverage has been changed, sends the changed beverage object
- __beverageDeleted__ - emitted when a beverage has been deleted, sends the removed beverage object

Modules
-------

- __server.js__ - sets up the server, control access to protected functionality and does routing. Provides the REST Api and emits websocket events. Requires *users.js* and *beverage.js*
- __db.js__ - connects to database and sets up collections
- __users.js__ - Sets und retrieves user information. Requires *db.js*.
- __beverages.js__ - Sets and retrieves beverage information. Requires *db.js*.
