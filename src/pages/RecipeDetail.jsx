// RecipeDetail page component

import { useParams } from 'react-router-dom'  // It imports 'useParams' hook, which reads the 'DYNAMIC' part of the URL. For example '/category/Seafood' gives us 'Seafood'.
import useFetch from '../hooks/useFetch' // //Imports the custom fetch hook
import Spinner from '../components/Spinner'  // Imports component that provides feedback to the user...Loading
import ErrorMessage from '../components/ErrorMessage' // Imports component that provides feedback to the user...Error
import { useFavorites } from '../context/FavoritesContext' //  Imports our favorites hook. It is this page that uses FavoritesContext directly because this is where the user can add/remove favorites.

function RecipeDetail() {  //Defines the RecipeDetail page component — no props needed.
  const { recipeId } = useParams() // a call is made to the 'useParams()' hook, and it grabs the recipe ID from the URL .
                                    // we defined it  in App.jsx as : <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
   
  const { addFavorite, removeFavorite, isFavorite } = useFavorites() // Grabs three things from FavoritesContext. We we don't need 'favorites' here because we're not displaying the list, just adding/removing from it.

  const { data, loading, error } = useFetch(                                // Fetches the full recipe details using the recipe ID:
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`      //lookup.php?i=52772 — the API endpoint that returns one specific recipe
                                                                            // The ID comes dynamically from useParams
  )

   // 3 conditionals all mapping to the variables above (data, loading, error)
  if (loading) return <Spinner />     //IF we're still waiting for data ( iows, loading ), it means 'loading' is true, THEN run the 'Spinner()' from 'Spinner.jsx' and return <Spinner />
  if (error) return <ErrorMessage message={error} />  // IF (not ELSE IF) something went wrong, THEN run the 'ErrorMessage({ message })' from 'ErrorMessage.jsx' and display the error message. 


  const recipe = data.meals[0]    // The API always returns meals as an array even when looking up one recipe, so 'data.meals' looks like this:
                                  // [ { idMeal: "52772", strMeal: "Arrabiata", ... } ]
                                  // '[0]' = use '0' to grab the first (and only) item out of the array and store it in recipe.

  const handleFavoriteClick = () => {  // Defines function that runs when the user clicks the 'favorites' button.
    if (isFavorite(recipe.idMeal)) {  //conditional that checks if this recipe is already a favorite
      removeFavorite(recipe.idMeal) // IF this recipe is already a favorite THEN 'removeFavorite' removes it from 'favorites'
    } else {                        // ELSE IF this recipe is NOT already a favorite
      addFavorite(recipe)           // THEN it  adds it to favorites
    }
  }

   // ELSE load page with the following details: 
  return (
    <div className="recipe-detail">
      <h1>{recipe.strMeal}</h1>  {/* Displays the recipe name as a heading. */}
      <img src={recipe.strMealThumb} alt={recipe.strMeal} width="300" />  {/*Displays the recipe image — same as RecipeCard but slightly bigger */}
      <button className="btn-favorite" onClick={handleFavoriteClick}> {/* whne user clicks on toggle button, it calls function 'handleFavoriteClick'  */}
        {isFavorite(recipe.idMeal) ? 'Remove from Favorites' : 'Add to Favorites'} {/*...and depending on what the function returns, this ternary operator that dynamically changes the button text:
                                                                                    IF already a favorite, button displays "Remove from Favorites"
                                                                                    ELSE IF Not a favorite, button displays "Add to Favorites" */}
      </button>
      <h2>Instructions</h2>
      <p>{recipe.strInstructions}</p>  {/* Displays the cooking instructions from the API: 'strInstructions' — the API property that holds the full recipe instructions */}
    </div>
  )
}

export default RecipeDetail