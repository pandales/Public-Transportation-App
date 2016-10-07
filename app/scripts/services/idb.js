'use strict';

/**
 * @ngdoc service
 * @name publicTransportationApp.idb
 * @description
 * # idb
 * Factory in the publicTransportationApp.
 */
angular.module('publicTransportationApp')
  .factory('idb', ['$window', function ($window) {
    var IDB = $window.idb;

    var dbPromise = IDB.open('public-transportation', 3, function (upgradeDb) {
      switch (upgradeDb.oldVersion) {
        case 0:
          var stationStore = upgradeDb.createObjectStore('station', { keyPath: 'abbr' });
          stationStore.createIndex('by-name', 'name');

        case 1:
          var RTInfoStore = upgradeDb.createObjectStore('RTInfo', { keyPath: 'abbr' });
          RTInfoStore.createIndex('by-name', 'name');
      }
    });


    // Public API here
    return {
      getDBPromise: function () {
        return dbPromise;
      }
    };
  }]);
