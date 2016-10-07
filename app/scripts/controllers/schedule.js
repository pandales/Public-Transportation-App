/**
 * @ngdoc function
 * @name publicTransportationApp.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 * Controller of the publicTransportationApp
 */
angular.module('publicTransportationApp')
  .controller('ScheduleCtrl', [
    '$timeout',
    'Station',

    function ($timeout, Station) {
      'use strict';

      var ctrl = this;

      ctrl.stations = {};
      ctrl.searchForm = {
        latestSearchedStation: Station.getLatestSearchedStation(),
        searchAttempts: 0
      };


      $timeout(function () {
        document.getElementById("stationName").focus();
      });

      ctrl.searchStation = function () {
        if (ctrl.searchForm.station.name.length > 1) {
          Station
            .search(ctrl.searchForm.station.name).then(function (stations) {
            ctrl.stations = stations;
          })
        }
      };

      ctrl.getStationInfo = function () {
        Station.getStationRTInfo(ctrl.searchForm.station.name)
          .then(function (info) {

            ctrl.searchForm.latestSearchedStation = info;
            console.log(ctrl.searchForm.latestSearchedStation);
            ctrl.searchForm.searchAttempts++;
          })
          .catch(function (error) {
            ctrl.searchForm.latestSearchedStation = null;
            ctrl.searchForm.searchAttempts++;
            console.log(error);
          });
      }
    }]);
