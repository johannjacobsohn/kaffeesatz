Kaffeesatz(media)
=================

This is just another toy project, comprising a server, an admin interface
and a mobile app. The entire project is (mostly) written in Javascript.

Architecture
------------

The project consists of three components: a server which serves two apps and
keeps the data; a coffee list, which users can use to book beverages and a
admin interface which can be used to organize users and beverages.

All the components communicate through an (partly password protected)
REST-API and additionally through websockets.


     ---------------------------------------------------------------------------
     |                                Server                                   |
     ---------------------------------------------------------------------------
          ↧  serves apps      ⇅ exposes partly       ↓ sends updates
             as static          password-protected     through
             files              REST-Interface         websockets
     ------------------------------------ --------------------------------------
     |            User App              | |    Admin Interface                 |
     ------------------------------------ --------------------------------------




Server
------

The server (in /server) serves both the admin interface and the user app
(both are static). It is written in [NodeJS](http://nodejs.org/) using the
[express framework](http://expressjs.com/), offers a REST interface and
accepts websocket connections (thanks to [socket.io](http://socket.io/)).

Data is save to and retrieved from a mongoDB (via [mongojs](https://github.com/gett/mongojs)).

At the moment the server does not enforce any type of security or data
validation - in fact it does get corrupted easily. Its covered by
[mocha](http://visionmedia.github.com/mocha/) tests (see /server/tests) and
hosted at [appfog](https://www.appfog.com/).

I has its own readme file at [/server/readme.md](server/readme.md).


Admin Interface
--------------

The administration is written with [backbone.js](http://backbonejs.org/) and
[Twitter Bootstrap](http://twitter.github.com/bootstrap/).

I has its own readme file at [/admin/readme.md](admin/readme.md).


User App
--------

The user app is an [enyo-app](http://www.enyojs.com/) using the new and
exciting [enyo mvc pattern](https://github.com/enyojs/enyo/wiki/Enyo-MVC-Intro).
It's directly derived from the [Bootplate-MVC-App](https://github.com/enyojs/bootplate-mvc).

I has its own readme file at [/app/readme.md](app/readme.md).


Goals
-----

This project aims to:

- have a good test coverage
- have some server/client code sharing
- nice interface
- good documentation
- to feature on screen guidance for both app and admin section
- be installable on ios & firefox


Design Mockups
-------------

    wide:                            narrow:
    _____________________________    ________________
    | Lets make some Coffee! (?)|    |    Lmsc!  (?)|
    |---------------------------|    |--------------|
    |                           |    |              |
    | coffee         tee        |    | coffee       |
    | ------         ------     |    | ------       |
    | Paul: II       Paul:      |    | Paul: II     |
    | Mary: I        Mary:      |    | Mary: I      |
    | Pete: III      Pete:      |    | Pete: III    |
    |                           |    |              |
    | milk           cappuccino |    | milk         |
    | ----           ---------- |    | ----         |
    | Paul: II       Paul:      |    | Paul: II     |
    | Mary: I        Mary:      |    | Mary: I      |
    | Pete: III      Pete:      |    | Pete: III    |
    |___________________________|    |     ...      |
                                     |______________|


Setup
-----

1. Install prerequisites
    - [MongoDB](http://docs.mongodb.org/manual/installation/)
    - [NodeJS](http://nodejs.org/download/)


2. Checkout & Setup

        $ git clone https://github.com/Satzmedia/kaffeesatz
        $ cd kaffeesatz
        $ make setup

3. (optional) Run tests

        $ make test

4. Start database and run server

        $ mongod &
        $ node app

5. Open App
    - App at [http://localhost:1234/app/debug.html](http://localhost:1234/app/debug.html)
    - Admin interface at [http://localhost:1234/app/](http://localhost:1234/app/)


Credits:
---

App Icon: http://www.clker.com/clipart-hot-coffee.html
