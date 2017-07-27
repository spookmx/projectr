import { Controller } from 'angular-ecmascript/module-helpers';

export default class SearchCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.searchText = '';
    let storage = window.localStorage;
    let selectedLocation = JSON.parse(storage.getItem('location'));
    selectedLocation ? this.$rootScope.selectedLocation = selectedLocation : null;
  }

  search(){
    this.callMethod('search', this.searchText, (err, result) => {
      if (err) return this.handleError(err);
      this.products = result;
    });
  }

  showSearchSelectLocationModal(){
    this.SearchSelectLocation.showModal(this.companyId);
  }
}

SearchCtrl.$name = 'SearchCtrl';
SearchCtrl.$inject = ['SearchSelectLocation', '$ionicPopup', '$log', '$scope', '$rootScope'];
