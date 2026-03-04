
//Spinner component:
// every page that fetches data will use this:
// if loading return spinner

function Spinner() { // Defines the Spinner component 
  return ( //JSX that gets displayed on the screen when data fetching is running
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <p>Loading...</p>
    </div>
  )
}

export default Spinner  //Exports the component so other files can import and use it.