# Wildfire Tracker
A Google Maps-Based Javascript web app that tracks U.S. wildfires in near real-time

## Navigation
[Using Wildfire Tracker](#using-wildfire-tracker)</br>
  • [Project Setup on the Google Cloud Platform](#project-setup-on-the-google-cloud-platform)</br>
      • [Creating a Google Cloud Project](#creating-a-google-cloud-project)</br>
      • [Choosing a Google Maps Products Suite](#choosing-a-google-maps-products-suite)</br>
      • [Getting an API Key](#getting-an-api-key)</br>
  </br>
[Technologies Used](#technologies-used)</br>


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

## Technologies Used
  ### Backend:
   • Ruby on Rails</br>
   • Postgres

### Frontend :
   • Vanilla Javascript</br>
   • [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial)</br>
   • [Bootstrap](https://getbootstrap.com/) CDN

## Contributing
Pull requests, bug alerts, and recommendations for new features are always welcome!
