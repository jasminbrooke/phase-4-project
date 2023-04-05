puts "seeding..."
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# =================== users
# ========================================================

# User.create([
#     {name: 'Joe', username: 'Joe1', password_digest: BCrypt::Password.create('123')},
#     {name:'Richard', username: 'RichieRich', password_digest: BCrypt::Password.create('123')},
#     {name: 'Nixie', username: 'Nixinator', password_digest: BCrypt::Password.create('pupper')}
# ])
# Ingredient.create([{name:'Pasta'}, {name:'Sauce'}, {name: 'Garlic}'}])

# # ==================== recipes
# # ========================================================

# Recipe.create([
#   {
#     name: "Spaghetti Bolognese",
#     description: "A classic Italian pasta dish featuring a rich meaty sauce",
#     instructions: "1. Heat olive oil in a large skillet over medium heat. Add chopped onion, garlic and carrot and cook for about 5 minutes, until softened.
# 2. Add ground beef to the skillet and cook until browned, stirring frequently to break up any lumps.
# 3. Add canned tomatoes, tomato paste, and beef broth to the skillet. Stir well to combine and bring the sauce to a simmer.
# 4. Reduce the heat to low and let the sauce simmer for about 45 minutes, stirring occasionally.
# 5. While the sauce is cooking, bring a large pot of salted water to a boil. Add spaghetti and cook for 8-10 minutes, until al dente.
# 6. Drain the pasta and serve topped with the Bolognese sauce and freshly grated Parmesan cheese.",
#     user_id: User.first.id
#   },
#   {
#     name: "Roast Chicken",
#     description: "A classic Sunday dinner featuring juicy roasted chicken with crispy skin",
#     instructions: "1. Preheat the oven to 425 degrees F (220 degrees C).
# 2. Rinse the chicken inside and out with cold water and pat dry with paper towels.
# 3. Season the chicken generously with salt, pepper and any other herbs or spices you like.
# 4. Place the chicken in a roasting pan and roast for about 1 1/2 hours, until the juices run clear when the thigh is pierced with a fork.
# 5. Let the chicken rest for 10 minutes before carving and serving.",
#     user_id: User.first.id
#   },
#   {
#     name: "Chocolate Cake",
#     description: "A rich and decadent chocolate cake that's perfect for any occasion",
#     instructions: "1. Preheat the oven to 350 degrees F (175 degrees C).
# 2. Grease and flour a 9-inch round cake pan.
# 3. In a large mixing bowl, cream together butter and sugar until light and fluffy.
# 4. Beat in eggs, one at a time.
# 5. In a separate bowl, whisk together flour, cocoa powder, baking powder, and baking soda.
# 6. Gradually add the dry ingredients to the wet mixture, alternating with milk and mixing well after each addition.
# 7. Pour the batter into the prepared cake pan and bake for about 30 minutes, until a toothpick inserted in the center comes out clean.
# 8. Allow the cake to cool before frosting with your favorite frosting recipe.",
# user_id: User.second.id
#   },
#   {
#     name: "Tomato and Basil Pasta",
#     description: "A simple yet flavorful pasta dish with fresh tomatoes, fragrant basil, and grated Parmesan cheese.",
#     instructions: "1. Cook 8 oz. of your favorite pasta according to package instructions.
#   2. While the pasta is cooking, heat 2 tbsp of olive oil in a skillet over medium heat.
#   3. Add 2 cloves of minced garlic and cook for 1-2 minutes, stirring occasionally, until fragrant.
#   4. Add 2 cups of diced fresh tomatoes and 1/4 cup of chopped fresh basil to the skillet. Cook for 5-7 minutes, stirring occasionally, until the tomatoes have broken down and released their juices.
#   5. Season the tomato mixture with salt and black pepper to taste.
#   6. Drain the pasta and add it to the skillet with the tomato mixture. Toss everything together until the pasta is coated in the sauce.
#   7. Serve the pasta hot, topped with grated Parmesan cheese if desired.",
#   user_id: User.second.id
#   },
#   {
#     name:'Pupcup',
#     description: "A delicous cup for a pup!",
#     instructions: "Dispense some whipped cream into a cup.",
#     user_id: User.third.id
#   }
# ])

# UserRecipe.create(user_id: User.third.id, recipe_id: Recipe.last.id)

puts "seeded"