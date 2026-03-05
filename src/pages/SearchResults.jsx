//SearchResults page component

import { useLocation } from 'react-router-dom' // Imports a React Router hook that that reads the current URL. Needed to extract the 'search' query out of the URL.
import useFetch from '../hooks/useFetch' // //Imports the custom fetch hook
import Spinner from '../components/Spinner'  // Imports component that provides feedback to the user...Loading
import ErrorMessage from '../components/ErrorMessage' // Imports component that provides feedback to the user...Error
import RecipeCard from '../components/RecipeCard' // Imports the 'RecipeCard' component, allowing this page to use it

function SearchResults() {    //Defines the SearchResults page component, no props needed.
    const location = useLocation() // Grabs the 'current URL information' of where we are currently on the page. For example if the URL is /search?query=chicken, this 'location' object holds that information.
    const query = new URLSearchParams(location.search).get('query')// 3 actions here:
                                                                // 'location.search' = grabs just the 'query' string part of the URL, for example '?query=chicken'
                                                                // 'new URLSearchParams(...)' = converts the 'query string' into something readable
                                                                // .get('query') = extracts the 'VALUE of the query parameter' ONLY, so for example itc "chicken"

    const { data, loading, error } = useFetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)  //3 things return from 'useFetch'
                                 // URL =  the exact API endpoint that returns what the user searched for. For example if query searched is "chicken", the URL endpoint becomes 'search.php?s=chicken'
                                 // The API in turn  returns ALL recipes MATCHING that search term
                                 // 'data' =  stores the categories fetched from the API once loaded
                                 // 'loading' = returns true or false referring to whether still loading/procesing/waiting or not
                                 // 'error' = returns an error message if something goes wrong

      // 4 conditionals, 3 mapping to the variables above (data, loading, error)                 
    if (loading) return <Spinner /> // IF we're still waiting for data ( iows, loading ), it means 'loading' is true, THEN run the 'Spinner()' from 'Spinner.jsx' and return <Spinner />
    if (error) return <ErrorMessage message={error} /> // IF (not ELSE IF) something went wrong, THEN run the 'ErrorMessage({ message })' from 'ErrorMessage.jsx' and display the error message. 

    // Handles the situation where the search found no results:
    if (!data.meals) {  // IF the API returns 'null' for 'meals' when no recipes match.
                        // 'meals' = property that the API itself creates and names
                        // '!data.meals' =  means "if meals doesn't exist or returns nothing or is empty"
        return <p>No results found for "{query}"</p> // displays  a friendly message, rather than an error as that's handled by 'error', with the search term the user queried
    }

    // ELSE load page with the following details:
    return (
        <div className="page">
            <h1>Results for "{query}"</h1>
            <div className="grid">
                {data.meals.map(recipe => (  //the API returns an object with a 'meals' array inside it. This loops through 'data.meals' and for each  'recipe' item in the 'meals' array of object 'data' and renders something for each.
                    <RecipeCard key={recipe.idMeal} recipe={recipe} /> // 'key={recipe.idMeal}' = for each recipe item, a unique ID (idMeal) gets assigned to it 
                                                                        // and then the that property gets assigned to 'key' variable
                                                                        // 'recipe={recipe}' = passes the 'recipe data' into 'RecipeCard' as a prop. The whole recipe OBJECT item gets passed in as a prop.  
                                                                        // so that the 'RecipeCard' component can pull out whatever it needs for, it. For example:
                                                                        // 'recipe.idMeal' from----> <Link to={`/recipe/${recipe.idMeal}`}>View Recipe</Link>       
                ))}
            </div>
        </div>
    )
}

export default SearchResults    //Exports the component so other files can import and use it.