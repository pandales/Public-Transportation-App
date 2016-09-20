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

    var latestSearchedStation = $localstorage.getObject('latestSearchedStation') || {'name':''};
    var stations = $localstorage.getObject('stations') || null;
    if (!stations) {
      $http({
        method: 'GET',
        url: 'https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V'
      })
        .then(function (response) {
          stations = response.data.root.stations.station;
          $localstorage.setObject('stations', stations);

          return stations;
        });
    }

    return {
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
        var self = this;
        var stationAbbr = this.getStationAbbreviations(stationName);
        if (!stationAbbr) {
          return Promise.reject("The station that you required does not have data available");
        }

        return $http({
          method: 'GET',
          url: 'https://api.bart.gov/api/etd.aspx?cmd=etd&key=MW9S-E7SL-26DU-VV8V&orig=' + stationAbbr
        }).then(function (response) {

          return new Promise(function (resolve, reject) {

            if (response.data.root.station) {
              var stationData = self.transformStationData(response.data.root.station);
              latestSearchedStation = stationData;
              $localstorage.setObject('latestSearchedStation', stationData);
              resolve(stationData);
            } else {
              reject(response.data.root.message);
            }
          });
        });
      },

      getLatestSearchedStation: function () {
        return latestSearchedStation;
      },

      transformStationData: function (stationInfo) {
        var platforms = [];
        stationInfo.etd.forEach(function (destination) {
          destination.estimate.forEach(function (estimate) {
            var platformNumber = estimate.platform;
            var destinationAbbr = destination.abbreviation;


            if (!platforms[platformNumber]) {
              platforms[platformNumber] = {};
              platforms[platformNumber][destinationAbbr] = [];
            }
            else if (!platforms[platformNumber][destinationAbbr]) {
              platforms[platformNumber][destinationAbbr] = [];
            }
            estimate["destination"] = destination.destination;
            platforms[platformNumber][destinationAbbr].push(estimate);

          });
        });
        stationInfo.infoByPlatforms = platforms;
        return stationInfo;
      }
    }
  }]);
