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

      // This var will be used to save the arrival station input and hand
      // the disabled state because the ng-disabled did not work fine.
      var arrivalStationElement = null;
      var submitElement = null;

      $timeout(function () {
        document.getElementById("departureStation").focus();
        arrivalStationElement = document.getElementById("arrivalStation");
        submitElement = document.getElementById("searchRoute");
      });

      ctrl.searchForm = {
        departureStation: Station.getLatestSearchedDepartureStation(),
        arrivalStation: Station.getLatestSearchedArrivalStation(),
        enableSearch: false
      };


      ctrl.searchDepartureStation = function () {
        var q = ctrl.searchForm.departureStation.name;
        if (q.length > 1) {
          Station
            .search(q)
            .then(function (stations) {
              ctrl.departureSationOptions = stations;

              // If the name of the station is valid then add the abbr to the departure
              // object and enable the departure field.
              if (stations.length && q === stations[0].name) {
                ctrl.searchForm.departureStation.abbr = stations[0].abbr;
                arrivalStationElement.disabled = false;
              } else {
                arrivalStationElement.disabled = true;
                submitElement.disabled = true;
                ctrl.searchForm.departureStation.abbr = '';
              }

            })
        }
      };

      /**
       * Get the possible destinations for a selected departure station.
       */
      ctrl.getPossibleDestination = function () {
        Station
          .getPossibleDestination(ctrl.searchForm.departureStation.abbr)
          .then(function (destinations) {
            ctrl.arrivalStationOptions = destinations;
          })
          .catch(function (message) {
            console.log(message);
          });
      };

        /**
         * Check if a selected destination is valid. otherwise show
         * the error to the user.
         */
      ctrl.checkPossibleDestination = function () {
        submitElement.disabled = true ;
        ctrl.arrivalStationOptions
          .forEach(function (station) {

            if (station.name == ctrl.searchForm.arrivalStation.name) {
              ctrl.searchForm.arrivalStation.abbr = station.abbr;
              submitElement.disabled = false;
              return true;
            }
          });
      };

      ctrl.getRouteInfo = function () {
        //Route.getRouteInfo(ctrl.searchForm);
      };
    }]);
