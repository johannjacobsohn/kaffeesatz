Kaffeesatz: Coffee list (aka user app)
======================================

The coffee list app displays a clickable list of users and their beverages, 
its written in [enyo](http://www.enyojs.com/) using the new 
[enyo mvc pattern](https://github.com/enyojs/enyo/wiki/Enyo-MVC-Intro).

Component overview
------------------

     view (render, unrender)   controller (load, update, delete)      model (validate)

     Coffee.Application
         ↓ view
     Coffee.RootView
         ↓ component
     Coffee.BeverageList       Coffee.BeverageCollectionController    Coffee.BeverageCollection
         ↓ component
     Coffee.Beverage           Coffee.BeverageController"             Coffee.BeverageModel
         ↓ component
     Coffee.UserList           Coffee.UserCollectionController"       Coffee.UserCollection
         ↓ component
     Coffee.User               Coffee.UserController"                 Coffee.UserModel

