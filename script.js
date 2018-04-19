const apiKey = '86c18d5762f99bce24576f0c5af8510d';
$(document).ready(function() {
  $('#a').on('click', function() {
    document.querySelector('.loading-container').classList.remove('hidden');
    $.ajax({
      url: "https://api-2445582011268.apicast.io/games/count" ,
      type: "GET",
      headers: {
        'user-key': apiKey,
        'Accept': 'application/json',
      },
      success: function(games) {
        let gameCount = games.count;
        // generate a number between 1 and gameCount
        let gameNumber = Math.floor((Math.random() * gameCount) + 1);
        $.ajax({
          url: "https://api-2445582011268.apicast.io/games/" + gameNumber,
          type: "GET",
          headers: {
            'user-key': apiKey,
            'Accept': 'application/json',
          },
          success: function(response) {
            displayPlatformsRequests(response);
            // destroy everything inside the div
            document.querySelector('main').innerHTML = "";
            // define our dom elements
            let containerDiv = document.createElement('div');
            let title = document.createElement('h1');
            let summary = document.createElement('p');
            let cover = document.createElement('img');
            let platformContainer = document.createElement('div');

            platformContainer.classList.add('platform-container');
    
            // add content and classe to our dom elements
            containerDiv.classList.add('gameInfo');
            if(response[0].name == undefined) {
              title.innerHTML = 'No title';
            } else {
              title.innerHTML = response[0].name;
            }
            if(response[0].summary == undefined) {
              summary.innerHTML = "No summary for this game";
            } else {
              summary.innerHTML = response[0].summary;
            }
            if(response[0].cover == undefined) {
              console.log('pas image');
            } else {
              cover.src = response[0].cover.url;
            }    
            // append our child to the container
            containerDiv.appendChild(title);
            containerDiv.appendChild(summary);
            containerDiv.appendChild(cover);
            containerDiv.appendChild(platformContainer);
    
            // append the container to main
            document.querySelector('main').appendChild(containerDiv);
            document.querySelector('.loading-container').classList.add('hidden');
          }
        });
      }
    });
  });
});
function displayPlatformsRequests(response) {
  if(response[0].platforms !== undefined) {
    let platforms = response[0].platforms;
    for (let i = 0; i < platforms.length; i++) {
      $.ajax({
        url: "https://api-2445582011268.apicast.io/platforms/" + platforms[i],
        type: "GET",
        headers: {
        'user-key': apiKey,
        'Accept': 'application/json',
        },
        success: function(response) {
          displayPlatform(response);
        }
      });
    };
  };
}

function displayPlatform(response) {
  let name = document.createElement('h3');
  name.innerHTML = response[0].name;
  document.querySelector('.platform-container').appendChild(name);
}