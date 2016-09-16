'use strict';

/**
 * @ngdoc function
 * @name publicTransportationApp.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 * Controller of the publicTransportationApp
 */
angular.module('publicTransportationApp')
  .controller('ScheduleCtrl', ['$timeout', function ($timeout) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $timeout(function(){
      document.getElementById("stationName").focus();
    });
  }]);
