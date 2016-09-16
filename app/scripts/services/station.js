'use strict';

/**
 * @ngdoc service
 * @name publicTransportationApp.Station
 * @description
 * # Station
 * Service in the publicTransportationApp.
 */
angular.module('publicTransportationApp')
  .service('Station', ['$http', '$localstorage', function ($http, $localstorage) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var stations = $localstorage.getObject('stations') || [];

    return {
      getAll: function () {

        if (stations) {
          return Promise.resolve(storedStations);
        }
        else {

          return $http({
            method: 'GET',
            url: 'http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V'
          })
            .then(function (response) {
              stations = response.data.root.stations.station;
              $localstorage.setObject('stations', stations);

              return stations;
            });
        }

      },
      search: function (q) {

        return stations.filter(function (station) {

          if (station.name.toLowerCase().indexOf(q.toLowerCase()) >= 0) {

            return station;
          }
        });
      },

      getStationAbbreviations: function (stationName) {
        var station = stations.filter(function (item) {

          if (item.name == stationName) {
            return item.abbr;
          }
        });

        return station.length ? station[0].abbr : null;
      },

      getStationRTInfo: function (stationName) {
        var stationAbbr = this.getStationAbbreviations(stationName);

        if (!stationAbbr) {
          return Promise.reject("The station that you required does not have data available");
        }

        return $http({
          method: 'GET',
          url: 'http://api.bart.gov/api/etd.aspx?cmd=etd&key=MW9S-E7SL-26DU-VV8V&orig=' + stationAbbr
        }).then(function (response) {
          return new Promise(function (resolve, reject) {
            if (response.data.root.station) {
              resolve(response.data.root.station);
            } else {
              reject(response.data.root.message);
            }
          });
        });
      }
    }
  }]);
