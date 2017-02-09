import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { States } from '../../../lib/collections';

export default class ShowStateAbbrevCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.subscribe('states');

    this.helpers({
      stateSelected(){
        return States.findOne({_id:this.state});
      }
    });
  }
}

ShowStateAbbrevCtrl.$name = 'ShowStateAbbrevCtrl';
ShowStateAbbrevCtrl.$inject = ['$log', '$scope'];
