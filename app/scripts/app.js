'use strict';

/**
 * @ngdoc overview
 * @name publicTransportationApp
 * @description
 * # publicTransportationApp
 *
 * Main module of the application.
 */
angular
  .module('publicTransportationApp', [
    'ngMaterial',
    'ui.router',
    'ngMessages',
    'xml'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
          .then(function (registration) {
            console.log(registration);
          })
          .catch(function (m) {
            console.log(m)
          });

      } else {
        console.log("this browser does NOT support service worker");
      }

      // Convert xml responses to json
      $httpProvider.interceptors.push('xmlHttpInterceptor');

      $urlRouterProvider.otherwise("/");

      $stateProvider
        .state('schedule', {
          'url': '/',
          templateUrl: 'views/schedule.html',
          controller: 'ScheduleCtrl',
          controllerAs: 'ctrl'
        })

        .state('view-route', {
          'url': '/view-route',
          templateUrl: 'views/view-route.html',
          controller: 'ViewRouteCtrl',
          controllerAs: 'ctrl'
        })
      ;
    }]);

