
/* function makeJuise (size) {

    function addIngredients (first, second, third){
        let p = document.createElement('p');
        p.textContent = `The client wants a ${size} coctail, containing ${first}, ${second}, ${third}`;
        document.body.appendChild(p);
    }
    addIngredients('burbon', 'red vermut', 'bitter')
}
    makeJuise('large') */
    
    
    function makeJuice(size) {
        let ingredients = [];
    
        function addIngredients(first, second, third) {
            ingredients.push(first, second, third); 
        }
    
        function displayJuice() {
            let p = document.createElement('p');
            p.textContent = `The client wants a ${size} cocktail, containing ${ingredients.join(', ')}`; 
            document.body.appendChild(p);
        }
    
        addIngredients('bourbon', 'red vermouth', 'bitter');
        addIngredients('cherry', 'triple sec', 'grenadine');
 
        displayJuice();
    }
  
    makeJuice('large');