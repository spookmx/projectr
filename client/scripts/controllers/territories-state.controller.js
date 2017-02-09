import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { States } from '../../../lib/collections';
import { Cities } from '../../../lib/collections';

export default class TerritoriesStateCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.subscribe('states');
    this.subscribe('cities');

    this.helpers({
      state() {
        return States.findOne({_id:this.stateId});
      },
      user(){
        return Meteor.user();
      },
      cities(){
        return Cities.find({
          $and:[
            {
              '_id':{
                $in: _.map(this.getReactively('this.user.cities'), (city)=>{ return city._id})
              }
            },
            {
              'state': this.stateId
            }
          ]
        });
      }
    });
  }
  removeState(){
    this.$ionicPopup.show({
      template: 'Do you want to remove this state from your territories?',
      title: 'Remove State',
      subTitle: '',
      buttons: [
        { text: 'No' },
        {
          text: '<b>Yes</b>',
          type: 'button-positive',
          onTap: (e)=> {
            this.callMethod('removeState', this.stateId, (err, result) => {
              if (err) return this.handleError(err);
            });
          }
        }
      ]
    });
  }

  showAddCitiesModal(){
    this.AddCities.showModal(this.stateId);
  }
}

TerritoriesStateCtrl.$name = 'TerritoriesStateCtrl';
TerritoriesStateCtrl.$inject = ['AddCities', '$ionicPopup', '$log', '$scope'];
