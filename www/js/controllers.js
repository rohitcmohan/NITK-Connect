angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $http, Constants, $ionicLoading, Shared, $localStorage, $timeout) {

  $scope.$storage = $localStorage;
  $scope.cut=moment().startOf('day').subtract(1,'millisecond');
  
  if (typeof $localStorage.favourite !== "undefined")
    $scope.favourite=$scope.$storage.favourite;
    
  else{
    $scope.$storage.favourite=[{name:'Live News', favourite : true},{name:'Student Council',favourite: true} ,{name:'IEEE',favourite: true },{name:'CSI',favourite: true } ,{name:'IE',favourite: true },{name:'ISTE' ,favourite: true },{name:'IET' ,favourite: true },{name:'LSD',favourite: true },{name:'Music Club',favourite: true },{name:'DDFC',favourite: true },{name:'Spic Macay',favourite: true }, {name:'Art & Design',favourite: true },{name:'Kannada Vedika' ,favourite: true },{name:'Rotaract',favourite: true },{name:'Robotics & Flying Club',favourite: true },{name:'Hobbies Club',favourite: true },{name:'E-Cell',favourite: true },{name:'Racing Club',favourite: true },{name:'Engineer',favourite: true },{name:'Incident',favourite: true },{name:'Talks and Seminars',favourite: true } ,{name:'College Sports',favourite: true }];
  }
//yes
  // if(typeof analytics !== 'undefined')
  //   analytics.TrackerView('Tracking the AppCtrl');  

  $scope.doRefresh = function() {

    if (typeof $localStorage.favourite !== "undefined")
      $scope.favourite=$scope.$storage.favourite;
    
    else
         $scope.$storage.favourite=[{name:'Live News', favourite : true},{name:'Student Council',favourite: true} ,{name:'IEEE',favourite: true },{name:'CSI',favourite: true } ,{name:'IE',favourite: true },{name:'ISTE' ,favourite: true },{name:'IET' ,favourite: true },{name:'LSD',favourite: true },{name:'Music Club',favourite: true },{name:'DDFC',favourite: true },{name:'Spic Macay',favourite: true }, {name:'Art & Design',favourite: true },{name:'Kannada Vedika' ,favourite: true },{name:'Rotaract',favourite: true },{name:'Robotics & Flying Club',favourite: true },{name:'Hobbies Club',favourite: true },{name:'E-Cell',favourite: true },{name:'Racing Club',favourite: true },{name:'Engineer',favourite: true },{name:'Incident',favourite: true },{name:'Talks and Seminars',favourite: true } ,{name:'College Sports',favourite: true }];
         
    console.log('refresh1');
    
    if (typeof $localStorage.store == "undefined")
      $localStorage.store = []
    
    if (typeof $localStorage.store[0] !== "undefined")
      last_date = new Date($localStorage.store[0].created_at).getTime();
    else
      last_date = 0;

    console.log("last_date");
    console.log(last_date);
    console.log($localStorage.store);
    $ionicLoading.show({ template: "Loading...", showBackdrop: true, duration: 2000 });

    $.ajax({
        type: "GET",
        async: false,
        url: Constants.baseUrl + '/api/list?after=' + String(Math.round(last_date))
    })
     .success(function(response,status) {
       res = response;
       console.log(res);
       Shared.addList(response);
       $.each(res.reverse(), function( i, n ){
          $localStorage.store.unshift(n);
       });
       console.log(res);
     })

    $scope.$broadcast('scroll.refreshComplete'); 

    console.log('dataxz', res);
    $scope.$storage = $localStorage.$default({
            store: res
    });

   $scope.articles=$scope.$storage.store;
    $scope.number=0;
    var j=0;
    for(var i=0;i<$scope.$storage.store.length;i++){
      if($scope.$storage.store[i].event){
        if($scope.cut.isBefore($scope.$storage.store[i].event_start))
          $scope.number+=1;
      }
    }
};
 
  $scope.articles=$scope.$storage.store;
  $scope.number=0;
    var j=0;
    for(var i=0;i<$scope.$storage.store.length;i++){
      if($scope.$storage.store[i].event){
        if($scope.cut.isBefore($scope.$storage.store[i].event_start))
          $scope.number+=1;
      }
    }

  var toUTCDate = function(date){
    var _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    return _utc;
  };
  
  var from = function(date){
    var time=moment.utc(date).fromNow();
    return time;
  }

  var millisToUTCDate = function(millis){
    return toUTCDate(new Date(millis));
  };
  
    $scope.from = from;
    $scope.toUTCDate = toUTCDate;
    $scope.millisToUTCDate = millisToUTCDate;

  $scope.title = 'Home';
 
  $scope.articles=$scope.$storage.store;
  
   $scope.hideSidemenuBackButton = true;
    var topLevelCategories;

    topLevelCategories = $scope.categories = [
      {id: 1, title: 'Live News', taxons: [], is_first_level: true},
      {id: 2, title: 'Student Council', taxons: [], is_first_level: true},
      //{id: 2, title: 'Administration', taxons: [], is_first_level: true},
      {id: 3, title: 'Technical Clubs', taxons: [
        {id: 31, title: 'IEEE', taxons: [], is_first_level: false},
        {id: 32, title: 'CSI', taxons: [], is_first_level: false},
        {id: 33, title: 'IE', taxons: [], is_first_level: false},
        {id: 34, title: 'ISTE', taxons: [], is_first_level: false},
        {id: 35, title: 'IET', taxons: [], is_first_level: false}
      ], is_first_level: true},
      {id: 4, title: 'Cultural Clubs', taxons: [
        {id: 47, title: 'LSD', taxons: [], is_first_level: false},
        {id: 41, title: 'Music Club', taxons: [], is_first_level: false},
        {id: 42, title: 'DDFC', taxons: [], is_first_level: false},
        {id: 44, title: 'Spic Macay', taxons: [], is_first_level: false},
        {id: 45, title: 'Art & Design', taxons: [], is_first_level: false},
        {id: 46, title: 'Kannada Vedika', taxons: [], is_first_level: false}
        ], is_first_level: true},
    {id: 5, title: 'Special Interest Clubs', taxons: [
        {id: 51, title: 'Rotaract Club', taxons: [], is_first_level: false},
        {id: 55, title: 'Robotics and Flying Club', taxons: [], is_first_level: false},
        {id: 52, title: 'Hobbies Club', taxons: [], is_first_level: false},
        {id: 53, title: 'E-Cell', taxons: [], is_first_level: false},
        {id: 54, title: 'Racing Club', taxons: [], is_first_level: false}
      ], is_first_level: true},
      //{id: 6, title: 'First Year Students', taxons: [], is_first_level: true},
      {id: 7, title: 'Engineer', taxons: [], is_first_level: true},
      {id: 8, title: 'Incident', taxons: [], is_first_level: true},
      {id: 9, title: 'Talks and Seminars ', taxons: [], is_first_level: true},
      {id: 10, title: 'College Sports', taxons: [], is_first_level: true},
      {id: 11, title: 'Miscellaneous', taxons: [], is_first_level: true}
    ];

    var getByParentId = function(id) {
      for (var i in topLevelCategories) {
        if (topLevelCategories[i].id == id) {
          $scope.title = topLevelCategories[i].title;
          return topLevelCategories[i].taxons;
        }
      }
    }

    $scope.toggleCategories = function() {
        $scope.sideMenuController.toggleLeft();
    };

    $scope.showSubcategories = function(category) {
        $scope.categories = getByParentId(category.id);
        $scope.hideSidemenuBackButton = false;
    };

    $scope.showTopLevelCategories = function () {
        $scope.categories = topLevelCategories;
        $scope.title = 'Categories';
        $scope.hideSidemenuBackButton = true;
    };
    // End of subcategories
})

.controller('CategoryCtrl', function($scope, $stateParams, Constants, $sce, Shared, $localStorage, $timeout) {
  
  $scope.articles=[];

  $scope.doRefresh = function() {

    console.log('refresh2');
    if (typeof $localStorage.store == "undefined")
      $localStorage.store = [];

    if (typeof $localStorage.store[0] !== "undefined")
      last_date = new Date($localStorage.store[0].created_at).getTime();       
    else
      last_date = 0;
    
    console.log("last_date");
    console.log(last_date);
    console.log($localStorage.store);
    $ionicLoading.show({ template: "Loading...", showBackdrop: true, duration: 2000 });
    $.ajax({
        type: "GET",
        async: false,
        url: Constants.baseUrl + '/api/list?after=' + String(Math.round(last_date))
    })
     .success(function(response,status) {
       res = response;
       console.log(res);
       Shared.addList(response);
       $.each(res.reverse(), function( i, n ){
          $localStorage.store.unshift(n);
       });
       console.log(res);
     })

    $scope.$broadcast('scroll.refreshComplete'); 

    console.log('dataxz', res);
    $scope.$storage = $localStorage.$default({
            store: res
    });

  $scope.number=0;
  var j=0;
  for(var i=0;i<$scope.$storage.store.length;i++){
    if(!($scope.$storage.store[i].category).localeCompare($stateParams.categoryName)){
      $scope.articles[j++]=$scope.$storage.store[i];
      if($scope.$storage.store[i].event){
        if($scope.cut.isBefore($scope.$storage.store[i].event_start))
          $scope.number+=1;
      }
    }
  }
};
  console.log('param',$stateParams);

  $scope.number=0;
   var j=0,k=0;
   for(var i=0;i<$scope.$storage.store.length;i++){
 
      if(!($scope.$storage.store[i].category).localeCompare($stateParams.categoryName)){
        $scope.articles[j++]=$scope.$storage.store[i];
        if($scope.$storage.store[i].event){
          if($scope.cut.isBefore($scope.$storage.store[i].event_start))
            $scope.number+=1;
          }
       }
   }
  console.log("number",$scope.number);
  console.log('success',$scope.articles);
  $scope.title = $stateParams.categoryName;
  $scope.restaurant_id = 1;
  var coupon_id = 1;
  if (!(typeof $stateParams.restaurant_id === 'undefined'))
    $scope.restaurant_id = parseInt($stateParams.restaurant_id);
  if (!(typeof $stateParams.coupon_id === 'undefined'))
    coupon_id = parseInt($stateParams.coupon_id);
  // $scope.articles=$scope.result;
  console.log('param',$stateParams);

  $scope.res=[];

  $scope.restaurants = [
    {
      id: 1,
      name: 'Important Contacts',
      coupons: $scope.res
    },{
      id: 2,
      name: 'Utilities',
      coupons:$scope.res
    },{
      id: 3,
      name: 'Food Joints',
      coupons:$scope.res
    },{
      id: 4,
      name: 'Map',
      coupons:$scope.res
    },{
      id: 5,
      name: 'Others',
      coupons:$scope.res
    }
  ];
  $scope.content="";
  $scope.res_title = $scope.restaurants[$scope.restaurant_id-1].name;
  j=0,k=0;
     for(var i=0;i<$scope.$storage.store.length;i++){
      if(!($scope.$storage.store[i].category).localeCompare("Coupons")){
        console.log($scope.$storage.store[i].author);
        if(!($scope.$storage.store[i].author).localeCompare($scope.res_title)){
          console.log('res',$scope.res_title);
          $scope.res[j++]=$scope.$storage.store[i];
          $scope.content=$sce.trustAsHtml($scope.$storage.store[i].content);
          if($scope.res[j-1].image_url.localeCompare(null))
            $scope.url=Constants.baseUrl+$scope.res[j-1].image_url;
        }
      }else{
       if(!($scope.$storage.store[i].category).localeCompare($stateParams.categoryName)){
         $scope.articles[k++]=$scope.$storage.store[i];
        } 
      }
    }

    for(i=0;i<$scope.restaurants.length;i++)
    {
      $scope.restaurants[i].coupons=$scope.res;
    }

  console.log('res',$scope.res);
  console.log('success',$scope.articles);

  $scope.coupon_list = $scope.restaurants[$scope.restaurant_id-1].coupons;

})

.controller('ArticleCtrl', function($scope, $stateParams, Constants, $sce, Shared, $timeout) {

  $scope.id = $stateParams.articleId;
  $scope.articles=[];
  $scope.articles=$scope.$storage.store;
   for(var i=0; i< ($scope.articles).length;i++){
    if($scope.articles[i].id==$stateParams.articleId){  
    $scope.title=$scope.articles[i].title;
    $scope.content = $sce.trustAsHtml($scope.articles[i].content);
    
     if($scope.articles[i].image_url.localeCompare(null)){
      $scope.url=Constants.baseUrl+$scope.articles[i].image_url;
      }
    }
  }
})

.controller('LiveCtrl',function($scope, $stateParams, $sce, Constants, $ionicLoading, $localStorage, $timeout) {
  
  $scope.liveArticles=[];
  $scope.storage=$localStorage;

  $scope.doRefreshLive = function() {
    console.log('refreshing');

    if (typeof $localStorage.store[0] != "undefined") {
      last_date = new Date($localStorage.store[0].created_at).getTime()/1000.0;
    } else { 
      last_date = 0;
    }
    console.log("app.js");
    console.log(Constants.baseUrl + '/api/list?after=' + Math.round(new Date(last_date)));
    // console.log(Constants.baseUrl + "/api/list?after=\"" + last_date + "\"");
    $ionicLoading.show({ template: "Loading...", showBackdrop: true, duration: 2000 });

    $.ajax({
        type: "GET",
        async: false,
        url: Constants.baseUrl + '/api/list?after=' + String(last_date)
      })
     .success(function(response,status) {
       res = response;
       if (last_date==0)
          $localStorage.store = [];
       // Store newer articles at the start of the array
       $.each(res.reverse(), function( i, n ){
          $localStorage.store.unshift(n);
       });
     })
     console.log('data',res);
     $localStorage.$default({
          store: res
      });

     $scope.storage = $localStorage;
     console.log($scope.storage);
  $scope.title_list=[];
  
  var j=0,k=0;
  for(var i=0;i<$scope.$storage.store.length;i++){
    if(!($scope.$storage.store[i].category).localeCompare("Live News")){
        $scope.liveArticles[j++]=$scope.$storage.store[i];
        $scope.title_list[k++]=$scope.$storage.store[i].title;
        if(typeof $scope.liveArticles[j-1].content === String)
          $scope.liveArticles[j-1].content = $sce.trustAsHtml($scope.storage.store[i].content);
      }
    }

  $scope.unique=[];
  $scope.unique = $scope.title_list.filter(function(item, i, title_list){ return title_list.indexOf(item) === i; });

    $scope.cut=moment().startOf('day').subtract(1,'millisecond');
    console.log('livti',$scope.title_list);
    console.log('live refresh');
    
  };

  if(typeof $stateParams.title === 'undefined'){
    console.log("call");
    $ionicLoading.show({ template: "Loading...", showBackdrop: true, duration: 2000 });
    $scope.doRefreshLive();
  }

  title_list=[];
  var j=0,k=0;
  for(var i=0;i<$scope.$storage.store.length;i++){
    if(!($scope.$storage.store[i].category).localeCompare("Live News")){
      title_list[k++]=$scope.$storage.store[i].title;
    }
  }
  
  k=0;
  console.log("state",$stateParams);
  for(var i=0;i<$scope.$storage.store.length;i++){
    if(!($scope.$storage.store[i].title).localeCompare($stateParams.title)){
      $scope.liveArticles[j++]=$scope.$storage.store[i];
      console.log($scope.liveArticles[j-1]);
      if(typeof $scope.liveArticles[j-1].content === String)
          $scope.liveArticles[j-1].content = $sce.trustAsHtml($scope.storage.store[i].content);
    }
  }

  $scope.unique=[];
  $scope.unique = title_list.filter(function(item, i, title_list){ return title_list.indexOf(item) === i; });
  $scope.cut=moment().startOf('day').subtract(1,'millisecond');
  console.log('livet',$scope.unique);
})

.controller('settingsCtrl',function($scope, Constants, $localStorage, $timeout, $ionicLoading) {

  $scope.$storage = $localStorage;
  $scope.categories=$scope.$storage.favourite;
  console.log($scope.categories);
  console.log("fav b",$localStorage.favourite);

  var regID=window.localStorage.getItem("reg");
  $scope.fav=[];
  
  var i=0,k=0;
  for(i=0;i<($localStorage.favourite).length;i++){
    if($localStorage.favourite[i].favourite)
      $scope.fav[k++]=i+1;
  }
  
  jsonarr={
      "reg": regID,
      "favourite": $scope.fav
    };

  console.log(jsonarr);

  $scope.send = function(){

    $ionicLoading.show({ template: "Favourites Saved", noBackdrop: true, duration: 2000 });
    
    $scope.categories=$localStorage.favourite;

    $scope.fav=[];
  
    var i=0,k=0;
    for(i=0;i<($localStorage.favourite).length;i++){
    if($localStorage.favourite[i].favourite)
      $scope.fav[k++]=i+1;
    }
    
    jsonarr={
      "reg": regID,
      "favourite": $scope.fav
    };
    console.log(jsonarr);

    console.log("send");
    $.ajax({
      type: 'POST',
      url: "http://106.186.23.15:8080",
      data: jsonarr,
      datatype: 'json',
      success: function (data) {
        var ret = jQuery.parseJSON(data);
        $('#q').html(ret.msg);
      },
      error: function (xhr, status, error) {}
    })
  }
  console.log("fav af",$localStorage.favourite);

})