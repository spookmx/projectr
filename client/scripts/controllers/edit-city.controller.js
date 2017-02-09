import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class EditCityCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.helpers({
      selectedCity(){
        return _.findWhere(Meteor.user().cities, {_id:this.EditCity.scope.cityId});
      }
    });
  }

  handleError(err) {
    this.$log.error('Adding cities error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Failed to add cities',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }

  removeCity(){
    this.$ionicPopup.show({
      template: 'Do you want to remove this city from your territories?',
      title: 'Remove City',
      subTitle: '',
      buttons: [
        { text: 'No' },
        {
          text: '<b>Yes</b>',
          type: 'button-positive',
          onTap: (e)=> {
            this.callMethod('removeCity', this.selectedCity, (err, result) => {
              if (err) return this.handleError(err);
            });
            this.EditCity.hideModal();
          }
        }
      ]
    });
  }

  hideEditCityModal() {
    this.callMethod('updateCity', this.selectedCity, (err, result) => {
      if (err) return this.handleError(err);
    });
    this.EditCity.hideModal();
  }

}

EditCityCtrl.$name = 'EditCityCtrl';
EditCityCtrl.$inject = ['EditCity', '$ionicPopup', '$log', '$scope'];
