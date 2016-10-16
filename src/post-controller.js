import { app } from './post-module'
import { postService } from './post-service'

let postController = app.controller('PostController', ['$scope', 'PostService', ($scope, PostService) => {
  function updatePosts(data){
    $scope.posts = data;
  }

  updatePosts([]);
  $scope.updateSort = (field) => {
    let order = $scope.orderBy == field ? !$scope.orderDesc : $scope.orderDesc;
    PostService.sort(field, order).then(updatePosts);
    $scope.orderBy = field;
    $scope.orderDesc = order;
  }
                
  PostService.getPosts().then(updatePosts);
}]);

export { postController };