describe('myAppRename.view3 View3Ctrl', function() {

  var scope, httpBackendMock, ctrl;
  var wikis = [{title : "TestTitle", url :"testurl.test.url",abstract: "this is a test object with a test abstract as a test", categories : ["test1", "test2", "test3"], headings: null, links: null},
      {title : "AnotherTitle", url :"testurl.test.url",abstract: "this is a different test object with a different test abstract as a test", categories : ["test2", "test3"], headings: null, links: null},
      {title : "LastT", url :"testurl.test.url",abstract: "this is the last test object with the last test abstract as a test", categories : ["test3"], headings: null, links: null}];

    beforeEach(module('myAppRename.view3'));

  beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
    httpBackendMock = $httpBackend;
    httpBackendMock.expectGET('api/categories').
      respond(wikis);
    scope = $rootScope.$new();
    ctrl = $controller('View3Ctrl', {$scope: scope});
  }));

  it('Should fetch three wikis ', function () {
    expect(scope.wikis).toBeUndefined();
    httpBackendMock.flush();
    expect(scope.wikis.length).toEqual(3);
  });

  it('Should fetch three correct wikis', function () {
    expect(scope.wikis).toBeUndefined();
    httpBackendMock.flush();
    expect(JSON.stringify(scope.wikis)).toEqual(JSON.stringify(wikis));
  });

});