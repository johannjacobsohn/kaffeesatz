


component overview
------------------


     view (render, unrender)      controller (load, update, delete)                     model (validate)

      Coffee.Application
          | view
      Coffee.RootView
          | component
      Coffee.BeverageList     -> controller: "Coffee.BeverageCollectionController"   -> BeverageCollection
          | component
      Coffee.Beverage         -> controller: "Coffee.BeverageController"             -> BeverageModel
          | component
      Coffee.UserList         -> controller: "Coffee.UserCollectionController"       -> UserCollection
          | component
      Coffee.User             -> controller: "Coffee.UserController"                 -> UserModel

