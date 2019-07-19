// fetch("http://localhost:8088/food")
//     .then(response => response.json())
//     .then(myParsedFoods => {
//         myParsedFoods.forEach(food => {
//             console.log(food) // Should have a `barcode` property

//             // Now fetch the food from the Food API
//             fetch(`https://world.openfoodfacts.org/api/v0/product/${what goes here ?}.json`)
//                 .then(response => response.json())
//                 .then(productInfo => {
//                     if (productInfo.product.ingredients_text) {
//                       food.ingredients = productInfo.product.ingredients_text
//                     } else {
//                       food.ingredients = "no ingredients listed"
//                     }

//                     // Produce HTML representation
//                     const foodAsHTML = foodFactory(food)

//                     // Add representaiton to DOM
//                     addFoodToDom(foodAsHTML)
//                 })
//         })
//     })

fetch("http://localhost:8088/foods")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {

            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    console.log(productInfo);
                    foodFactory(productInfo);
                });
        
        });
});

const foodFactory = (object) => {
    const foodList = document.querySelector('.foodList');
    const ingredients = () => {
        if (object.product.ingredients_text) {
            return object.product.ingredients_text;
        }  else {
            return 'No ingredients listed'
        }
        
    }
    
    const newFoodHTML = `<section class="food__item">
                            <h1 class="food__name">${object.product.product_name}</h1>
                            <h3 class="food__country">Country of Origin: ${object.product.countries}</h3>
                            <h3 class="food__ingredients__heading">Ingredients:</h3>
                                <p>${ingredients()}</p>
                            <h3 class="food__calories">Calories per Serving: ${object.product.nutriments.energy_value}</h3>
                            <h3 class="food__fat">Fat per Serving: ${object.product.nutriments.fat_serving}</h3>
                            <h3 class="food__sugar">Sugar per Serving: ${object.product.nutriments.sugars}</h3>
                        </section>`;
    
    foodList.innerHTML += newFoodHTML;
};