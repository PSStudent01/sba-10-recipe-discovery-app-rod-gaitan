
import { Link, useNavigate } from 'react-router-dom' //Imports the 'Link' component from React Router. similar to <a> tags, but navigates without reloading the page.
                                                    // 'useNavigate' = a hook that you 'navigate to a URL' from 'inside a function'.
import { useState } from 'react'  //we need 'useState'  to track what the user is typing in the input/search box.

function Navbar() {  //Defines the 'Navbar' component. It has no props because it doesn't need any data passed in as it manages its own state.
  const [query, setQuery] = useState('') // Creates a 'state' variable to store what the user types in the search box:
                                        // 'query' = the current text in the search box
                                      // 'setQuery' = the function used to update that text
                                      // '' = initializes as an empty string because the search box is empty at start
  
  // navigation here needs to happen 'Programmatically'. For example: when a form is submitted successfully, it then automatically navigates to a 'confirmation page'.
  const navigate = useNavigate() // Defines the navigate function

  const handleSearch = (e) => {  // sub-function 'handleSearch', defines a function that runs when the user clicks the 'Search' button. 
                                // The 'e' aka 'event object' pases/gest passed information about an action just taken by user.
    e.preventDefault() // prevents the default browser behavior. For example,  normally clicking a button inside a form reloads the page. this line stops that from happening.
    if (query.trim()) {  // conditional: IF the search/input box has input in it, THEN 'query.trim()' remove any extra spaces from the start and end. ELSE IF... 
                        // ...the box is empty, nothing happens.
      navigate(`/search?query=${query}`) // the 'query string' ('?query=') takes input from the search box and appends it to the URL. For example if they typed "chicken" the URL becomes /search?query=chicken
    }
  }

  return ( // Returns JSX while using the a <nav> element 
    <nav>
      <Link to="/">Home</Link> {/*hyperlink to 'Home' */}
      <Link to="/favorites">Favorites</Link>  {/*hyperlink to 'Favorites' */}
        
        {/*'value={query}' maps the 'input' to the 'current state' so they always match.
            onChange={(e) => setQuery(e.target.value)} = every time the user types a letter, thisupdates the query state with the new value */}
      <input
        type="text"
        value={query}  
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search recipes..."
      />
      <button onClick={handleSearch}>Search</button> {/*runs our handleSearch function when clicked*/}
    </nav>
  )
}

export default Navbar  //Exports the hook so other files can import and use it.