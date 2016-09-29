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

    var register = null;
    var waitingWorker = null;

    var showToast = function (worker) {
      $mdToast.show(
        $mdToast.SwUpdate()
      );
      waitingWorker = worker;
    };

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(function (reg) {
          register = reg;

          if (!navigator.serviceWorker.controller) {
            return;
          }

          if (reg.waiting) {
            showToast(reg.waiting);
            console.log("it was waiting", reg.waiting);
          }

          if (reg.installing) {
            reg.installing.addEventListener('statechange', function () {
              if (this.state == 'installed') {
                console.log("installed by statechange", this);
                showToast(this);
              }
            });
          }

          reg.addEventListener('updatefound', function () {
            reg.installing.addEventListener('statechange', function () {
              if (this.state == 'installed') {
                console.log("installed by statechange", this);
                showToast(this);
              }
            });
          });
        })
        .catch(function (m) {
          console.log(m)
        });

      // Restart the browser when the sw change
      navigator.serviceWorker.addEventListener('controllerchange', function () {
        window.location.reload();
      });

    } else {
      console.log("this browser does NOT support service worker");
    }

    // Public API here
    return {
      update: function () {
        if (register) {
          waitingWorker.postMessage({action: 'skipWaiting'});
        }
      }
    };
  }]);
