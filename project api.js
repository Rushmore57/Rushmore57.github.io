
const firebaseConfig = {
  apiKey: "AIzaSyDREgVOsEPGBGNtsBv3rLw57Dfvalj2d00",
  authDomain: "recipe-book-e3141.firebaseapp.com",
  databaseURL: "https://recipe-book-e3141-default-rtdb.firebaseio.com",
  projectId: "recipe-book-e3141",
  storageBucket: "recipe-book-e3141.appspot.com",
  messagingSenderId: "332398574208",
  appId: "1:332398574208:web:9c4590ff1e0532dcc58465",
  measurementId: "G-WX8EMW0PKH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const apiKey = '0619a20d94fb42efbeb693da6939ef1b'; 

const searchInput = document.getElementById('searcher');
const searchButton = document.getElementById('searchbtn');
const detailSection = document.getElementById('detailsection');

searchButton.addEventListener('click', searchRecipes);
window.onload = function() {
  searchRecipes();
}

function searchRecipes() {
  const query = searchInput.value;

  axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=20&addRecipeNutrition=true`)
    .then(response => {
      const recipes = response.data.results;

      detailSection.innerHTML = '';
      if (recipes.length === 0) {
        alert("oops,looks like we don't have that recipe. Make sure you typed it corectly.")
      }
      else{
        let container = document.createElement('div');
container.className = "container";
document.body.appendChild(container);
let recipeCounter = 0;
      recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.className= "listing";

        const recipeImg = document.createElement('img');
        recipeImg.src = recipe.image;
        recipeDiv.appendChild(recipeImg);
        recipeImg.className="searchimage"

        const recipeTitle = document.createElement('h1');
        recipeTitle.textContent = recipe.title;
        recipeDiv.appendChild(recipeTitle);

        const recipeLink = document.createElement('a');
        recipeLink.href = recipe.sourceUrl;
        recipeLink.textContent = 'View Recipe';
        recipeDiv.appendChild(recipeLink);
        recipeLink.className="recipelink";

        

        const addToFavButton = document.createElement('button');
        addToFavButton.innerHTML = '<i class="fa-solid fa-heart"></i>';
addToFavButton.className = "addtofavbutton";
addToFavButton.addEventListener('click', function () { 
  const recipeName = recipeTitle.textContent;
  const recipeImage =  recipeImg.src;
  const recipeSource = recipeLink.href;
  const now = new Date();
  const date = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
  const time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  const word = " at ";
  const BDnT = date + word + time; 
  const ref = firebase.database().ref("favorite recipes");
  // query the database for existing recipes with the same name
  ref.orderByChild("recipeName").equalTo(recipeName).once("value", function(snapshot) {
    if (snapshot.exists()) {
      console.log("Recipe already exists in the database.");
      window.alert("added successfully!.");
    } else {
      ref.push({
        recipeName: recipeName,
        recipeSource: recipeSource,
        recipeImage: recipeImage,
        dateAndTime: BDnT
      });
      console.log("Recipe added to favorites.");
      document.getElementById("favouritediv").insertAdjacentHTML(
        'beforeend',
        `
        <div class="favouritelist">
          <div class="everyelse">
            <img src="${recipeImage}" class="fav_img">
            <div class="detail">
              <h3 class="recipe_header"> ${recipeName} <i class="fa-solid fa-heart-circle-check"></i> </h3>
              <p class="recipe_date"><i class="fa-regular fa-calendar-days"></i> ${BDnT} </p>
            </div>
          </div>
        </div>
        `
      );
      var iconHeart = `<i class="fa-regular fa-heart"></i>`
      addToFavButton.innerHTML=iconHeart;
      addToFavButton.style.backgroundColor="pink";
    }
  });
  
});

        recipeDiv.appendChild(addToFavButton);

        const addToSavedButton = document.createElement('button');
        addToSavedButton.innerHTML = '<i class="fa-solid fa-bookmark"></i>`';
        addToSavedButton.id = "savebtn";
        addToSavedButton.className = "tosavebtn";
        addToSavedButton.addEventListener('click', () => {

          const recipeName = recipeTitle.textContent;
          const recipeImage =  recipeImg.src;
          const recipeSource = recipeLink.href;
          const now = new Date();
          const date = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
          const time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
          const word = " at ";
          const BDnT = date + word + time;
          const databaseRef = firebase.database().ref(); 
          const ref = databaseRef.child("saved recipes");
 
const dbRef = firebase.database().ref();

const savedRecipesSection = document.getElementById('saveddiv');

dbRef.child('saved recipes').on('value', function(snapshot) {
  // Clear the existing HTML
  savedRecipesSection.innerHTML = '';

 
  snapshot.forEach(function(childSnapshot) {
    const recipe = childSnapshot.val();
    const recipeHtml = `
      <div class="favouritelist">
        <div class="everyelse">
          <img src="${recipe.recipeImage}" class="fav_img">
          <div class="detail">
            <h4 class="saved_header"> ${recipe.recipeName} <i class="fa-regular fa-bookmark"></i></h4>
            <p class="saved_date"><i class="fa-regular fa-calendar-days"></i> ${recipe.dateAndTime} </p>
            <a class="eye_link" href="${recipe.recipeSource}"> <i class="fa-solid fa-utensils"></i> view recipe </a>
          </div>
        </div>
        <button type="button" class="favourite"><i class="fa-solid fa-heart"></i></button>
        <button type="button" class="tried"><i class="fa-solid fa-circle-check"></i></button>
        <button type="button" class="delete"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    `;
    savedRecipesSection.insertAdjacentHTML('beforeend', recipeHtml);
  });
});

          // query the database for existing recipes with the same name
          ref.orderByChild("recipeName").equalTo(recipeName).once("value", function(snapshot) {
            if (snapshot.exists()) {
              alert("Saved successfully!!");
            } else {
              ref.push({
                recipeName: recipeName,
                recipeSource: recipeSource,
                recipeImage: recipeImage,
                dateAndTime: BDnT
              });
              console.log("Recipe saved to favorites.");
              document.getElementById("saveddiv").insertAdjacentHTML(
                'beforeend',
                `
                <div class="favouritelist">
                  <div class="everyelse">
                    <img src="${recipeImage}" class="fav_img">
                    <div class="detail">
                      <h4 class="saved_header"> ${recipeName} <i class="fa-regular fa-bookmark"></i></h4>
                      <p class="saved_date"><i class="fa-regular fa-calendar-days"></i> ${BDnT} </p>
                      <a class="eye_link" href="${recipeSource}"> <i class="fa-solid fa-utensils"></i> view recipe </a>
                    </div>
                  </div>
                  <button type="button" class="favourite"><i class="fa-solid fa-heart"></i></button>
                  <button type="button" class="tried"><i class="fa-solid fa-circle-check"></i></button>
                  <button type="button" class="delete"><i class="fa-solid fa-trash-can"></i></button>

                </div>

                `
              );
              var iconSaved = `<i class="fa-solid fa-bookmark"></i>`
              addToSavedButton.innerHTML=iconSaved;
              addToSavedButton.style.backgroundColor="pink";
            }
            
          });
          // Code to add recipe to saved
        });
        const allRec = recipeDiv;
        recipeDiv.appendChild(addToSavedButton);

        container.appendChild(recipeDiv);
        detailSection.appendChild(container)
        recipeCounter++;
      
        if (recipeCounter === 4) {
          container = document.createElement('div');
          container.className = "container";
          document.body.appendChild(container);
          recipeCounter = 0;
        }
        
      });
  
};})
    .catch(error => {
      console.error(error);
    });
    
}
