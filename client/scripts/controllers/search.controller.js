import { Controller } from 'angular-ecmascript/module-helpers';

export default class SearchCtrl extends Controller {
  constructor() {
    super(...arguments);

    //Anonymous user auto login
    if(!this.currentUserId){
      if(!localStorage.getItem('anonymousUserId')){
        let anonymousUserId = Random.id();
        localStorage.setItem('anonymousUserId', anonymousUserId);
        Accounts.createUser({password:anonymousUserId, email:anonymousUserId+'@'+anonymousUserId+'.com'}, this.updateInitialInfo());
      }else{
        let anonymousUserId = localStorage.getItem('anonymousUserId');
        Meteor.loginWithPassword(anonymousUserId+"@"+anonymousUserId+'.com', anonymousUserId, (error)=>{ console.log(error);});
      }
    }

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
