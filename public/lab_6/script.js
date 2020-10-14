// You may wish to find an effective randomizer function on MDN.

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

function randomInt(max) {
  //  Min is 0
  return Math.floor(Math.random() * (max));
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      // You're going to do your lab work in here. Replace this comment.
      let allCountries = fromServer;
      $('.flex-inner').remove();  //  removes the list of checkboxes on each click if exists

      //  Get 10 random countries from the returned value list

        //  is it possible to use .map() while checking the contents of the current instance of the array?

      const countries = range(10).map((country) => {  //  creates array of length 10, repopulates with country objects using .map()
        const int = randomInt(allCountries.length - 1);
        const c = allCountries[int];  //  gets random country from current instance of allCountries

        allCountries = allCountries.filter((remove) => {  //  filters selected country from allCountries to prevent duplicates
          if (remove === c) {
            return false;
          }
          else {
            return true;
          }
        });

        return c;
        //  this line can be used alone to get countries, but won't prevent duplicates ==> return allCountries[randomInt(allCountries.length - 1)]
      });
      
      //  Sort the ten countries in reverse alphabetical order using .sort() and the sort function provided
      countries.sort((a, b) => sortFunction(b, a, 'name')); //  .sort() makes changes to the object itself, no need for new variable

      //  Inject an ordered list element with the classname "flex-inner" into your document.
      const countriesList = document.createElement('ol');
      countriesList.setAttribute('class', 'flex-inner');
      $('form').prepend(countriesList);

      //  Inject list element containing a checkbox and label for each country into the list
      for (let i = 0; i < countries.length; i++) {
        const c = countries[i];
        const listElement = document.createElement('li');
        const inputElement = document.createElement('input');
        const labelElement = document.createElement('label');

        inputElement.setAttribute('type', 'checkbox');
        inputElement.setAttribute('value', c.code);
        inputElement.setAttribute('id', c.code)
        inputElement.setAttribute('name', c.name);
        
        labelElement.setAttribute('for', inputElement.id);
        labelElement.innerHTML = c.name;
        
        listElement.append(inputElement);
        listElement.append(labelElement);
        $('.flex-inner').append(listElement);
      }

      console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});