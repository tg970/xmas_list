const app = angular.module('Xmas_List_App', []);

app.controller('MainController', ['$http', function($http) {
  // console.log('Hey');
  // this.test = 'What!';

  this.newForm = {};
  this.updateForm = {};

  this.addItem = () => {
    // console.log('Submit button calls createHoliday function');
    $http({
      method: 'POST',
      url: '/items',
      data: this.newForm
    }).then(response => {
      this.items.push(response.data);
      console.table(response.data);
      this.newForm = {};
    }, error => {
      console.log(error);
    }).catch(err => console.error('Catch', err))
  }

  this.getItems = () => {
     $http({
       method: 'GET',
       url: '/items'
     }).then(response => {
       console.table(response.data);
       this.items = response.data;
      //  console.log(this.items);
     }, error => {
       console.error(error.message);
     }).catch(err => console.error('Catch', err));
   }

   // Load immediately on page load
   this.getItems();

// Delete Item
   this.deleteItem = (id) => {
    console.log('You will be deleted', id);

    $http({
      method: 'DELETE',
      url: '/items/' + id
    }).then(response => {
      // console.table(response.data)
      // Do this
      // const removeByIndex = this.holidays.findIndex(holiday => holiday._id === id)
      // Or do this
      const removeByIndex = this.items.findIndex(i => i._id === id)
      // console.log('I want to delete this one!', removeByIndex)
      this.items.splice(removeByIndex, 1);
    }, error => {console.error(error.message)
    }).catch(err => console.error('Catch', err));
  }

// Update Item
  this.updateItem = (item) => {

    $http({
      method: 'PUT',
      url: '/items/' + item._id,
      data: this.updateForm
    }).then(response => {
      console.log(response.data);
    }).catch(err => console.error('Catch', err));
  }

}]);
