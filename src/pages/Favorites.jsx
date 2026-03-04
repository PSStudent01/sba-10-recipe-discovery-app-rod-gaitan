
// Favorites page component
// has only 1 dependency 'useFavorites'

import { useFavorites } from '../context/FavoritesContext'  //  Imports 'FavoritesContext' custom hook, giving this page access to it
import RecipeCard from '../components/RecipeCard' //   Imports the 'RecipeCard' component, allowing this page to use it

function Favorites() {  //Defines the 'Favorites' page component. it gets everything from 'FavoritesContext' so no props needed
    const { favorites } = useFavorites()  // 'useFavorites()' extracts ONLY 'favorites' from the 4 values in 'FavoritesContext' (favorites, addFavorite, removeFavorite, isFavorite) 
    // to be used in this page.

    if (favorites.length === 0) {   // conditional checks: IF the favorites array is empty THEN...
        return <p>No favorite recipes selected!</p>  //THEN it displays message 
    }

    // ELSE, it renders the page as follows: 
    return (
        <div>
            <h1>My Favorites</h1>
            <div>
                {favorites.map(recipe => (  // loops through each recipe in the 'favorites' array....
                    <RecipeCard key={recipe.idMeal} recipe={recipe} /> // 'key={recipe.idMeal}' = for each recipe item, a unique ID (idMeal) gets assigned to it 
                                                                        // and then the that property gets assigned to 'key' variable
                                                                        // 'recipe={recipe}' = passes the 'recipe data' into 'RecipeCard' as a prop. The whole recipe OBJECT item gets passed in as a prop.  
                                                                        // so that the 'RecipeCard' component can pull out whatever it needs from it. For example:
                                                                        // 'recipe.idMeal' from----> <Link to={`/recipe/${recipe.idMeal}`}>View Recipe</Link>                                       
                ))}
            </div>
        </div>
    )
}

export default Favorites  //Exports the hook so other files can import and use it.

/*
These come directly from 'TheMealDB' API:
- strMeal = recipe name
- strMealThumb = recipe image URL
- idMeal = recipe ID
you have to use their exact property names to access the data correctly
*/