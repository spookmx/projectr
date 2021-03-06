import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Cities, States } from '../../../lib/collections';

export default class SearchSelectLocationCtrl extends Controller {
  constructor() {
    super(...arguments)

    let storage = window.localStorage;
    let selectedLocation = JSON.parse(storage.getItem('location'));
    selectedLocation ? this.$rootScope.selectedLocation = selectedLocation : null;

    if(this.$rootScope.selectedLocation){
      this.stateSelectedId = this.$rootScope.selectedLocation.stateId;
      if(this.$rootScope.selectedLocation.cityId){
        this.citySelectedId = this.$rootScope.selectedLocation.cityId;
      }else{
        this.citySelectedId = 'all';
      }
    }


    this.searchText = '';
    this.subscribe('cities');
    this.subscribe('states');

    this.helpers({
      states(){
        return States.find();
      },
      cities(){
        return Cities.find({state:this.getReactively('stateSelectedId')});
      },
      stateSelected() {
        return States.findOne({_id:this.getReactively('stateSelectedId')});
      },
      citySelected() {
        return Cities.findOne({_id:this.getReactively('citySelectedId')});
      }
    });
  }

  selectSearchSelectLocationModal() {
    if(this.citySelectedId == "all"){
      this.selectedLocation = {label:this.stateSelected.name, cityName:null, stateId:this.stateSelected._id, cityId:null, stateName:this.stateSelected.name, stateAbbrev:this.stateSelected.abbreviation};
    }else{
      this.selectedLocation = {label:this.citySelected.name+', '+this.stateSelected.abbreviation, cityName:this.citySelected.name, stateId:this.citySelected.state, cityId:this.citySelected._id, stateName:this.stateSelected.name, stateAbbrev:this.stateSelected.abbreviation};
    }
    let storage = window.localStorage;
    storage.setItem('location', JSON.stringify(this.selectedLocation));
    this.$rootScope.selectedLocation = this.selectedLocation;

    this.hideSearchSelectLocationModal();
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
