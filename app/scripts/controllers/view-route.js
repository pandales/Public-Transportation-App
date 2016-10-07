'use strict';

/**
 * @ngdoc function
 * @name publicTransportationApp.controller:ViewRouteCtrl
 * @description
 * # ViewRouteCtrl
 * Controller of the publicTransportationApp
 */
angular.module('publicTransportationApp')
  .controller('ViewRouteCtrl', ['$timeout', 'Station',
    function ($timeout, Station) {
    var ctrl = this;

    $timeout(function () {
      document.getElementById("departureStation").focus();
    });
    ctrl.searchForm = {
      departureStation: Station.getLatestSearchedDepartureStation(),
      arrivalStation: Station.getLatestSearchedArrivalStation()
    };


    ctrl.searchDepartureStation = function () {
      if (ctrl.searchForm.departureStation.name.length > 1) {
        Station
          .search(ctrl.searchForm.departureStation.name).then(function (stations) {
          ctrl.departureSationOptions = stations;
        })
      }
    };

    ctrl.searchArrivalStation = function () {
      if (ctrl.searchForm.arrivalStation.name.length > 1) {
        Station
          .search(ctrl.searchForm.arrivalStation.name).then(function (stations) {
          ctrl.arrivalStationOptions = stations;
        })
      }
    };

    ctrl.getPossibleArrivals = function () {
      Station.getPossibleArrivals(ctrl.searchForm.departureStation.name).then(function (stations) {

      });
    };

    ctrl.getRouteInfo = function () {
      //Route.getRouteInfo(ctrl.searchForm);
    };
  }]);
