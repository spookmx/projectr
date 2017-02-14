import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { States, Cities } from '../../../lib/collections';

export default class AdminStateCtrl extends Controller {
  constructor() {
    super(...arguments);
    if(this.$stateParams.stateId){
      //Existing State
      this.stateId = this.$stateParams.stateId;
      this.subscribe('states');
      this.subscribe('cities');
      this.helpers({
        state() {
          return States.findOne({_id: this.stateId});
        },
        activeCities() {
          return Cities.find({
            state: this.stateId,
            active: true
          });
        },
        inactiveCities() {
          return Cities.find({
            state: this.stateId,
            active: false
          });
        }
      });
      this.title = "Update "+this.state.name;
    }else{
      //New State
      this.state = {website:"http://", active:true};
      this.title = "Add New State";
    }
  }

  saveAdminStateModal() {
    if(this.stateId){
      this.callMethod('adminUpdateState', this.state, (err, result) => {
        if (err) return this.handleError(err);
      });
    }else{
      this.callMethod('adminAddState', this.state, (err, result) => {
        if (err) return this.handleError(err);
        this.hideAdminStateModal();
      });
    }
  }

  deleteState(){
    this.$ionicPopup.show({
      template: 'This state will be removed from all portfolios and deleted from the application. Do you want to proceed?',
      title: 'Delete State',
      subTitle: '',
      buttons: [
        { text: 'No' },
        {
          text: '<b>Yes</b>',
          type: 'button-positive',
          onTap: (e)=> {
            this.callMethod('adminDeleteState', this.stateId, (err, result) => {
              if (err) return this.handleError(err);
              this.$state.go('tab.admin-portfolio');
            });
          }
        }
      ]
    });
  }

  showAddCityModal(){
    this.AdminCity.showModal(this.stateId);
  }

  editCity(cityId){
    this.AdminCity.showModal(this.stateId, cityId);
  }

  handleError(err) {
    this.$log.error('Adding state error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Failed to add state',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }

  hideAdminStateModal() {
    this.AdminState.hideModal();
  }

}

AdminStateCtrl.$name = 'AdminStateCtrl';
AdminStateCtrl.$inject = ['AdminCity', 'AdminState', '$ionicPopup', '$log', '$scope', '$stateParams', '$state'];
