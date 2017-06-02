import { Directive } from 'angular-ecmascript/module-helpers';
import ContactsContactTemplateUrl from '../../templates/contacts-contact.html';
import ContactsContactCtrl from '../controllers/contacts-contact.controller';

export default class ContactsContactDirective extends Directive {
  constructor() {
    super(...arguments);

    this.templateUrl = ContactsContactTemplateUrl;
    this.controller = ContactsContactCtrl;
    this.controllerAs = 'contactsContact';
    this.bindToController = true;
    this.replace = true;
    this.scope = {
      user:'<'
    };
  }

  // Directive compile function
  compile() {

  }

  // Directive link function
  link() {

  }
}

ContactsContactDirective.$name = 'contactsContact';
ContactsContactDirective.$inject = [];
