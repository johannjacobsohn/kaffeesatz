Kaffeesatz(media)
=================

This is just another toy project, comprising a server, an admin interface and an 
user app.


                Server
    
    User App            Admin Interface




Server
------

The server (in /server) serves both the admin interface and the user app 
(both are static). Its written in [NodeJS](http://nodejs.org/) using 
the [express framework](http://expressjs.com/) and offers a REST-Interface and 
accepts websocket connections (thanks to [socket.io](http://socket.io/)).

Data is save to and retrieved from a mongoDB (via 
[mongojs](https://github.com/gett/mongojs)).

At the moment the server does not enforce any type of security or data 
validation - in fact it does get corrupted easily. Its covered by 
[mocha](http://visionmedia.github.com/mocha/) tests (see /server/tests) and hosted at [appfog](https://www.appfog.com/).

I has its own readme file at [/server/readme.md](/tree/master/server/readme.md).


Admin Interface
---------------

The administration is written with [backbone.js](http://backbonejs.org/) and 
[Twitter Bootstrap](http://twitter.github.com/bootstrap/). 

I has its own readme file at [/admin/readme.md](/tree/master/admin/readme.md).


User App
-------- 

The user app is an [enyo-app](http://www.enyojs.com/) using the very new and 
exciting [mvc-plugin](https://github.com/enyojs/mvc). It's directly derived 
from the [Bootplate-MVC-App](https://github.com/enyojs/bootplate-mvc).

I has its own readme file at [/app/readme.md](/tree/master/app/readme.md).


Goals
-----

This project aims to:

- have a good test coverage
- have some server/client code sharing
- nice interface
- good documentation
- to feature on screen guidance for both app and admin section
- be installable on ios & firefox


Design Mockups:
---

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

MongoDB, NodeJS 


    git clone https://github.com/Satzmedia/kaffeesatz
    cd kaffeesatz
    git submodule update --init --recursive

TODO
---------

- server
 - fix Unit tests
 - write (and test) socket API
 - write readme.md
 - clean up
- admin interface
 - add keyboard navigation
 - finisch On-Screen help
 - edit beverages
 - write readme.md
 - add unit tests
 - clean up
- app
 - improve small screen display
 - add firefox/ios install button / autoinstall
 - write readme.md
 - add unit tests
 - clean up
- misc
 - write product page

Credits:
---

App Icon: http://www.clker.com/clipart-hot-coffee.html
