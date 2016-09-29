'use strict';

/**
 * @ngdoc function
 * @name publicTransportationApp.controller:SwUpdateCtrl
 * @description
 * # SwUpdateCtrl
 * Controller of the publicTransportationApp
 */
angular.module('publicTransportationApp')
  .controller('SwUpdateCtrl', [
    '$scope',
    '$mdToast',
    'serviceWorkerHandler',

    function ($scope, $mdToast, serviceWorkerHandler) {
    $scope.closeToast = function () {
      $mdToast
        .hide();
    };

    $scope.updateSw = function () {
      serviceWorkerHandler.update();
    };
  }]);
