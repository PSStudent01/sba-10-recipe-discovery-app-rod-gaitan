
//Home page component
import useFetch from '../hooks/useFetch'   //Imports the custom fetch hook
import Spinner from '../components/Spinner'  // Imports component that provides feedback to the user...Loading
import ErrorMessage from '../components/ErrorMessage' // Imports component that provides feedback to the user...Error
import { Link } from 'react-router-dom' // Reacts version of html <a> tag, but this one navigates without reloading the page.

function Home() { //Defines the Home page component without props
  const { data, loading, error } = useFetch('https://www.themealdb.com/api/json/v1/1/categories.php') //3 things return from 'useFetch'
                                 // URL =  the exact API endpoint that returns ALL recipe categories
                                 // 'data' =  stores the categories fetched from the API once loaded
                                 // 'loading' = returns true or false referring to whether still loading/procesing/waiting or not
                                 // 'error' = returns an error message if something goes wrong
  // 3 conditionals
  if (loading) return <Spinner />  // IF we're still waiting for data ( iows, loading ), 'loading' is true, THEN run the 'Spinner()' from 'Spinner.jsx' and return <Spinner />
  if (error) return <ErrorMessage message={error} /> // IF (not ELSE IF) something went wrong, THEN run the 'ErrorMessage({ message })' from 'ErrorMessage.jsx' and display the error message. 

  // ELSE load page with the following details:
  return (
    <div>
      <h1>Recipe Categories</h1>
      <div>
        {data.categories.map(category => (  //the API returns an object with a 'categories' array inside it. This loops through 'data.categories' and for each  'category' in the 'categories' array of object data and renders something for each.
          <Link key={category.idCategory} to={`/category/${category.strCategory}`}> {/* // 'key={category.idCategory}' = for each category item, a unique ID (idCategory) gets assigned to it
                                                                                    // and then the that property gets assigned to 'key' variable  
                                                                                    // 'to={`/category/${category.strCategory}' = builds a dynamic URL, example '/category/Seafood' 
                                                                                    //  so that the user selects some category that gets passed to  'category.strCategory' and takes the customer over to that category page?*/}

            <img src={category.strCategoryThumb} alt={category.strCategory} width="200" /> {/* // 'src={category.strCategoryThumb}' = for each category item, an image (strCategoryThumb) gets assigned to it 
                                                                                           // and then  that property gets assigned to 'src' variable
                                                                                           // ayt the same time 'alt={category.strCategory} = for each category item, an accessibility string elemnt (strCategory) gets assigned to it 
                                                                                           // and then  that property gets assigned to 'alt' variable   */}
            <p>{category.strCategory}</p>      {/* // '{category.strCategory}' = for each category item, a category paragraph (strCategory) gets assigned to it 
                                                 // and DOES NOT get assigned to a variable, but rather rendered/displayed.  */}
          </Link> 
        ))}
      </div>
    </div>
  )
}

export default Home   //Exports the hook so other files can import and use it.