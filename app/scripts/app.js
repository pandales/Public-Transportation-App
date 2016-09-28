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
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    '$mdToastProvider',
    'serviceWorkerProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider,
              $mdToastProvider, serviceWorkerProvider) {

      $mdToastProvider.addPreset('SwUpdate', {
        options: function() {
          return {
            hideDelay   : 0,
            position    : 'bottom right',
            controller  : 'SwUpdateCtrl',
            templateUrl : 'views/elements/toast-sw.update.html'
          };
        }
      });

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

