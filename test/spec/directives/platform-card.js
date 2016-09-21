'use strict';

describe('Directive: platformCard', function () {

  // load the directive's module
  beforeEach(module('publicTransportationApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<platform-card></platform-card>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the platformCard directive');
  }));
});
