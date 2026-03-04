import { createContext, useContext, useState } from 'react' //  Importing 3 React hooks
                                                            // useContext = reads from the context inside any component
                                                            // useState = imported for context ONLY, otherwise no need since useLocalStorage handles state.
import useLocalStorage from '../hooks/useLocalStorage' // ..and one of the custom hooks

const FavoritesContext = createContext()   // defining the context 'FavoritesContext', where our favs will be stored

export function FavoritesProvider({ children }) { // defining provider component 'FavoritesProvider', which is the wrapper that makes 'favorites' data available to every component inside itself
                                                  // 'children' parameter indicates whatever components are wrapped inside this have access to component 'FavoritesProvider'
  const [favorites, setFavorites] = useLocalStorage('favorites', []) // here the 'useLocalStorage' hook to:
                                                                    //  - store the list favorite saved recipes in 'favorites'
                                                                    // - update that list uisng the 'setFavorites'
                                                                   // - 'favorites' =  the key label given to the localStorage entry, that starts as an empty array ('[]') if nothing is saved yet

  const addFavorite = (recipe) => { // Function to add a recipe to favorites: 
                                    // it takes 1 param  
    setFavorites([...favorites, recipe])  /// and then calls the 'setFavorites()' function to pass it:
                                            // the spread operator '...favorites'
                                            // and and then add the 'recipe' value to update the copy of 'favorites' array
  }

  const removeFavorite = (recipeId) => { //  Function to remove a recipe from favorites:
                                        // it takes 1 param  
    setFavorites(favorites.filter(recipe => recipe.idMeal !== recipeId)) // '.filter()' = loops through every favorite item and 
                                                                            // keeps only the ones that DO NOT match the 'recipeId' THAT WE WANT TO REMOVE.
  }

  const isFavorite = (recipeId) => {  // Function to check if a recipe is ALREADY a favorite:
    return favorites.some(recipe => recipe.idMeal === recipeId) // '.some()' = loops through the list of favorite items and returns true if at least one item matches
                                                                // This used to decide whether to show "Add to Favorites" or "Remove from Favorites" button
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}> {/* the values/functions here are being packaged and shared with any component that will be added in the 'main.jsx' file*/}
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {      
  return useContext(FavoritesContext)  // useContext goes into 'FavoritesContext' and grabs everything inside the value prop:
                                        // {{ favorites, addFavorite, removeFavorite, isFavorite }} and returns all 4 of those things at once 
                                   
}