var angular = require('angular');
require('angular-mocks');

describe('The post service', function(){
  beforeEach(angular.mock.module('app'));
  var postService, http;

  var testData = [
    {id: 1, title: 'test1', body: 'the test body'},
    {id: 2, title: 'test2', body: 'the test body times 2'},
    {id: 3, title: 'aaa test', body: 'blah blah blah'},
    {id: 4, title: 'zzz test', body: 'blah fsdlfkjdsf'},
    {id: 10, title: 'something', body: 'zzz dsfsldkfjsdfsdjfl'},
    {id: 11, title: 'something 2', body: 'aaa dsafjs dfsfsdfs'}
  ]

  beforeEach(inject(function(PostService, $httpBackend){
    postService = PostService;
    http = $httpBackend;
  }));

  it('should return posts from endpoint', function(done){
    expect(postService).not.toBeNull();
    expect(http).not.toBeNull();

    http
      .when('GET',  'http://jsonplaceholder.typicode.com/posts')
      .respond(200, testData)

    postService
      .getPosts()
      .then(function(p) {
        expect(p).not.toBeNull();
        expect(p.length).toBe(testData.length);
        done();
      })

    http.flush();
  })

  it('should order posts by title in ascending order', function(done){
    expect(postService).not.toBeNull();
    expect(http).not.toBeNull();

    http
      .when('GET',  'http://jsonplaceholder.typicode.com/posts')
      .respond(200, testData)

    postService
      .getPosts()
      .then(function() {
        postService.sort('title', false).then(function(posts){
          expect(posts).not.toBeNull();
          expect(posts.length).toBe(testData.length);
          expect(posts[0].id).toBe(3);
          expect(posts[posts.length - 1].id).toBe(4);
          done();
        })
      })

    http.flush();
  })

  it('should order posts by title in descending order', function(done){
    expect(postService).not.toBeNull();
    expect(http).not.toBeNull();

    http
      .when('GET',  'http://jsonplaceholder.typicode.com/posts')
      .respond(200, testData)

    postService
      .getPosts()
      .then(function() {
        postService.sort('title', true).then(function(posts){
          expect(posts).not.toBeNull();
          expect(posts.length).toBe(testData.length);
          expect(posts[0].id).toBe(4);
          expect(posts[posts.length - 1].id).toBe(3);
          done();
        })
      })

    http.flush();
  })

  it('should order posts by body in ascending order', function(done){
    expect(postService).not.toBeNull();
    expect(http).not.toBeNull();

    http
      .when('GET',  'http://jsonplaceholder.typicode.com/posts')
      .respond(200, testData)

    postService
      .getPosts()
      .then(function() {
        postService.sort('body', false).then(function(posts){
          expect(posts).not.toBeNull();
          expect(posts.length).toBe(testData.length);
          expect(posts[0].id).toBe(11);
          expect(posts[posts.length - 1].id).toBe(10);
          done();
        })
      })

    http.flush();
  })

  it('should order posts by body in descending order', function(done){
    expect(postService).not.toBeNull();
    expect(http).not.toBeNull();

    http
      .when('GET',  'http://jsonplaceholder.typicode.com/posts')
      .respond(200, testData)

    postService
      .getPosts()
      .then(function() {
        postService.sort('body', true).then(function(posts){
          expect(posts).not.toBeNull();
          expect(posts.length).toBe(testData.length);
          expect(posts[0].id).toBe(10);
          expect(posts[posts.length - 1].id).toBe(11);
          done();
        })
      })

    http.flush();
  })

  it('should throw exception when order posts by missing field in any order', function(done){
    expect(postService).not.toBeNull();
    expect(http).not.toBeNull();

    http
      .when('GET',  'http://jsonplaceholder.typicode.com/posts')
      .respond(200, testData)

    postService
      .getPosts()
      .then(function() {
        postService
          .sort('unknownField', true)
          .then(function(posts){
            fail('should not order')
            done();
          })
          .catch(function(error){
            expect(error).not.toBeNull();
            done();
          })
      })

    http.flush();
  })
})