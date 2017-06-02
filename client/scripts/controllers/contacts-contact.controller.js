import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Companies } from '../../../lib/collections';

export default class ContactsContactCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.subscribe('companies');

    this.helpers({
      company() {
        return Companies.findOne({ _id:this.getReactively('companyId') });
      }
    });
    this.callMethod('getUserById', this.user, (err, result) => {
      if (err) return this.handleError(err);
      this.handleGetUser(result);
    });
  }
  handleGetUser(result){
    this.contact = result;
    this.companyId = this.contact.companies[0];
  }
  removeContact(){

  }
}

ContactsContactCtrl.$name = 'ContactsContactCtrl';
ContactsContactCtrl.$inject = ['$log', '$scope'];
