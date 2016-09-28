'use strict';

describe('Service: serviceWorker', function () {

  // instantiate service
  var serviceWorker,
    init = function () {
      inject(function (_serviceWorker_) {
        serviceWorker = _serviceWorker_;
      });
    };

  // load the service's module
  beforeEach(module('publicTransportationApp'));

  it('should do something', function () {
    init();

    expect(!!serviceWorker).toBe(true);
  });

  it('should be configurable', function () {
    module(function (serviceWorkerProvider) {
      serviceWorkerProvider.setSalutation('Lorem ipsum');
    });

    init();

    expect(serviceWorker.greet()).toEqual('Lorem ipsum');
  });

});
