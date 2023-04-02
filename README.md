Recipe Sharing App

Models:
Recipes
Users
Ingredients

Relationships: 
Recipes has_many Ingredients
Recipes belong_to Users
Users has_many recipes
Users has_many Ingredients through Recipes
Ingredients has_many Recipes
Ingredients has_many Users through Recipes

Joins
Recipe_Ingredients- recipe_id, ingredient_id
User_ingredients

Routes
session - login, logout
User - create, show, update, delete
Recipe  - create, index, show, update, delete
Ingredients - create, index, show, update, delete

Controllers
session
user
ingredients
recipe

User
Recipe
Ingredients
