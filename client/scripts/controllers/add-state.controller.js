import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { States } from '../../../lib/collections';

export default class AddStateCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.searchText = '';


    this.subscribe('states');

    this.helpers({
      states() {
        return States.find({
          active: true
        },{
          sort: { name: 1 }
        });
      },
      userStates(){
        return Meteor.user().states;
      }
    });

  }

  filterStates(criteria, states){
    return function(item){
      var found = false;
      _.each(states, (stateId)=> {
        stateId == item._id ? found = true : null;
      });
      if(!found && item.name.match(new RegExp(criteria,'gi'))){
        return item;
      }else{
        return null;
      }
    }
  }

  selectAddStateModal() {
    this.callMethod('addState', this.choice, (err, result) => {
      if (err) return this.handleError(err);
      this.hideAddStateModal();
    });
  }

  handleError(err) {
    this.$log.error('Adding state error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Failed to add state',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }

  hideAddStateModal() {
    this.AddState.hideModal();
  }

}

AddStateCtrl.$name = 'AddStateCtrl';
AddStateCtrl.$inject = ['AddState', '$ionicPopup', '$log', '$scope'];
