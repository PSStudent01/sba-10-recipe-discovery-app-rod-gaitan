// CategoryPage page component

import { useParams } from 'react-router-dom'  // It imports 'useParams' hook, which reads the 'DYNAMIC' part of the URL. For example '/category/Seafood' gives us 'Seafood'.
import useFetch from '../hooks/useFetch' // //Imports the custom fetch hook
import Spinner from '../components/Spinner'  // Imports component that provides feedback to the user...Loading
import ErrorMessage from '../components/ErrorMessage' // Imports component that provides feedback to the user...Error
import RecipeCard from '../components/RecipeCard' // Imports the 'RecipeCard' component, allowing this page to use it

function CategoryPage() {  // Defines the CategoryPage component. No props needed.
  const { categoryName } = useParams() // a call is made to the 'useParams()' hook, and it grabs the DYNAMIC part of the URL.
                                    // so fo rexample, if you look at the route '<Route path="/category/:categoryName" element={<CategoryPage />} />' in 'App.jsx' and the URL is say..
                                    // 'category/Chicken' then the 'categoryName' would be "Chicken"

  const { data, loading, error } = useFetch(                                        // Calls the API with the DYNAMIC category name
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`          // for example if 'categoryName' is "Chicken",  the URL becomes 'filter.php?c=Chicken'
  )

  // 3 conditionals all mapping to the variables above (data, loading, error)
  if (loading) return <Spinner />  //IF we're still waiting for data ( iows, loading ), it means 'loading' is true, THEN run the 'Spinner()' from 'Spinner.jsx' and return <Spinner />
  if (error) return <ErrorMessage message={error} /> // IF (not ELSE IF) something went wrong, THEN run the 'ErrorMessage({ message })' from 'ErrorMessage.jsx' and display the error message. 

  // ELSE load page with the following details:
  return (
    <div>
      <h1>{categoryName} Recipes</h1>
      <div>
        {data.meals.map(recipe => (   //the API returns an object with a 'meals' array inside it. This loops through 'data.meals' and for each  'recipe' item in the 'meals' array of object 'data' and renders something for each.
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

export default CategoryPage   //Exports the component so other files can import and use it.