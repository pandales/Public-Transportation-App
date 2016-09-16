/**
 * @ngdoc function
 * @name publicTransportationApp.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 * Controller of the publicTransportationApp
 */
angular.module('publicTransportationApp')
  .controller('ScheduleCtrl', ['$timeout', 'Station', function ($timeout, Station) {
    'use strict';

    var ctrl = this;

    ctrl.stations = {};

    $timeout(function () {
      document.getElementById("stationName").focus();
    });

    ctrl.searchStation = function () {
      if (ctrl.searchForm.station.length > 1) {
        ctrl.stations = Station
          .search(ctrl.searchForm.station);
      }
    };

    ctrl.getStationInfo = function () {
      Station.getStationRTInfo(ctrl.searchForm.station)
        .then(function (info) {
          console.log(info);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }]);
