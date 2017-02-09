import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Cities, States } from '../../../lib/collections';

export default class SearchSelectLocationCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.searchText = '';
    this.choice = {};

    this.subscribe('cities');
    this.subscribe('states');

    this.helpers({
      cities() {
        return Cities.find();
      },
      states() {
        return States.find();
      },
      stateSelected() {
        return States.findOne({_id:this.getReactively('choice.state')});
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

  selectSearchSelectLocationModal() {
    //SaveInCookie
    //this.$rootScope.searchLocation =
    if(this.choice.state){
      this.selectedLocation = {label:this.choice.name+', '+this.stateSelected.abbreviation, cityName:this.choice.name, stateId:this.choice.state, cityId:this.choice._id, stateName:this.stateSelected.name, stateAbbrev:this.stateSelected.abbreviation};
    }else{
      this.selectedLocation = {label:'Austin, TX', cityName:null, stateId:this.choice.state, cityId:null};
    }
    this.$rootScope.selectedLocation = this.selectedLocation;
    
    this.hideSearchSelectLocationModal()
  }

  handleError(err) {
    this.$log.error('Adding location error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Failed to add location',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }

  hideSearchSelectLocationModal() {
    this.SearchSelectLocation.hideModal();
  }

}

SearchSelectLocationCtrl.$name = 'SearchSelectLocationCtrl';
SearchSelectLocationCtrl.$inject = ['SearchSelectLocation', '$ionicPopup', '$log', '$scope', '$rootScope'];
