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

      //  Get 10 random countries from the returned value list

      //  is it possible to use .map() while checking the contents of the current instance of the array?
      
      /*const countries = range(10);
      countries.map((country) => {
        let newCountry = allCountries[randomInt(allCountries.length - 1)];
        console.log(newCountry);
        while (this.includes(newCountry)) {
          newCountry = allCountries[randomInt(allCountries.length - 1)];
          console.log(newCountry);
        }
        return newCountry;
      });
      console.log(allCountries[1]);
      console.log(countries);*/

      const countries = range(10).map((country) => {  //  creates array of length 10, repopulates with country objects using .map()
        const int = randomInt(allCountries.length - 1);
        const c = allCountries[int];  //  gets random country from current instance of allCountries
        //console.log(c);
        allCountries = allCountries.filter((remove) => {  //  filters selected country from allCountries to prevent duplicates
          if (remove === c) {
            return false;
          }
          else {
            return true;
          }
        });
        //console.log(c);
        //console.log(allCountries);
        //console.log(fromServer);
        return c;
        //  return allCountries[randomInt(allCountries.length - 1)]
      });
      console.log(countries);
      
      //  Sort the ten countries in reverse alphabetical order using .sort() and the sort function provided
      countries.sort((a, b) => sortFunction(b, a, 'name')); //  .sort() makes changes to the object itself, no need to new variable
      console.log(countries);

      //  Inject an ordered list element with the classname "flex-inner" into your document.

      console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});