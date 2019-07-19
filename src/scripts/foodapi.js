fetch("http://localhost:8088/foods")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            console.log(food);
            foodFactory(food);
        });
});

const foodFactory = (object) => {
    const foodList = document.querySelector('.foodList');
    const newFoodHTML = `<section class="food__item">
                            <h1 class="food__name">${object.name}</h1>
                            <h3 class="food__cateogry">Category: ${object.category}</h3>
                            <h3 class="food__ethnicity">Ethnicity: ${object.ethnicity}</h3>
                        </section>`;
    
    foodList.innerHTML += newFoodHTML;
};