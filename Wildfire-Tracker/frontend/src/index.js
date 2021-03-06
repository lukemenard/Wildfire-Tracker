const BASE_URL = "http://localhost:3000"
const WILDFIRES_URL = `${BASE_URL}/wildfires`
const POLYGONS_URL = `${BASE_URL}/polygons`
let wildfires = []
let side_bar_html = ""
let selector = document.createElement('select')
const body = document.body
const polygon = []

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
      })
    // map.addListener('click', function(event){
    //   // console.log(event)
    //
    //   let card = document.createElement('div')
    //   // clickWildfireCoords(event, card)
    // })


    let drawingManager = new google.maps.drawing.DrawingManager({
      // drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingMode: null,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_CENTER,
        drawingModes: ['polygon']
        // drawingModes: ['polygon', 'marker', 'circle', 'rectangle']
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
        // currentLocation.setContent('Current Location');
        // currentLocation.open(map);
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, currentLocation, map.getCenter());
      });
    } else {
      handleLocationError(false, currentLocation, map.getCenter());
    }
    getWildfirePoints()
    getPolygons()

    function getWildfirePoints(){
      fetch(WILDFIRES_URL)
      .then(response => response.json())
      .then(response => response.forEach(renderWildfireCard))
    }

    function getPolygons(){
      fetch(POLYGONS_URL)
      .then(response => response.json())
      // .then(response => console.log(response))
      .then(response => response.forEach(renderPolygonCard))
    }


    // let side_bar = document.getElementById('side_bar')
    // side_bar.innerHTML = "<select onchange='myclick(this.value);'>"+side_bar_html+"</select>"
    // google.maps.event.trigger(wildfires.title, 'click')

    // const selectorOptions = (wildfireList) => {
    //   console.log(wildfireList)
    //   wildfireList.forEach(wildfire => {
    //     console.log(wildfire)
    //   })
    //   // })
    // }

      //   let option = document.createElement('option')
      //   option.innerText = wildfire
      //   selector.append(option)
      // })
      // body.append(selector)
    // }

    // function uniqueWildfires(value, index, self){
    //   return self.indexOf(value) === index
    // }

    function renderWildfireCard(wildfire){
      let card = createCard()
      let title = createCardTitle(wildfire)
      let description = createCardDescription(wildfire)
      let link = createCardLink(wildfire)
      let lat = createCardLat(wildfire)
      let long = createCardLong(wildfire)
      let deleteButton = createCardDelete(wildfire)

      card.append(title, description, lat, long, link)
      // wildfires.push(wildfire.title)
      // side_bar_html += '<option value=' + (wildfires.length-1) + '>' + wildfire.title + '<\/option>'
      setWildfireCoords(wildfire, card)

      return card
    }

    function renderPolygonCard(polygon){
      let card = createPolygonCard()
      let title = createPolygonCardTitle(polygon)
      let description = createPolygonCardDescription(polygon)
      let link = createPolygonCardLink(polygon)
      // let lat = createPolygonCardLat(polygon)
      // let long = createPolygonCardLong(polygon)
      let deleteButton = createPolygonCardDelete(polygon)

      card.append(title, description, link)

      setPolygonCoords(polygon, card)

      return card
    }

    function polygonInfoWindow(polygon, card){
      google.maps.event.addListener(polygon,'click', function(){
        const polygonInfo = new google.maps.InfoWindow({
          content: card,
          position: {lat: polygon.lat1, lng: polygon.long1}
        })
      })
        polygonInfo.open(map)

        let deleteButton = createPolygonCardDelete(polygon)
        card.append(deleteButton)
    }

    function createCard(){
      card = document.createElement('div')
      card.classList.add("card")
      return card
    }

    function createPolygonCard(){
      polyCard = document.createElement('div')
      polyCard.classList.add("polyCard")
      return polyCard
    }

    function createCardTitle(wildfire){
      let title = document.createElement('h2')
      title.innerText = wildfire.title
      title.classList.add("card-title")
      return title
    }

    function createPolygonCardTitle(polygon){
      let title = document.createElement('h2')
      title.innerText = polygon.title
      title.classList.add("poly-card-title")
      return title
    }

    function createCardDescription(wildfire){
      let description = document.createElement('p')
      // debugger
      dessplit1 = wildfire.description.split('<description>')[1]
      description_final = dessplit1.split('</description>')[0]
      description.textContent = description_final
      description.classList.add('description')
      return description
    }

    function createPolygonCardDescription(polygon){
      let description = document.createElement('p')
      description.textContent = polygon.description
      description.classList.add('poly-description')
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
      link.classList.add('link')
      return link
    }

    function createPolygonCardLink(polygon){
      let linkTag = document.createElement('LINK')
      let link = document.createElement('a')
      let linkText = "Wildfire Details"
      link.href = polygon.link
      link.append(linkText)
      link.title = "Wildfire Details"
      link.target = '_blank'
      link.classList.add('poly-link')
      return link
    }

    function createCardLat(wildfire){
      let lat = document.createElement('p')
      lat.innerText = `Latitude: ${wildfire.latitude}`
      lat.classList.add('lat')
      return lat
    }

    // function createPolygonCardLat(polygon){
    //   let lat = document.createElement('p')
    //   lat.innerText = `Latitude: ${polygon.latitude}`
    //   return lat
    // }

    function createCardLong(wildfire){
      let long = document.createElement('p')
      long.innerText = `Longitude: ${wildfire.longitude}`
      long.classList.add('long')
      return long
    }

    // function createPolygonCardLong(polygon){
    //   let long = document.createElement('p')
    //   long.innerText = `Longitude: ${polygon.longitude}`
    //   return long
    // }

    function createCardDelete(wildfire, marker){
      let deleteButton = document.createElement('button')
      deleteButton.innerText = "Delete Wildfire"
      // deleteButton.style.margin = "10px"
      // deleteButton.style.color = "orange"
      deleteButton.classList.add('deleteButton')

      createDeleteEvent(wildfire, deleteButton, marker)

      return deleteButton
    }

    function createPolygonCardDelete(polygon){
      let polygonDeleteButton = document.createElement('button')
      polygonDeleteButton.innerText = "Delete Wildfire"
      // polygonDeleteButton.style.margin = "10px"
      // polygonDeleteButton.style.color = "orange"
      polygonDeleteButton.classList.add('poly-deleteButton')


      createPolygonDeleteEvent(polygon, polygonDeleteButton)
      // let id = polygon.id
      // console.log(id)
      // polygonDeleteButton.id = polygon.id
      // console.log(polygonDeleteButton.id)
      // // debugger
      // polygonDeleteButton.addEventListener('click', event => {
      //   debugger
      //   let deleteConfig = {
      //     method: 'DELETE'
      //   }
      //
      //   fetch(POLYGONS_URL + `/${polygonDeleteButton.id}`, deleteConfig)
      //   .catch(function(error){
      //     console.log(error.message)
      //   })
      // })

      // console.log(polygon)

      return polygonDeleteButton
    }

    function createDeleteEvent(wildfire, deleteButton, marker){
      deleteButton.addEventListener('click', function(event){
        deleteWildfire(wildfire, event, marker)
      })
    }

    function createPolygonDeleteEvent(polygon, deleteButton, ){
      // deleteButton.addEventListener('click', deletePolygon)
      deleteButton.addEventListener('click', () => {
        fetchPolygon(polygon)
        polygon.setMap(null)
      })
    }

    function fetchPolygon(polygon){
      let lat = polygon.latLngs.g[0].g[0].lat()
      let lng = polygon.latLngs.g[0].g[0].lng()

      let polyDeleteConfig = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            lat,
            lng
      })
      }

      fetch(POLYGONS_URL, polyDeleteConfig)
      .then(response => response.json())
      .then(response => deletePolygon(response))

      function deletePolygon(polygon){
        let id = polygon.id
        let deleteConfig = {
          method: 'DELETE'
        }

        fetch(POLYGONS_URL + `/${id}`, deleteConfig)
        .catch(function(error){
          console.log(error.message)
        })
      }
    }
      // let id = polygon.id


    function deleteWildfire(wildfire, event, marker){
      marker.setMap(null)
      let id = wildfire.id
      let deleteConfig = {
        method: 'DELETE'
      }

      fetch(WILDFIRES_URL + `/${wildfire.id}`, deleteConfig)
      .catch(function(error){
        console.log(error.message)
      })
    }

    google.maps.event.addListener(map, 'dblclick', function(event){

      let submitButton = document.createElement('button')
      submitButton.classList.add('submitButton')
      submitButton.innerText = 'Create New Wildfire'
      submitButton.style.margin = '10px'
      submitButton.addEventListener('click', function(event){
        event.preventDefault()
        getFormData()
      })

      let div = document.createElement('div')

      let form = document.createElement('form')
      form.innerHTML =
        ` <div class='newFireForm'>
            <form id="newFireForm" name="form_canvas">
                <h3 class="newFireFormh3"> Create New Wildfire </h3>
                <input type="hidden" id="id" name="id"  value="id">
                Title: <input class="newFireFormTitle" type="text" id="title" name="title"  value=""><br/>
                Description: <input class="newFireFormDescription" type="textContent" id="description" name="description"  value=""><br/>
                Latitude: <input class="newFireFormLat" id="latitude" name="latitude"  value="${event.latLng.lat()}"><br/>
                Longitude: <input class="newFireFormLong" id="longitude" name="longitude"  value="${event.latLng.lng()}"><br/>
                Link: <input class="newFireFormLink" type="text" id="link" name="link"  value=""><br/>
              </form>
            </div>
          `
      div.append(form, submitButton)

      let marker = new google.maps.Marker({
        position: event.latLng,
        map: map,
        draggable: true
        // animation: google.maps.Animation.DROP,
      })

      let infoWindow = new google.maps.InfoWindow({
        content: div
      })

      infoWindow.open(map, marker)

      function getFormData(){
        let formData = new FormData(form)
        let title = formData.get('title')
        let description = formData.get('description')
        let latitude = formData.get('latitude')
        let longitude = formData.get('longitude')
        let link = formData.get('link')
        addNewFire(title, description, latitude, longitude, link)
      }

      function addNewFire(title, description, latitude, longitude, link){
        marker.setMap(null)
        let clickconfig = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              title,
              description,
              latitude,
              longitude,
              link
            })
          }
          fetch(WILDFIRES_URL, clickconfig)
          .then(response => response.json())
          .then(renderWildfireCard)
          .catch(function(error){
            console.log(error.message)
          })
      }
    })

    function setWildfireCoords(wildfire, card){
      let latitude = wildfire.latitude
      let longitude = wildfire.longitude
      let latLng = new google.maps.LatLng(latitude, longitude)
      let marker = new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: true
        // animation: google.maps.Animation.DROP,
      })
      addMarkerListener(marker, card, wildfire)
    }

    function addMarkerListener(marker, card, wildfire){
      marker.addListener('click', function(){
        let wildfireInfo = new google.maps.InfoWindow({
          content: card
        })
        wildfireInfo.open(map, marker)

        let deleteButton = createCardDelete(wildfire, marker)
        card.append(deleteButton)
      })
      addDragListener(marker, wildfire, card)
    }

    function addDragListener(marker, wildfire, card){
      google.maps.event.addListener(marker, 'dragend', function(marker){
        let latLong = marker.latLng
        let updatedLatitude = marker.latLng.lat()
        let updatedLongitude = marker.latLng.lng()
        updateCoordinates(updatedLatitude, updatedLongitude, wildfire, card)
      })
    }

    function updateCoordinates(latitude, longitude, wildfire, card){
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
      .then(pessimisticRendering(latitude, longitude, card))
      .catch(function(error){
        console.log(error.message)
      })
    }

    function pessimisticRendering(latitude, longitude, card){
      card.querySelectorAll('p')[1].innerText = `Latitude: ${latitude}`
      card.querySelectorAll('p')[2].innerText = `Longitude: ${longitude}`
    }

      google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon){

        let p = polygon.getPaths("latLngs").g[0].g

          let latLng = []
          for(let i = 0; i < p.length; i++){
            let lat = 0
            lat = p[i].lat()

            let long = 0
            long = p[i].lng()

            latLng.push(lat)
            latLng.push(long)

          }

        let polySubmitButton = document.createElement('button')
        polySubmitButton.classList.add('polySubmitButton')
        polySubmitButton.innerText = 'Create New Wildfire'
        polySubmitButton.style.margin = '10px'
        polySubmitButton.addEventListener('click', function(event){
          event.preventDefault()
          getPolygonFormData()
        })

        let div = document.createElement('div')

        let form = document.createElement('form')
        form.innerHTML =
          `
          <div class="newPolyForm">
            <form id="newFireForm" name="form_canvas">
                  <h3 class="newPolyFormh3"> Create New Wildfire </h3>
                  <input type="hidden" id="id" name="id"  value="id">
                  <input type="hidden" id="wildfire_id" name="wildfire_id"  value="wildfire_id">
                  <input type="hidden" id="lat1" name="lat1" value="${latLng[0]}">
                  <input type="hidden" id="lat2" name="lat2" value="${latLng[2]}">
                  <input type="hidden" id="lat3" name="lat3" value="${latLng[4]}">
                  <input type="hidden" id="lat4" name="lat4" value="${latLng[6]}">
                  <input type="hidden" id="lat5" name="lat5" value="${latLng[8]}">
                  <input type="hidden" id="lat6" name="lat6" value="${latLng[10]}">
                  <input type="hidden" id="lat7" name="lat7" value="${latLng[12]}">
                  <input type="hidden" id="lat8" name="lat8" value="${latLng[14]}">
                  <input type="hidden" id="lat9" name="lat9" value="${latLng[16]}">
                  <input type="hidden" id="lat10" name="lat10" value="${latLng[18]}">
                  <input type="hidden" id="lat11" name="lat11" value="${latLng[20]}">
                  <input type="hidden" id="lat12" name="lat12" value="${latLng[22]}">
                  <input type="hidden" id="lat13" name="lat13" value="${latLng[24]}">
                  <input type="hidden" id="lat14" name="lat14" value="${latLng[26]}">
                  <input type="hidden" id="lat15" name="lat15" value="${latLng[28]}">
                  <input type="hidden" id="long1" name="long1" value="${latLng[1]}">
                  <input type="hidden" id="long2" name="long2" value="${latLng[3]}">
                  <input type="hidden" id="long3" name="long3" value="${latLng[5]}">
                  <input type="hidden" id="long4" name="long4" value="${latLng[7]}">
                  <input type="hidden" id="long5" name="long5" value="${latLng[9]}">
                  <input type="hidden" id="long6" name="long6" value="${latLng[11]}">
                  <input type="hidden" id="long7" name="long7" value="${latLng[13]}">
                  <input type="hidden" id="long8" name="long8" value="${latLng[15]}">
                  <input type="hidden" id="long9" name="long9" value="${latLng[17]}">
                  <input type="hidden" id="long10" name="long10" value="${latLng[19]}">
                  <input type="hidden" id="long11" name="long11" value="${latLng[21]}">
                  <input type="hidden" id="long12" name="long12" value="${latLng[23]}">
                  <input type="hidden" id="long13" name="long13" value="${latLng[25]}">
                  <input type="hidden" id="long14" name="long14" value="${latLng[27]}">
                  <input type="hidden" id="long15" name="long15" value="${latLng[29]}">
                  Title: <input class="newPolyFormTitle" type="text" id="title" name="title"  value=""><br/>
                  Description: <input class="newPolyFormDescription" type="textContent" id="description" name="description"  value=""><br/>
                  Link: <input class="newPolyFormLink" type="text" id="link" name="link"  value=""><br/>
                </form>
              </div>
              `

        div.append(form, polySubmitButton)

        let infoWindow = new google.maps.InfoWindow({
          content: div,
          position: {lat: latLng[0], lng: latLng[1]}
        })

        infoWindow.open(map)

        function getPolygonFormData(){
          let formData = new FormData(form)
          let wildfire_id = formData.get('wildfire_id')
          let title = formData.get('title')
          let description = formData.get('description')
          let link = formData.get('link')
          let lat1 = formData.get('lat1')
          let long1 = formData.get('long1')
          let lat2 = formData.get('lat2')
          let long2 = formData.get('long2')
          let lat3 = formData.get('lat3')
          let long3 = formData.get('long3')
          let lat4 = formData.get('lat4')
          let long4 = formData.get('long4')
          let lat5 = formData.get('lat5')
          let long5 = formData.get('long5')
          let lat6 = formData.get('lat6')
          let long6 = formData.get('long6')
          let lat7 = formData.get('lat7')
          let long7 = formData.get('long7')
          let lat8 = formData.get('lat8')
          let long8 = formData.get('long8')
          let lat9 = formData.get('lat9')
          let long9 = formData.get('long9')
          let lat10 = formData.get('lat10')
          let long10 = formData.get('long10')
          let lat11 = formData.get('lat11')
          let long11 = formData.get('long11')
          let lat12 = formData.get('lat12')
          let long12 = formData.get('long12')
          let lat13 = formData.get('lat13')
          let long13 = formData.get('long13')
          let lat14 = formData.get('lat14')
          let long14 = formData.get('long14')
          let lat15 = formData.get('lat15')
          let long15 = formData.get('long15')

          addNewPolygon(
            wildfire_id,
            title,
            description,
            link,
            lat1,
            long1,
            lat2,
            long2,
            lat3,
            long3,
            lat4,
            long4,
            lat5,
            long5,
            lat6,
            long6,
            lat7,
            long7,
            lat8,
            long8,
            lat9,
            long9,
            lat10,
            long10,
            lat11,
            long11,
            lat12,
            long12,
            lat13,
            long13,
            lat14,
            long14,
            lat15,
            long15
          )
        }

        function addNewPolygon(
          wildfire_id,
          title,
          description,
          link,
          lat1,
          long1,
          lat2,
          long2,
          lat3,
          long3,
          lat4,
          long4,
          lat5,
          long5,
          lat6,
          long6,
          lat7,
          long7,
          lat8,
          long8,
          lat9,
          long9,
          lat10,
          long10,
          lat11,
          long11,
          lat12,
          long12,
          lat13,
          long13,
          lat14,
          long14,
          lat15,
          long15
        ){
          polygon.setMap(null)
          let polyConfig = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({
                wildfire_id,
                title,
                description,
                link,
                lat1,
                long1,
                lat2,
                long2,
                lat3,
                long3,
                lat4,
                long4,
                lat5,
                long5,
                lat6,
                long6,
                lat7,
                long7,
                lat8,
                long8,
                lat9,
                long9,
                lat10,
                long10,
                lat11,
                long11,
                lat12,
                long12,
                lat13,
                long13,
                lat14,
                long14,
                lat15,
                long15
              })
            }
            fetch(POLYGONS_URL, polyConfig)
            .then(response => response.json())
            .then(renderPolygonCard)
            .catch(function(error){
              console.log(error.message)
            })
        }
      })

      function setPolygonCoords(polygon, card){
        let polygonCoords = [
          {lat: polygon.lat1, lng: polygon.long1},
          {lat: polygon.lat2, lng: polygon.long2},
          {lat: polygon.lat3, lng: polygon.long3},
          {lat: polygon.lat4, lng: polygon.long4},
          {lat: polygon.lat5, lng: polygon.long5},
          {lat: polygon.lat6, lng: polygon.long6},
          {lat: polygon.lat7, lng: polygon.long7},
          {lat: polygon.lat8, lng: polygon.long8},
          {lat: polygon.lat9, lng: polygon.long9},
          {lat: polygon.lat10, lng: polygon.long10},
          {lat: polygon.lat11, lng: polygon.long11},
          {lat: polygon.lat13, lng: polygon.long13},
          {lat: polygon.lat14, lng: polygon.long14},
          {lat: polygon.lat15, lng: polygon.long15}
        ]

        let newCoordArray = []
        polygonCoords.forEach(coord => {
          if (coord.lat !== 0 && coord.long !== 0){
            newCoordArray.push(coord)
          }
        })

        let newPolygon = new google.maps.Polygon({
          paths: newCoordArray,
          draggable: true,
          map: map,
          fillColor: '#ff5733',
          fillOpacity: 0.3,
          strokeWeight: 1,
          clickable: true,
          editable: true,
          zIndex: 1
        })
        addPolygonListener(newPolygon, card)

      }

      function addPolygonListener(polygon, card){
        google.maps.event.addListener(polygon,'click', function(event){
          // debugger
          let polygonInfo = new google.maps.InfoWindow({
            content: card,
            position: {lat: polygon.latLngs.g[0].g[0].lat(), lng: polygon.latLngs.g[0].g[0].lng()}
          })
          polygonInfo.open(map)
          //
          let deleteButton = createPolygonCardDelete(polygon)
          card.append(deleteButton)
        })
        // addpDragListener(marker, wildfire, card)
      }


    }

  function handleLocationError(browserHasGeolocation, currentLocation, pos) {
    currentLocation.setPosition(pos);
    currentLocation.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
      currentLocation.open(map);
  }
