// useFetch hook for fectching data (url)
import { useState, useEffect } from 'react'  //  Imports 2 of React's hooks that we need
                                            // 'useState' = to track the state of data, loading, and error values
                                            // 'useEffect = to trigger the 'fetch' when the component loads'

function useFetch(url) {    // it defines the custom hook. It accepts a url as a parameter that we passed in,  it will fetch that data.
  const [data, setData] = useState(null) // the useState hook creates a variable 'data' to store the fetched data. It starts as null because nothing is fetched at start time.
                                        // it creates 2 variables:
                                        // 1) 'data' = to store the current fetched data value
                                        // 2) 'setData' = the function used to update that 'data' value
  const [loading, setLoading] = useState(true) // "    "   "     ". creates a variable 'loading' to track if we're still waiting for data. Starts as true because we're always loading at start time.
  const [error, setError] = useState(null)   // "    "   "     ". Creates a variable to store any error message if something goes wrong. Starts as null because there's no error at start time.

  useEffect(() => {  //function that says "hey run this code when me 'useFetch' component first loads". This code starts fetching process
    fetch(url) //  Makes the API call using the URL that was passed in. 'fetch()' is a JavaScript's function. 
      .then(response => response.json()) // When the API returns the data it comes in raw format. This line converts it to a format we can use in JS. 
      .then(json => {   
        setData(json) // 1) then data gets passed to 'setData(json)', which in turn changes the state of 'data' variable
        setLoading(false) // 2)'setLoading(false)'  turns off the loading process because we're done loading at this point
      })
      .catch(err => {    // if  something goes wrong, the catch error..
        setError(err.message) // 1) stores the error message to display it
        setLoading(false) // 2) turns off loading because we're done loading at this point, even though it failed
      })
  }, [url]) //  'url' =  is a dependency array that tells 'useEffect' to run again IF the url changes". 
            //  and this can be triggered if for example user navigates to a different category as such action'd automatically fetch the new data.

  return { data, loading, error }  // passes back all 3 values to whatever component uses this hook. This is how the component knows what to display.
}

export default useFetch //Exports the hook so other files can import and use it.