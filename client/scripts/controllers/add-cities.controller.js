import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Cities } from '../../../lib/collections';

export default class AddCitiesCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.searchText = '';

    this.subscribe('cities');

    this.helpers({
      cities() {
        return Cities.find({"state": this.AddCities.scope.stateId});
      },
      userCities(){
        return Meteor.user().cities;
      }
    });
  }

  filterCities(criteria, cities){
    return function(item){
      let found = false;
      _.each(cities, (city)=> {
        city._id == item._id ? found = true : null;
      });
      if(!found && (item.name.match(new RegExp(criteria,'gi')))){
        return item;
      }else{
        return null;
      }
    }
  }

  selectAddCitiesModal() {
    let selected = [];
    _.each(this.choice, (city, index)=>{
      city ? selected.push({_id:index, hospitals:""}) : null;
    });
    this.callMethod('addCities', selected, (err, result) => {
      if (err) return this.handleError(err);
      this.hideAddCitiesModal();
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

  hideAddCitiesModal() {
    this.AddCities.hideModal();
  }

}

AddCitiesCtrl.$name = 'AddCitiesCtrl';
AddCitiesCtrl.$inject = ['AddCities', '$ionicPopup', '$log', '$scope'];
