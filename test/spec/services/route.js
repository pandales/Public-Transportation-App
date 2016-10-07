'use strict';

describe('Service: Route', function () {

  // load the service's module
  beforeEach(module('publicTransportationApp'));

  // instantiate service
  var Route;
  beforeEach(inject(function (_Route_) {
    Route = _Route_;
  }));

  it('should do something', function () {
    expect(!!Route).toBe(true);
  });

});
