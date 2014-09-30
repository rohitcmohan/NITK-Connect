// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.service('Constants', function($http) {
  baseUrl = 'http://nitk-connect.herokuapp.com/' //Change for correct URL
  this.getRequest = function(url) {
    //Check if this.Url gives correct url
      $http.get(baseUrl + 'url').then(function(resp) {
    console.log('Success', resp);
    // For JSON responses, resp.data contains the result
    $scope.result = resp.data
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
  }

  this.postRequest =  function(url) {
  $http.post(baseUrl + 'url').then(function(resp) {
    console.log('Success', resp);
    // For JSON responses, resp.data contains the result
    $scope.result = resp.data
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
}
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.articles', {
      url: "/articles",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: 'AppCtrl'
        }
      }
    })

    .state('app.list', {
      url: "/category/:categoryName",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: 'CategoryCtrl'
        }
      }
    })

    .state('app.article', {
      url: "/article/:articleId",
      views: {
        'menuContent' :{
          templateUrl: "templates/article.html",
          controller: 'ArticleCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/articles');
});