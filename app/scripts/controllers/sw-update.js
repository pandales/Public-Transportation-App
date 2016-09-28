'use strict';

/**
 * @ngdoc function
 * @name publicTransportationApp.controller:SwUpdateCtrl
 * @description
 * # SwUpdateCtrl
 * Controller of the publicTransportationApp
 */
angular.module('publicTransportationApp')
  .controller('SwUpdateCtrl', ['$scope', '$mdToast', function ($scope, $mdToast) {
    $scope.closeToast = function () {
      $mdToast
        .hide();
    };

    $scope.updateSw = function () {
      console.log("test");
    };
  }]);
