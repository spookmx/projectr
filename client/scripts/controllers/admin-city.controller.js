import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Cities } from '../../../lib/collections';

export default class AdminCityCtrl extends Controller {
  constructor() {
    super(...arguments);
    if(this.AdminCity.scope.cityId){
      //Existing City
      this.cityId = this.AdminCity.scope.cityId;
      this.subscribe('cities');
      this.helpers({
        city() {
          return Cities.findOne({_id: this.cityId});
        },
      });
      this.title = "Update "+this.city.name;
    }else{
      //New City
      this.city = {
        active:true,
        state: this.AdminCity.scope.stateId
      };
      this.title = "Add New City";
    }
  }

  saveAdminCityModal() {
    if(this.cityId){
      this.callMethod('adminUpdateCity', this.city, (err, result) => {
        if (err) return this.handleError(err);
        this.hideAdminCityModal();
      });
    }else{
      this.callMethod('adminAddCity', this.city, (err, result) => {
        if (err) return this.handleError(err);
        this.hideAdminCityModal();
      });
    }
  }

  deleteCity(){
    this.$ionicPopup.show({
      template: 'This city will be removed from all portfolios and deleted from the application. Do you want to proceed?',
      title: 'Delete City',
      subTitle: '',
      buttons: [
        { text: 'No' },
        {
          text: '<b>Yes</b>',
          type: 'button-positive',
          onTap: (e)=> {
            this.callMethod('adminDeleteCity', this.cityId, (err, result) => {
              if (err) return this.handleError(err);
              this.hideAdminCityModal();
            });
          }
        }
      ]
    });
  }

  handleError(err) {
    this.$log.error('Adding city error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Failed to add city',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }

  hideAdminCityModal() {
    this.AdminCity.hideModal();
  }

}

AdminCityCtrl.$name = 'AdminCityCtrl';
AdminCityCtrl.$inject = ['AdminCity', '$ionicPopup', '$log', '$scope'];
