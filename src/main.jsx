import { StrictMode } from 'react'  // a helpful debugging tool.
import { createRoot } from 'react-dom/client' // connects  React app to the HTML page.
import './index.css'  // Imports all CSS styles that need to be applied globally in the app.
import App from './App.jsx'  // this imports 'App' component, which holds all routes.
import { BrowserRouter } from 'react-router-dom'  // imports the 'routing container' from 'React Router'. 
                                                  //Without this app wrapper, page navigation (/home, /favorites, etc.) would fail.

createRoot(document.getElementById('root')).render(  //defines the specific html element in the 'index.html' file that React will live in. ITC the 'root' 
                                                      //See "nesting dolls" below:
  <StrictMode>  {/*development helper tool */}
        <BrowserRouter>   {/* allows routing to happen*/}
          <App />       {/* the applicaiton itself */}
        </BrowserRouter>
  </StrictMode>,
)
