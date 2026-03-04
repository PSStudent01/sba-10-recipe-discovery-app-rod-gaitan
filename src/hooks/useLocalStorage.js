// useLocalStorage hook
import { useState } from 'react'  //We only need 'useState' bc we're tracking state of an action triggere as a result of human input (reading and writing to localStorage) unlike fteching which autonomous

function useLocalStorage(key, initialValue) {  // defines the custom hook 'useLocalStorage' with 2 parameters: 
                                                // the 'key' for the data we store in Local Storage
                                                // the 'initialValue' for the DEFAULT value (id no new value has been passed) 
  const [storedValue, setStoredValue] = useState(() => { //the 'useState' hook creates a variable 'storedValue' to store the state. 
                                                        // the hook itself is not initialized by passing a 'value' directly to it, but rather a 'function' is passed, telling React..
                                                        // //"hey run this function once to figure out the starting value"          
                                        // it creates 2 variables:
                                        // 1) 'storedValue' = to store the current localStorage data value
                                        // 2) 'setStoredValue' = the function used to update that 'storedValue' value
    try {   // Starts the try/catch block that says "hey attempt the following code, but if something breaks don't crash the entire app".
      const item = window.localStorage.getItem(key) // this searches localStorage for the 'current key value'. ofr ex, if 'current key value' is 'Toyota', it looks for that and stores it in 'item' if found
      return item ? JSON.parse(item) : initialValue // IF a match is found (and stored in items), the ternary conditional coverts that data from string back to JS. ELSE,  return the 'initialValue'.
    } catch (error) {  // Now IF something goes wrong in the try block...
      return initialValue  // ...'initialValue' is also returned and move on.
    }
  })

  const setValue = (value) => { // Defines a function that will update the LocalSTorage stored value. the function is called whne the user adds or removes a favorite for example.
    try {
      setStoredValue(value)  // 1) updates the React state so the UI reflects the change.
      window.localStorage.setItem(key, JSON.stringify(value))  // converts the JavaScript data into string; then saves the value to localStorage so it persists across refreshes
    } catch (error) {  // says "hey, if something goes wrong while saving,
      console.log(error) //...log the error but don't crash the app."
    }
  }

  return [storedValue, setValue] // the return is deliberately designed  to feel like useState so anyone using it already intuitively knows how it works. You get a value and a setter.
}

export default useLocalStorage //Exports the hook so other files can import and use it.