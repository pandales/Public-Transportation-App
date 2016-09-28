'use strict';

/**
 * @ngdoc service
 * @name publicTransportationApp.serviceWorker
 * @description
 * # serviceWorker
 * Provider in the publicTransportationApp.
 */
angular.module('publicTransportationApp')
  .provider('serviceWorker', [
    '$mdToastProvider',

    function ($mdToastProvider) {



      console.log($mdToastProvider);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(function (reg) {

          if (!navigator.serviceWorker.controller) {
            return;
          }

          if (reg.waiting) {
            $mdToastProvider.show(
              $mdToastProvider.SwUpdate()
            );
          }

          if (reg.installing) {
            console.log("there is a sw installing (an update)");
            reg.installing.addEventListener('statechange', function () {
              if (this.state == 'installed') {

              }
            });
          }

          reg.addEventListener('updatefound', function () {
            reg.installing.addEventListener('statechange', function () {
              if (this.state == 'installed') {

              }
            });
          });
        })
        .catch(function (m) {
          console.log(m)
        });

    } else {
      console.log("this browser does NOT support service worker");
    }

    // Private variables
    var salutation = 'Hello';

    // Private constructor
    function Greeter() {
      this.greet = function () {
        return salutation;
      };
    }

    // Public API for configuration
    this.setSalutation = function (s) {
      salutation = s;
    };

    // Method for instantiating
    this.$get = function () {
      return new Greeter();
    };
  }]);
