import { app } from './post-module'

const POST_URL = 'http://jsonplaceholder.typicode.com/posts';

function urlLoadPosts($http){
  return $http.get(POST_URL).then(result => result.data);
}

function sortPosts(posts, field, isDescending){
  let compare = (leftChar, rightChar) => isDescending ? leftChar < rightChar : leftChar > rightChar;
  return posts.sort((postLeft, postRight) => {
    let limit = Math.min(postLeft[field].length, postRight[field].length);
    for(let i = 0; i < limit; i++){
      if(postLeft[field][i] === postRight[field][i]) continue;
      else return compare(postLeft[field][i], postRight[field][i]) ? 1 : -1;
    }

    return 0;
  })
}

function saveToCache(posts){
  if(localStorage){
    localStorage.setItem('posts', JSON.stringify(posts));
  }

  context.posts = posts;

  return posts;
}

let context = {};

let postService = app.factory('PostService', ['$http', ($http) => {
  return {
    getPosts() {
      return urlLoadPosts($http)
        .then(saveToCache);
    },
    sort(field, orderDesc) {
      return new Promise((resolve, reject) => {
        resolve(sortPosts(context.posts, field, orderDesc))
      })
    }
  }
}]);

export { postService };