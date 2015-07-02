'use strict';

angular.module('pushNotify',['ngStorage', 'starter'])
  .factory('phonegapReady', function ($rootScope, $q, $localStorage) {
      var loadingDeferred = $q.defer();

      document.addEventListener('deviceready', function () {
        $rootScope.$apply(loadingDeferred.resolve);
      });

      return function phonegapReady() {
        return loadingDeferred.promise;
      };
    })
  .factory('pushNotification', function (phonegapReady,$localStorage) {
    return {
      registerPush: function (fn) {
        phonegapReady().then(function () {
          var pushNotification = window.plugins.pushNotification,
              successHandler = function (result) {
                  //alert('result = ' + result);
              },
              errorHandler = function (error) {
                  //alert('error = ' + error);
              },
              tokenHandler = function (result) {
                  return fn({
                    'type': 'registration',
                    'id': result,
                    'device': 'ios'
                  });
                };
          if ( device.platform == 'android' || device.platform == 'Android') {
              pushNotification.register(successHandler, errorHandler, {
                            'senderID': '71949421937',
                            'ecb': 'onNotificationGCM'
                          });
          } else {
              pushNotification.register(
                  tokenHandler,
                  errorHandler,
                  {
                      "badge":"true",
                      "sound":"true",
                      "alert":"true",
                      "ecb":"onNotificationAPN"
                  });
          }
        });
      }
    };    
  });
