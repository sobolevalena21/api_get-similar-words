// Information to reach API
const url = 'https://api.datamuse.com/words?sl='
//The ?sl= portion of the string will be the start of your query string, which will be used to pass parameters to the Datamuse API. The query string will be used by the engine to narrow the search to words that sound like your word.
 
// Selects page elements
const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const responseField = document.querySelector('#responseField');
 
// AJAX function
const getSuggestions = () => {
  const wordQuery=inputField.value;//to store the value of what is being typed into the input field.
  const endpoint = url+wordQuery;
  fetch(endpoint,{cache: 'no-cache'}).then(response => { //Chain a .then() method to the fetch() function. Pass an arrow callback function as its argument. The callback function should take response as its single parameter.
    if(response.ok) {
      return response.json();//By returning response.json(), the next .then() method chained to it will receive a Promise with JSON data.
    }
    throw new Error('Request failed!');// to raise an exception if the request failed.
  }, networkError => { 
         console.log(networkError.message) //add a second argument to the .then() method to add another callback function to handle errors. Create an arrow function that takes one parameter, networkError
 }).then(jsonResponse => {
    //renderRawResponse(jsonResponse) //renderRawResponse() function declaration in public/helperFunctions.js. Provides an array, looking unformatted. Next function formats it.
    renderResponse(jsonResponse)
  }
 
  )
}
 
// Clears previous results and display results to webpage
const displaySuggestions = (event) => {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  }
  getSuggestions();
};
 
submit.addEventListener('click', displaySuggestions);
