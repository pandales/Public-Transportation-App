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
    'ngMessages'
  ])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {


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

