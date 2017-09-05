import { Controller } from 'angular-ecmascript/module-helpers';

export default class SearchCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.searchText = this.message = '';
    let storage = window.localStorage;
    let selectedLocation = JSON.parse(storage.getItem('location'));
    selectedLocation ? this.$rootScope.selectedLocation = selectedLocation : null;

    if(!this.$rootScope.currentUserId){
      if(!localStorage.getItem('anonymousUserId')){
        let anonymousUserId = Random.id();
        localStorage.setItem('anonymousUserId', anonymousUserId);
        Accounts.createUser({password:anonymousUserId, email:anonymousUserId+'@'+anonymousUserId+'.com'}, this.updateInitialInfo());
      }else{
        let anonymousUserId = localStorage.getItem('anonymousUserId');
        Meteor.loginWithPassword(anonymousUserId+"@"+anonymousUserId+'.com', anonymousUserId, (error)=>{ error ? console.log(error) : null;});
      }
    }

  }

  search(){
    this.loading(true);
    this.callMethod('search', this.searchText, (err, result) => {
      if (err) return this.handleError(err);
      this.loading(false);
      if(result.length == 0){
        this.message = 'No results found. Try searching a different location or product.';
        this.products = [];
      }else{
        this.message = '';
        this.products = result;
      }
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
