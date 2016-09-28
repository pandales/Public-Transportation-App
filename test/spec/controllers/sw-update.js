'use strict';

describe('Controller: SwUpdateCtrl', function () {

  // load the controller's module
  beforeEach(module('publicTransportationApp'));

  var SwUpdateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SwUpdateCtrl = $controller('SwUpdateCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SwUpdateCtrl.awesomeThings.length).toBe(3);
  });
});
