'use strict';

describe('Controller: ViewRouteCtrl', function () {

  // load the controller's module
  beforeEach(module('publicTransportationApp'));

  var ViewRouteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewRouteCtrl = $controller('ViewRouteCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ViewRouteCtrl.awesomeThings.length).toBe(3);
  });
});
