'use strict';

/**
 * @ngdoc directive
 * @name publicTransportationApp.directive:platformCard
 * @description
 * # platformCard
 */
angular.module('publicTransportationApp')
  .directive('platformCard', ['$timeout', function ($timeout) {
    return {
      templateUrl: 'views/directives/platform-card.html',
      restrict: 'E',
      scope: {
        platformInfo: "=",
        platformNumber: "="
      },
      link: function postLink(scope) {
      }
    };
  }]);
