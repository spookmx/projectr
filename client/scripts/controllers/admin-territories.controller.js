import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';
import { States } from '../../../lib/collections';

export default class AdminTerritoriesCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.searchText = '';

    this.subscribe('users', () => []);
    this.subscribe('states');

    this.helpers({
      user() {
        return Meteor.users.findOne({_id:Meteor.userId()});
      },
      activeStates() {
        return States.find({
          active: true
        },{
          sort: { name: 1 }
        });
      },
      inactiveStates() {
        return States.find({
          active: false
        },{
          sort: { name: 1 }
        });
      }
    });
  }

  showAddStateModal(){
    this.AdminState.showModal();
  }

  loading(show){
    show ? this.$ionicLoading.show({template: '<ion-spinner icon="lines" class="spinner-light"></ion-spinner>'}): this.$ionicLoading.hide();
  }

}

AdminTerritoriesCtrl.$name = 'AdminTerritoriesCtrl';
AdminTerritoriesCtrl.$inject = ['AdminState', '$scope', '$state', '$ionicLoading', '$ionicModal', '$log'];
