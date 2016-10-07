'use strict';

/**
 * @ngdoc service
 * @name publicTransportationApp.Route
 * @description
 * # Route
 * Factory in the publicTransportationApp.
 */
angular.module('publicTransportationApp')
  .factory('Route', ['$http', '$localstorage', 'idb',
    function ($http, $localstorage, idbService) {
      var dbPromise = idbService.getDBPromise();

      return {
        getRouteInfo: function (searchedStations) {
          //http://api.bart.gov/api/sched.aspx?cmd=routesched&route=6&key=MW9S-E7SL-26DU-VV8V
          console.log(searchedStations);
          var departureName = searchedStations.departureStation.name;
          var arrivalName = searchedStations.arrivalStation.name;
          var stationsAbbrPromises = [];

          return dbPromise.then(function (db) {
            var tx = db.transaction('station');
            stationsAbbrPromises.push(tx.objectStore('station').index('by-name').getKey(departureName));
            stationsAbbrPromises.push(tx.objectStore('station').index('by-name').getKey(arrivalName));

            return Promise.all(stationsAbbrPromises).then(function (stationsAbbr) {
              console.log(values);
            });

          });
        }
      };
    }]);
