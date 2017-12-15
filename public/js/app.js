const app = angular.module('Xmas_List_App', []);

app.controller('MainController', ['$http', function($http) {
  // console.log('Hey');
  // this.test = 'What!';
  //this.items = [];
  this.newForm = {};
  this.edit = false;
  this.currentEdit = {};

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
        // console.log(this.items);
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
this.updateModal = ( item ) => {
   console.log('full edit running...', item);
   this.edit = true;
   this.currentEdit = angular.copy(item)
}

  this.updateItem = () => {
     //console.log('edit submit...', this.currentEdit);
    $http({
      method: 'PUT',
      url: '/items/' + this.currentEdit._id,
      data: this.currentEdit
    }).then(response => {
      console.log('responce:', response.data);
      console.table(this.items);
      const updateByIndex = this.items.findIndex(item => item._id === response.data._id)
      console.log('update ind:', updateByIndex);
      this.items.splice(updateByIndex , 1, response.data)
    }).catch(err => console.error('Catch', err));
    this.edit = false;
   this.currentEdit = {};
   };

   this.dontUpdate = () => {
      this.edit = false;
      this.currentEdit = {};
   }

}]);
