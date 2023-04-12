puts "seeding..."

# =================== users
# ========================================================

User.create([
    {name: 'Joe', username: 'Joe1', password_digest: BCrypt::Password.create('123')},
    {name:'Richard', username: 'RichieRich', password_digest: BCrypt::Password.create('123')},
    {name: 'Nixie', username: 'Nixinator', password_digest: BCrypt::Password.create('123')}
])

ingredient_names = [
    "All-purpose flour",
    "Almonds",
    "Apples",
    "Asparagus",
    "Avocado",
    "Bacon",
    "Baking powder",
    "Baking soda",
    "Banana",
    "Basil",
    "Bay leaves",
    "Beans",
    "Beef",
    "Bell peppers",
    "Bread",
    "Brown rice",
    "Brown sugar",
    "Butter",
    "Cabbage",
    "Carrots",
    "Cauliflower",
    "Celery",
    "Cheese",
    "Chicken",
    "Chickpeas",
    "Chili powder",
    "Chocolate Chips",
    "Cinnamon",
    "Cocoa powder",
    "Coconut milk",
    "Coconut oil",
    "Coffee",
    "Corn",
    "Cornmeal",
    "Cottage cheese",
    "Cumin",
    "Eggplant",
    "Eggs",
    "Flax seeds",
    "Garlic",
    "Ginger",
    "Green beans",
    "Green onions",
    "Ground beef",
    "Ground turkey",
    "Honey",
    "Jalapenos",
    "Jelly",
    "Kale",
    "Lemons",
    "Lentils",
    "Lettuce",
    "Lime juice",
    "Margarine",
    "Milk",
    "Mushrooms",
    "Mustard",
    "Oats",
    "Olive oil",
    "Onions",
    "Oranges",
    "Paprika",
    "Parmesan cheese",
    "Parsley",
    "Pasta",
    "Peanut butter",
    "Peas",
    "Pecans",
    "Pepper",
    "Pineapple",
    "Pistachios",
    "Pork",
    "Potatoes",
    "Pumpkin",
    "Quinoa",
    "Raisins",
    "Red pepper flakes",
    "Red wine vinegar",
    "Rice",
    "Rosemary",
    "Sage",
    "Salmon",
    "Salt",
    "Sausage",
    "Scallions",
    "Sesame oil",
    "Sesame seeds",
    "Shrimp",
    "Soy sauce",
    "Spinach",
    "Squash",
    "Strawberries",
    "Sugar",
    "Sunflower seeds",
    "Sweet potatoes",
    "Tarragon",
    "Thyme",
    "Tomatoes",
    "Tuna",
    "Turmeric",
    "Vanilla extract",
    "Vegetable oil",
    "Walnuts",
    "Water chestnuts",
    "White wine vinegar",
    "Whole wheat flour",
    "Worcestershire sauce",
    "Yogurt",
    "Zucchini"
  ]
  
ingredient_names.each do |name|
    Ingredient.create(name: name)
  end

# # # ==================== recipes
# # # ========================================================

# Recipe.create([
#     {
#         name: "Scrambled Eggs",
#         description: "A classic breakfast dish that's quick and easy to make.",
#         ingredients: [
#             Ingredient.find_by(name: 'Eggs'),
#             Ingredient.find_by(name: 'Milk'),
#             Ingredient.find_by(name: 'Butter'),
#             Ingredient.find_by(name: 'Salt'),
#             Ingredient.find_by(name: 'Pepper')
#         ],
#         instructions: "Crack the eggs into a bowl and whisk together with milk, salt, and pepper. Melt butter in a non-stick skillet over medium heat. Add the egg mixture to the skillet and stir constantly until the eggs are cooked through and no longer runny. Serve hot and enjoy!",
#         user_id: User.third.id
#     },
#     {
#         name: "Banana Strawberry Smoothie",
#         description: "A delicious and healthy smoothie that's perfect for breakfast or as a mid-day snack.",
#         ingredients: [
#             Ingredient.find_by(name: "Strawberries"),
#             Ingredient.find_by(name: "Banana"),
#             Ingredient.find_by(name: "Milk"),
#             Ingredient.find_by(name: "Honey")
#         ],
#         instructions: "Combine the frozen strawberries, banana, milk, and honey in a blender. Blend until smooth and creamy. Pour into a glass and enjoy!",
#         user_id: User.third.id
#     },
#     {
#         name: "Chocolate Covered Strawberries",
#         description: "An elegant and easy dessert that's perfect for special occasions.",
#         ingredients: [
#             Ingredient.find_by(name: "Strawberries"),
#             Ingredient.find_by(name: "Chocolate Chips")
#         ],
#         instructions:"Melt the chocolate chips in a double boiler or in the microwave, stirring until smooth. Dip the strawberries into the chocolate, letting any excess drip off. Place the strawberries on a parchment-lined baking sheet and chill in the refrigerator until the chocolate is set. Enjoy!",
#         user_id: User.third.id
#     },
#     {
#         name: "Avocado Toast",
#         description: "A simple and delicious breakfast or snack that's packed with healthy fats.",
#         ingredients: [
#             Ingredient.find_by(name: "Bread"),
#             Ingredient.find_by(name: "Avocado"),
#             Ingredient.find_by(name: "Salt"),
#             Ingredient.find_by(name: "Pepper"),
#         ],
#         instructions: "Mash the avocado with a fork and spread it onto the slice of bread. Sprinkle with salt and pepper to taste. Optionally, add some toppings for extra flavor. Enjoy!",
#         user_id: User.third.id
#     },
#     {
#         name: "Peanut Butter and Jelly Sandwich",
#         description: "A classic sandwich that's perfect for a quick and easy meal or snack.",
#         ingredients: [
#             Ingredient.find_by(name: "Bread"),
#             Ingredient.find_by(name: "Peanut butter"),
#             Ingredient.find_by(name: "Jelly")
#         ],
#         instructions: "Spread peanut butter on one slice of bread and jelly on the other. Place the two slices together with the peanut butter and jelly sides facing each other. Cut the sandwich in half, if desired. Enjoy!",
#         user_id: User.third.id
#     }
# ])

puts "seeded"