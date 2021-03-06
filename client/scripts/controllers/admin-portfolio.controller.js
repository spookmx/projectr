import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Companies } from '../../../lib/collections';

export default class AdminPortfolioCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.searchText = '';

    this.subscribe('users', () => []);
    this.subscribe('companies');

    this.helpers({
      user() {
        return Meteor.users.findOne({_id:Meteor.userId()});
      },
      activeCompanies() {
        return Companies.find({
          active: true
        });
      },
      inactiveCompanies() {
        return Companies.find({
          active: false
        });
      }
    });
  }

  showAddCompanyModal(){
    this.AdminCompany.showModal();
  }

  loading(show){
    show ? this.$ionicLoading.show({template: '<ion-spinner icon="lines" class="spinner-light"></ion-spinner>'}): this.$ionicLoading.hide();
  }

}

AdminPortfolioCtrl.$name = 'AdminPortfolioCtrl';
AdminPortfolioCtrl.$inject = ['AdminCompany', '$scope', '$state', '$ionicLoading', '$ionicModal', '$log'];
