import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Cities } from '../../../lib/collections';

export default class TerritoriesCityCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.subscribe('cities');

    this.helpers({
      citySelected(){
        return Cities.findOne({_id:this.cityId});
      },
      city(){
        return _.findWhere(Meteor.user().cities, {_id:this.cityId});
      }
    });
  }
  editCity(){
    this.EditCity.showModal(this.cityId);
  }
}

TerritoriesCityCtrl.$name = 'TerritoriesCityCtrl';
TerritoriesCityCtrl.$inject = ['EditCity', '$log', '$scope'];
