var angular = require('angular');
require('angular-mocks');

describe('Post controller', function(){
  beforeEach(angular.mock.module('app'));

  // var $controller;

  // beforeEach(inject(function(_$controller_){
  //   $controller = _$controller_;
  // }));

  // describe('post list', function(){
  //   var controller, scope;

  //   beforeEach(function(){
  //     scope = {};
  //     controller = $controller('PostController', {$scope: scope})
  //   })

  //   it('should be initialized to empty list', function(){
  //     expect(scope.posts).not.toBeNull();
  //     expect(scope.posts.length).toBe(0);
  //   })
  // })
  var testData = [
    {id: 1, title: 'test1', body: 'the test body'},
    {id: 2, title: 'test2', body: 'the test body times 2'},
    {id: 3, title: 'aaa test', body: 'blah blah blah'},
    {id: 4, title: 'zzz test', body: 'blah fsdlfkjdsf'},
    {id: 10, title: 'something', body: 'zzz dsfsldkfjsdfsdjfl'},
    {id: 11, title: 'something 2', body: 'aaa dsafjs dfsfsdfs'}
  ]
  var scope, mockedService, controller, $q, deferred;

  beforeEach(inject(function($rootScope, $controller, _$q_, PostService){
    $q = _$q_;
    scope=$rootScope.$new();

    mockedService=PostService;

    deferred = $q.defer();
    spyOn(mockedService, 'getPosts').and.returnValue(deferred.promise);
    mockedService.sort = jasmine.createSpy('sort');

    controller = $controller('PostController', {
      $scope: scope, 
      PostService: mockedService
    });
  }));

  it('should store push posts', function(){
    deferred.resolve(testData);
    scope.$apply();

    expect(scope.posts).not.toBeNull();
    expect(scope.posts.length).toBe(testData.length);
    expect(scope.posts[0]).toBe(testData[0]);
  })
})
