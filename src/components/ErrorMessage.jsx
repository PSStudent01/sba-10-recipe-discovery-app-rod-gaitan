
// ErrorMessage component

function ErrorMessage({ message }) {  //Defines the component. 
                                    // '{ message }' = destructuring  prop 'message'. It means this 'component' expects to receive a 'message value' from whatever uses it, exmaple:
                                    // <ErrorMessage message="Failed to fetch recipes" />
  return (  //JSX that gets displayed on the screen when something goes wrong
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <p>Something went wrong: {message}</p>
    </div>
  )
}

export default ErrorMessage //Exports the component so other files can import and use it.