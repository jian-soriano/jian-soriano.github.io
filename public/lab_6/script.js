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

      //  Get 10 random countries from the returned value list
      const allCountries = fromServer;
      /*const countries = range(10);
      countries.map((country) => {
        let newCountry = allCountries[Math.floor(Math.random() * (allCountries.length - 1))];
        console.log(newCountry);
        while (this.includes(newCountry)) {
          newCountry = allCountries[Math.floor(Math.random() * (allCountries.length - 1))];
          console.log(newCountry);
        }
        return newCountry;
      });
      console.log(allCountries[1]);
      console.log(countries);*/

      let countries = range(10).map((country) => allCountries[Math.floor(Math.random() * (allCountries.length - 1))]);
      console.log(countries);
      
      //  Sort the ten countries in reverse alphabetical order using .sort() and the sort function provided
      countries.sort((a, b) => sortFunction(a, b, 'name'));
      console.log(countries);

      //  Inject an ordered list element with the classname "flex-inner" into your document.

      console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});