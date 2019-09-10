const BASE_URL = "http://localhost:3000"
const WILDFIRES_URL = `${BASE_URL}/wildfires`

  function initMap() {
    let map = new google.maps.Map(
      document.getElementById('map'), {
        zoom: 15,
        styles: [
              {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
              {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
              },
              {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
              },
              {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
              }
            ]
      }
    )

    let drawingManager = new google.maps.drawing.DrawingManager({
      // drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingMode: null,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT,
        drawingModes: ['polygon', 'marker', 'circle', 'rectangle']
      },
      circleOptions: {
        fillColor: '#ff5733',
        fillOpacity: 0.3,
        strokeWeight: 1,
        clickable: true,
        editable: true,
        zIndex: 1,
      },
      polygonOptions: {
        fillColor: '#ff5733',
        fillOpacity: 0.3,
        strokeWeight: 1,
        clickable: true,
        editable: true,
        zIndex: 1,
      },
      rectangleOptions: {
        fillColor: '#ff5733',
        fillOpacity: 0.3,
        strokeWeight: 1,
        clickable: true,
        editable: true,
        zIndex: 1,
      }
    });
    drawingManager.setMap(map)

    let currentLocation = new google.maps.InfoWindow;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        currentLocation.setPosition(pos);
        currentLocation.setContent('Current Location');
        currentLocation.open(map);
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, currentLocation, map.getCenter());
      });
    } else {
      handleLocationError(false, currentLocation, map.getCenter());
    }
    getWildfirePoints()

    function getWildfirePoints(){
      fetch(WILDFIRES_URL)
      .then(response => response.json())
      .then(response => response.forEach(renderWildfireCard))
    }

    function renderWildfireCard(wildfire){
      let card = createCard()
      let title = createCardTitle(wildfire)
      let description = createCardDescription(wildfire)
      let link = createCardLink(wildfire)
      let lat = createCardLat(wildfire)
      let long = createCardLong(wildfire)
      let deleteButton = createCardDelete()

      card.append(title, description, lat, long, link, deleteButton)

      setWildfireCoords(wildfire, card)

      return card
    }

    function createCard(){
      return document.createElement('div')
    }

    function createCardTitle(wildfire){
      let title = document.createElement('h2')
      title.innerText = wildfire.title
      return title
    }

    function createCardDescription(wildfire){
      let description = document.createElement('p')
      description.textContent = wildfire.description
      return description
    }

    function createCardLink(wildfire){
      let linkTag = document.createElement('LINK')
      let link = document.createElement('a')
      let linkText = "Wildfire Details"
      link.href = wildfire.link
      link.append(linkText)
      link.title = "Wildfire Details"
      link.target = '_blank'
      return link
    }

    function createCardLat(wildfire){
      let lat = document.createElement('p')
      lat.innerText = `Latitude: ${wildfire.latitude}`
      return lat
    }

    function createCardLong(wildfire){
      let long = document.createElement('p')
      long.innerText = `Longitude: ${wildfire.longitude}`
      return long
    }

    function createCardDelete(wildfire){
      let deleteButton = document.createElement('button')
      deleteButton.innerText = "Delete Wildfire"
      deleteButton.style.margin = "10px"
      deleteButton.style.color = "orange"
      return deleteButton
    }

    function createDeleteEvent(deleteButton, id){
      deleteButton.addEventListener('click', function(event){
        deleteWildfire(id, event)
      })
    }


    function setWildfireCoords(wildfire, card){
      let latitude = wildfire.latitude
      let longitude = wildfire.longitude
      let latLng = new google.maps.LatLng(latitude, longitude)
      let marker = new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
      })

      marker.addListener('click', function(){
        let wildfireInfo = new google.maps.InfoWindow({
          content: card
        })
        wildfireInfo.open(map, marker)
      })

      google.maps.event.addListener(marker, 'dragend', function(marker){
        let latLong = marker.latLng
        let updatedLatitude = marker.latLng.lat()
        let updatedLongitude = marker.latLng.lng()
        updateCoordinates(updatedLatitude, updatedLongitude, wildfire)
      })

      function updateCoordinates(latitude, longitude, wildfire){
        let updateConfig = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            latitude,
            longitude
          })
        }
        fetch(WILDFIRES_URL + `/${wildfire.id}`, updateConfig)
        .then(function(response){
          response.json()
        })
        .then(pessimisticRendering(latitude, longitude))
        .catch(function(error){
          console.log(error.message)
        })
      }

      function pessimisticRendering(latitude, longitude){
        card.querySelectorAll('p')[1].innerText = `Latitude: ${latitude}`
        card.querySelectorAll('p')[2].innerText = `Longitude: ${longitude}`
      }

    }
  }


  function handleLocationError(browserHasGeolocation, currentLocation, pos) {
    currentLocation.setPosition(pos);
    currentLocation.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
      currentLocation.open(map);
  }
