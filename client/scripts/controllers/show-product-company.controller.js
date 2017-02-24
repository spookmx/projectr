import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Companies } from '../../../lib/collections';

export default class ShowProductCompanyCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.subscribe('companies');
    console.log(this.company);
    this.helpers({
      companySelected(){
        return Companies.findOne({_id:this.company});
      }
    });
  }
}

ShowProductCompanyCtrl.$name = 'ShowProductCompanyCtrl';
ShowProductCompanyCtrl.$inject = ['$log', '$scope'];
