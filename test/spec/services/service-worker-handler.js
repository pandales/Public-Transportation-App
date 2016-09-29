'use strict';

describe('Service: serviceWorkerHandler', function () {

  // load the service's module
  beforeEach(module('publicTransportationApp'));

  // instantiate service
  var serviceWorkerHandler;
  beforeEach(inject(function (_serviceWorkerHandler_) {
    serviceWorkerHandler = _serviceWorkerHandler_;
  }));

  it('should do something', function () {
    expect(!!serviceWorkerHandler).toBe(true);
  });

});
