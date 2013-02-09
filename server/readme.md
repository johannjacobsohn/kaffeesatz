Expected behaviour:

- GET /users
  complete list of all users with all consumed beverages
- GET /beverages
  list of all available beverages
- POST /users/{user}/{beverage}
  add beverage to users list
- POST /users/
  add user to user list
- PUT /users/{user}/clear
  clear users beverage list
- DELETE /users/{user}/
  remove user from user list
