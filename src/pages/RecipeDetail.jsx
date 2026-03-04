// RecipeDetail page component

import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import { useFavorites } from '../context/FavoritesContext'

function RecipeDetail() {
  const { recipeId } = useParams()
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
  )

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />

  const recipe = data.meals[0]

  const handleFavoriteClick = () => {
    if (isFavorite(recipe.idMeal)) {
      removeFavorite(recipe.idMeal)
    } else {
      addFavorite(recipe)
    }
  }

  return (
    <div>
      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} width="300" />
      <button onClick={handleFavoriteClick}>
        {isFavorite(recipe.idMeal) ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <h2>Instructions</h2>
      <p>{recipe.strInstructions}</p>
    </div>
  )
}

export default RecipeDetail