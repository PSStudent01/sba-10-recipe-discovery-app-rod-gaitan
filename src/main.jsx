import { StrictMode } from 'react'  // a helpful debugging tool.
import { createRoot } from 'react-dom/client' // connects  React app to the HTML page.
import './index.css'  // Imports all CSS styles that need to be applied globally in the app.
import App from './App.jsx'  // this imports 'App' component, which holds all routes.
import { BrowserRouter } from 'react-router-dom'  // imports the 'routing container' from 'React Router'. 
                                                  //Without this app wrapper, page navigation (/home, /favorites, etc.) would fail.

import { FavoritesProvider } from './context/FavoritesContext'  // *1) imporitng 'FavoritesProvider' so that ALL the componenents inside the 'App' will have access to values/functions:
                                                                // favorites, addFavorite, removeFavorite, isFavorite

createRoot(document.getElementById('root')).render(  //defines the specific html element in the 'index.html' file that React will live in. ITC the 'root' 
                                                      //See "nesting dolls" below:
  <StrictMode>  {/*development helper tool */}
        <BrowserRouter>   {/* allows routing to happen everrwhere*/}
          <FavoritesProvider>                               {/*2) wrapping App with this so that the favorites work everywhere */}
          <App />       {/* the applicaiton itself */}
          </FavoritesProvider>
        </BrowserRouter>
  </StrictMode>,
)
