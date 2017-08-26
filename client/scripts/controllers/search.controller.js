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
    this.loading(true);
    this.callMethod('search', this.searchText, (err, result) => {
      if (err) return this.handleError(err);
      this.products = result;
      this.loading(false);
    });
  }

  loading(show){
    show ? this.$ionicLoading.show({template: '<ion-spinner icon="lines" class="spinner-light"></ion-spinner>'}): this.$ionicLoading.hide();
  }

  showSearchSelectLocationModal(){
    this.SearchSelectLocation.showModal(this.companyId);
  }
}

SearchCtrl.$name = 'SearchCtrl';
SearchCtrl.$inject = ['SearchSelectLocation', '$ionicPopup', '$log', '$scope', '$rootScope', '$ionicLoading'];
