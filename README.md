# Wildfire Tracker
A Google Maps-Based Javascript web app that tracks U.S. wildfires in near real-time

## ReadMe Navigation
[Using Wildfire Tracker](#using-wildfire-tracker)</br>
   - [Project Setup on the Google Cloud Platform](#project-setup-on-the-google-cloud-platform)</br>
      - [Creating a Google Cloud Project](#creating-a-google-cloud-project)</br>
      - [Choosing a Google Maps Products Suite](#choosing-a-google-maps-products-suite)</br>
      - [Getting an API Key](#getting-an-api-key)</br>
      - [Enabling Project Billing](#enabling-project-billing)</br>
   - [Using this Repository](#using-this-repository)</br>

[Features](#features)</br>
   - [Create a new Wildfire Point](#create-a-new-wildfire-point)</br>
   - [Edit a Wildfire Point Location](#edit-a-wildfire-point-location)</br>
   - [Delete a Wildfire Point](#delete-a-wildfire-point)</br>
   - [Create a Wildfire Polygon](#create-a-wildfire-polygon)

[Technologies Used](#technologies-used)</br>

[Contributing](#contributing)


## Using Wildfire Tracker

### Project Setup on the Google Cloud Platform
Before using Wildfire Tracker, you'll need to generate a personal Google Maps API key by completing the following steps:
1. Create a Google Maps project on the Google Cloud Platform
2. Choose a suite of Google Maps products to apply to the project
3. Get an API key
4. Enable project billing

#### Creating a Google Cloud Project
Create an account on the Google Cloud Platform. To then add a new project to you account, navigate to the projects dropdown on the main page, </br>
![Image](https://github.com/lukemenard/Wildfire-Tracker/blob/master/Wildfire-Tracker/Assets/Images/Image1.png) </br>
</br>
click the "New Project" button on the subsequent screen, </br>
</br>
![Image](https://github.com/lukemenard/Wildfire-Tracker/blob/master/Wildfire-Tracker/Assets/Images/Image2.png) </br>
</br>
and give the new project a name (with the option of assigning it to an organizational folder). </br>
</br>
![Image](https://github.com/lukemenard/Wildfire-Tracker/blob/master/Wildfire-Tracker/Assets/Images/Image3.png) </br>

#### Choosing a Google Maps Products Suite
The Google Maps JavaScript API offers three distinct sets of products and tools that a developer can apply to a project in their Cloud Platform:

  • **Maps**: give the developer the ability to add interactive maps to an application that include Street View imagery and 360-degree panoramas.</br>
  • **Routes**: allow your user to determine the most efficient path from one point to another. The Routes package also provides navigation and real-time traffic updates.</br>
  • **Places**: allows the user to find specific locations using phone numbers and addresses. The Places package includes additional APIs that provide the capacity to geocode addresses to specific coordinates and return the location of a device using cell tower and WiFi node data.</br>

Apply both the Maps and Places packages to utilize Wildfire Tracker.

#### Getting an API Key
To render a map in the application, you'll first need to generate an API key specific to your Google Cloud account and project. To create a new API key, navigate back to the [Google Cloud Platform](https://cloud.google.com/console/google/maps-apis/overview). Within the hamburger menu, select the "Credentials" option in the "APIs & Services" menu.</br>
</br>
![Image](https://github.com/lukemenard/Wildfire-Tracker/blob/master/Wildfire-Tracker/Assets/Images/Image4.png)</br>
</br>
Choosing the "Create credentials" dropdown on the subsequent page and selecting "API key" generates a unique key.</br>
</br>
![Image](https://github.com/lukemenard/Wildfire-Tracker/blob/master/Wildfire-Tracker/Assets/Images/Image5.png)</br>
</br>

#### Enabling Project Billing
The Google Maps JavaScript API requires you to enter credit card information and acknowledge a billing policy before enabling the use of products in an application. Total monthly billing for a project is determined by both the Google Maps products utilized, as well as application usage.

### Using this Repository
1. Install [ruby](https://www.ruby-lang.org/en/documentation/installation/). 
   - See if Ruby is already installed locally by running `Ruby -v` in your command line. If it is installed, you will see a version number.

2. Navigate to 'backend' within the Wildfire Tracker directory in your terminal, and run each of the following commands to create and populate a database with current wildfire point data and run a backend rails server:
   - `bundle`
   - `rails db:create`
   - `rails db:migrate`
   - `rails db:seed`
   - `rails s`
 
 3. In a text editor, navigate to the index.html in the 'frontend' folder and enter your [personal Google Maps API key](#getting-an-api-key) in the code placeholder:</br>
 ```<script async defer src="https://maps.googleapis.com/maps/api/js?key={YOUR API KEY HERE}callback=initMap&libraries=drawing" type="text/javascript"></script>```
 
 4. In a new terminal window, navigate to 'frontend' in the Wildfire Tracker directory and run the followiing commands to install and deploy lite-server locally:
    - `npm install -g lite-server`
    - `lite-server`

## Features
Upon rendering, the map will automatically georeference to your current location. </br>
### Create a new Wildfire Point
Double-click anywhere on the map to open an info window. Enter relevant wildfire details and click "Create New Wildfire" to generate a new, persistent wildfire point.</br></br>
![Image](https://github.com/lukemenard/Wildfire-Tracker/blob/master/Wildfire-Tracker/Assets/Images/Image6.png)</br>
### Edit a Wildfire Point Location
Drag a wildifire point to edit its lat/long in real-time.</br></br>
![Image](https://github.com/lukemenard/Wildfire-Tracker/blob/master/Wildfire-Tracker/Assets/Images/Gif1.gif)</br>
### Delete a Wildfire Point
Click an existing wildfire point and select "Delete Wildfire" to both pessimistically and optimistically delete a wildfire.</br></br>

### Create a Wildfire Polygon
Choose the polygon icon from the Google Maps drawing manager. Click the map to create individual polygon vertices at your chosen lat/longs. Click your original vertex to complete the polygon. Enter relevant wildfire details in the info window and create the new, persistent polygon.</br></br>
![Image](https://github.com/lukemenard/Wildfire-Tracker/blob/master/Wildfire-Tracker/Assets/Images/Gif2.gif)</br>

## Technologies Used
  ### Backend:
   • Ruby on Rails</br>
   • Postgres

### Frontend:
   • Vanilla Javascript</br>
   • [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial)</br>
   • [Bootstrap](https://getbootstrap.com/) CDN

## Contributing
Pull requests, bug alerts, and recommendations for new features are always welcome!
