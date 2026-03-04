import { Link } from 'react-router-dom' //Imports the 'Link' component from React Router 
                                        // similar to <a> tags, but navigates without reloading the page.

function RecipeCard({ recipe }) { //Defines the component 'RecipeCard' and expects a recipe prop
                                // the entire recipe object will be passed in from wherever this card component is used, for example:
                                // <RecipeCard recipe={someRecipe} />

  return (  //Everything here gets displayed on the screen.
    <div>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} width="200" /> {/*'src={recipe.strMealThumb}' = the image URL that comes from the API */}
      <h3>{recipe.strMeal}</h3>    {/* Displays the 'recipe' name as a heading.  'strMeal' is what the API calls the 'recipe name'.*/}
      <Link to={`/recipe/${recipe.idMeal}`}>View Recipe</Link> {/* - 'Link' = means that navigates without page reload
                                                                - 'to={`/recipe/${recipe.idMeal}`}' = builds a DYNAMIC URL using the "recipe's ID", for example /recipe/52772
                                                                    - 'View Recipe' = the clickable button the user sees*/}
    </div>
  )
}

export default RecipeCard  //Exports the hook so other files can import and use it.



/*
These come directly from 'TheMealDB' API:
- strMeal = recipe name
- strMealThumb = recipe image URL
- idMeal = recipe ID
you have to use their exact property names to access the data correctly
*/