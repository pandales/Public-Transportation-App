'use strict';

describe('Controller: ShellCtrl', function () {

  // load the controller's module
  beforeEach(module('publicTransportationApp'));

  var ShellCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShellCtrl = $controller('ShellCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ShellCtrl.awesomeThings.length).toBe(3);
  });
});
