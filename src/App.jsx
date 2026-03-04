
import { Routes, Route } from 'react-router-dom' // components from the 'react-router-dom library', which is a separate third-party package.
                                                // 'Route'  defines each individual page and its URL path, see below in JSX:
                                                // the container that wraps all the routes, see below in JSX:
// importing all required PAGES & navbar                                                
import Navbar from './components/Navbar'        
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import RecipeDetail from './pages/RecipeDetail'
import Favorites from './pages/Favorites'
import SearchResults from './pages/SearchResults'

function App() {   //defines the main App component, whose purpose in this case is to return JSX of all the page routes 
  return (
    <>  {/*fragment marks the beginning of SINGLE parent elemment */}
      <Navbar />  {/* Navbar elements outside Routes in Global scope so that it renders on every single page. Making it possible for search bar to always be visible. */}
      <Routes>  {/* Each line below maps a a URL to a page, where 'path' = the URL & 'element' = the page component to render: */}
        <Route path="/" element={<Home />} /> 
        <Route path="/category/:categoryName" element={<CategoryPage />} /> {/* ':categoryName' is dynamic variable that changes based on what the user clicks.*/}
        <Route path="/recipe/:recipeId" element={<RecipeDetail />} />    {/* ':recipeId' is dynamic variable that changes based on what the user clicks.*/}
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </>
  )
}

export default App  // this line exports the 'App' component so that 'main.jsx' can import and use it.



/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

*/
