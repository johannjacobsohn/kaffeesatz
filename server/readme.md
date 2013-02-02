Expected behaviour:

- GET /
  complete list of all users with all consumed beverages
- GET /beverages
  list of all available beverages
- POST /{user}/{beverage}
  add beverage to users list
- POST /{user}
  add user to user list
- PUT /{user}/clear
  clear users beverage list
- DELETE /{user}/
  remove user from user list

