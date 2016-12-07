import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Companies } from '../../../lib/collections';

export default class ProfilePortfolioCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.subscribe('users', () => []);
    this.subscribe('companies');

    this.helpers({
      user() {
        return Meteor.users.findOne({_id:Meteor.userId()});
      },
      companies() {
        return Companies.find({});
      }
    });
  }

  showAddCompanyModal(){
    this.AddCompany.showModal();
  }

  loading(show){
    show ? this.$ionicLoading.show({template: '<ion-spinner icon="lines" class="spinner-light"></ion-spinner>'}): this.$ionicLoading.hide();
  }

}

ProfilePortfolioCtrl.$name = 'ProfilePortfolioCtrl';
ProfilePortfolioCtrl.$inject = ['AddCompany', '$scope', '$state', '$ionicLoading', '$ionicModal', '$log'];
