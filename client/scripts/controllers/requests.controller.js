import { Controller } from 'angular-ecmascript/module-helpers';
import { _ } from 'meteor/underscore';
import { Requests } from '../../../lib/collections';

export default class RequestsCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.$ionicHistory.clearHistory();

    this.$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = false;
    });

    this.subscribe('requests');

    this.helpers({
      open(){
        return Requests.find({status:'Open'});
      },
      accepted(){
        return Requests.find({status:'Accepted'});
      },
      completed(){
        return Requests.find({status:'Completed'});
      },
      cancelled(){
        return Requests.find({status:'Cancelled'});
      }
    });
  }

}

RequestsCtrl.$name = 'RequestsCtrl';
RequestsCtrl.$inject = ['$ionicPopup', '$log', '$scope', '$rootScope', '$ionicHistory'];
