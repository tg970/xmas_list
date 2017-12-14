const app = angular.module('Xmas_List_App', []);

app.controller('MainController', ['$http', function($http) {
  console.log('Hey');
  this.test = 'What!';
}]);
