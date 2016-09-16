'use strict';

describe('Service: Station', function () {

  // load the service's module
  beforeEach(module('publicTransportationApp'));

  // instantiate service
  var Station;
  beforeEach(inject(function (_Station_) {
    Station = _Station_;
  }));

  it('should do something', function () {
    expect(!!Station).toBe(true);
  });

});
