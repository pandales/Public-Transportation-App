'use strict';

/**
 * @ngdoc service
 * @name publicTransportationApp.Station
 * @description
 * # Station
 * Service in the publicTransportationApp.
 */
angular.module('publicTransportationApp')
  .service('Station', ['$http', '$localstorage', 'idb',
    function ($http, $localstorage, idbService) {
      var dbPromise = idbService.getDBPromise();
      var latestSearchedStation = $localstorage.getObject('latestSearchedStation') || {'name': ''};
      var stations = $localstorage.getObject('stations') || null;

      if (!stations) {
        $http({
          method: 'GET',
          url: 'https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V'
        })
          .then(function (response) {
            stations = response.data.root.stations.station;
            //$localstorage.setObject('stations', stations);
            // Add stations to the Index DB.
            dbPromise.then(function (db) {
              var tx = db.transaction('station', 'readwrite');
              var stationStore = tx.objectStore('station');
              stations.forEach(function (station) {
                stationStore.put(station);
              });

              return tx.complete;
            });
            return stations;
          });
      }

      return {
        search: function (q) {
          return dbPromise.then(function (db) {
            var tx = db.transaction('station');
            var nameIndex = tx.objectStore('station').index('by-name');

            return nameIndex.getAll().then(function (stations) {

              return stations.filter(function (station) {

                if (station.name.toLowerCase().indexOf(q.toLowerCase()) >= 0) {

                  return station;
                }
              });
            });
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
                $localstorage.setObject('latestSearchedStation', latestSearchedStation);
                // Add the RTInfo to the databse
                dbPromise.then(function (db) {
                  var rtinfoStore = db.transaction('RTInfo', 'readwrite').objectStore('RTInfo');
                  rtinfoStore.put(response.data.root.station);
                });
                console.log(stationData);
                resolve(stationData);
              } else {
                reject(response.data.root.message);
              }
            });
          });
        },

        getPossibleArrivals: function (departureStationName) {
          //
          return dbPromise.then(function (db) {
            var tx = db.transaction('station');

            return tx.objectStore('station').index('by-name').getKey(departureStationName)
              .then(function (departureAbbr) {

                return $http({
                  method: 'GET',
                  url: 'https://api.bart.gov/api/sched.aspx?cmd=stnsched&key=MW9S-E7SL-26DU-VV8V&l=1&orig=' + departureAbbr
                })
              })
              .then(function (response) {

                console.log(response.data.root.station);
              });
          });


        },

        getLatestSearchedStation: function () {

          return latestSearchedStation;
        },

        getLatestSearchedDepartureStation: function () {
          return {
            'name': ''
          }
        },

        getLatestSearchedArrivalStation: function () {
          return {
            'name': ''
          }
        },

        transformStationData: function (stationInfo) {
          var platforms = [];
          stationInfo.etd.forEach(function (destination) {

            // When only there is a destination/platform available the API return this property has an object.
            if (!Array.isArray(destination.estimate)) {
              destination.estimate = [destination.estimate];
            }

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
