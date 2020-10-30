function convertRestaurantsToCategories(restaurantList) {
  // process your restaurants here!
  const categoryList = restaurantList.reduce((list, restaurant, i) => {
    const categoryInList = list.find((c) => c.label === restaurant.category);

    if (!categoryInList) {
      list.push({
        label: restaurant.category,
        y: 1
      });
    }
    else {
      categoryInList.y += 1;
    }
    return list;
  }, []).sort((b, a) => (a.label > b.label) ? 1 : -1);


    let num = 0;
    for (let i = 0; i < categoryList.length; i++) {
      num += categoryList[i].y;
    }
    console.log(num);
  
  console.log(categoryList);
  return categoryList;
}

function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  CanvasJS.addColorSet('customColorSet1', [
    // add an array of colors here https://canvasjs.com/docs/charts/chart-options/colorset/
  "#111d5e", "#c70039", "#f37121", "#ffbd69"
  ]);

  return {
    animationEnabled: true,
    colorSet: 'customColorSet1',
    title: {
      text: 'Places To Eat Out In Future'
    },
    axisX: {
      interval: 1,
      labelFontSize: 12
    },
    axisY2: {
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
      title: 'Restaurants By Category',
      labelFontSize: 12,
      scaleBreaks: {customBreaks: [{
        startValue: 40,
        endValue: 50,
        color: "gold",
        type: "zigzag"
      },
      {
        startValue: 85,
        endValue: 100,
        color: "gold",
        type: "zigzag"
      },
      {
        startValue: 140,
        endValue: 175,
        color: "gold",
        type: "zigzag"
      }]} // Add your scale breaks here https://canvasjs.com/docs/charts/chart-options/axisy/scale-breaks/custom-breaks/
    },
    data: [{
      type: 'bar',
      name: 'restaurants',
      axisYType: 'secondary',
      dataPoints: datapointsFromRestaurantsList
    }]
  };
}

function runThisWithResultsFromServer(jsonFromServer) {
  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart
  const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
  const options = makeYourOptionsObject(reorganizedData);
  const chart = new CanvasJS.Chart('chartContainer', options);
  chart.render();

  //Add header element with number of categories
  $('.flex-outer .header').remove();
  const headerDiv = document.createElement('div');
  headerDiv.setAttribute('class', 'header');

  const numCategoriesHeader = document.createElement('h1');
  numCategoriesHeader.style.width = 'initial';
  numCategoriesHeader.innerHTML = "Number of Categories: " + reorganizedData.length;
  
  headerDiv.append(numCategoriesHeader);
  $('.flex-outer').prepend(headerDiv);
}

// Leave lines 52-67 alone; do your work in the functions above
document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});