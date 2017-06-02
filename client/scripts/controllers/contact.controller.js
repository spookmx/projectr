import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Companies, Requests } from '../../../lib/collections';

export default class ContactCtrl extends Controller {
  constructor() {
    super(...arguments);
    this._ = _;
    this.contactId = this.$stateParams.contactId;
    this.subscribe('companies');
    this.subscribe('requests', ()=>{
      if(this.currentUserId){
        return [null];
      }else{
        return [this.getReactively('userId')];
      }
    });
    this.helpers({
      activeRequests(){
        return Requests.find({$and:[{$or:[{status:'Open'}, {status:'Accepted'}]}, {representative:this.contactId}]});
      },
      userId(){
        if(this.currentUserId){
          return this.currentUserId;
        }else{
          return localStorage.getItem('anonymousUserId');
        }
      }
    });

    this.callMethod('getUserById', this.contactId, (err, result) => {
      if (err) return this.handleError(err);
      this.handleGetUser(result);
    });

    this.storage = window.localStorage;
    this.location = JSON.parse(this.storage.getItem('location'));
    this.location ? this.$rootScope.selectedLocation = this.location : null;
  }

  removeContact(){
    this.callMethod('removeContact', this.contactId, (err, result) => {
      if (err) return this.handleError(err);
      this.handleremoveContact(result);
    });
  }

  handleremoveContact(result){
    this.$state.go('tab.contacts');
  }

  handleGetUser(result){
    this.contact = result;
  }

  showSearchSelectLocationModal(){
    this.SearchSelectLocation.showModal();
  }

  handleError(err) {
    this.$log.error('Showing product error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Failed to add product',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }

}

ContactCtrl.$name = 'ContactCtrl';
ContactCtrl.$inject = ['SearchSelectLocation', '$ionicPopup', '$log', '$scope', '$stateParams', '$state', '$rootScope'];
