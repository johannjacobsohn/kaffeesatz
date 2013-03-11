Kaffeesatz: Admin Interface
===========================

The administrative interface allows users and beverages to be viewed, added, 
deleted and changed.

It uses [Backbone.JS](http://backbonejs.org) as its (primary) JS-Framework 
as well as [Bootstrap](http://twitter.github.com/bootstrap/) for the user 
interface. Its designed as a installable web app using [HTML5 app cache](http://www.whatwg.org/specs/web-apps/current-work/multipage/offline.html#offline)
and an [Open Web App manifest](https://developer.mozilla.org/de/docs/Apps/Manifest).

The interface receives its data and sends its change request using the 
servers REST API via AJAX calls. Additionally it listens for data changes 
via websockets.
