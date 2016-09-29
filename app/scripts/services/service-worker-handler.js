'use strict';

/**
 * @ngdoc service
 * @name publicTransportationApp.serviceWorkerHandler
 * @description
 * # serviceWorkerHandler
 * Factory in the publicTransportationApp.
 */
angular.module('publicTransportationApp')
  .factory('serviceWorkerHandler', ['$mdToast', function ($mdToast) {
    var showToast = function () {
      $mdToast.show(
        $mdToast.SwUpdate()
      );
    };
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(function (reg) {

          if (!navigator.serviceWorker.controller) {
            return;
          }

          if (reg.waiting) {
            showToast();
          }

          if (reg.installing) {
            console.log("there is a sw installing (an update)");
            reg.installing.addEventListener('statechange', function () {
              if (this.state == 'installed') {
                showToast();
              }
            });
          }

          reg.addEventListener('updatefound', function () {
            reg.installing.addEventListener('statechange', function () {
              if (this.state == 'installed') {
                showToast();
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

    // Public API here
    return {
      update: function () {
        console.log("update sw");
      }
    };
  }]);
