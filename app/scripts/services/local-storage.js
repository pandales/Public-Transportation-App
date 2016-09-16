/**
 * @ngdoc service
 * @name publicTransportationApp.$localStorage
 * @description
 * # $localStorage
 * Service in the publicTransportationApp.
 */
angular.module('publicTransportationApp')
  .factory('$localstorage', ['$window', function ($window) {
    'use strict';

    return {
      set: function (key, value) {
        $window.localStorage[key] = value;
      },
      get: function (key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function (key) {
        return JSON.parse($window.localStorage[key] || false);
      },
      clear: function () {
        $window.localStorage.clear();
      }
    };
  }]);
