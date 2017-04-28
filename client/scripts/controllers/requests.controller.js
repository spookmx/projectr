import { Controller } from 'angular-ecmascript/module-helpers';
import { _ } from 'meteor/underscore';

export default class RequestsCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.requests = {};
    this.callMethod('getRequests', this.query, (err, result) => {
      if (err) return this.handleError(err);
      this.handleGetRequests(result);
    });
  }

  handleGetRequests(result){
    this.requests.open = _.where(result, {status: 'Open'});
    this.requests.accepted = _.where(result, {status: 'Accepted'});
    this.requests.completed = _.where(result, {status: 'Completed'});
    this.requests.cancelled = _.where(result, {status: 'Cancelled'});
  }

}

RequestsCtrl.$name = 'RequestsCtrl';
RequestsCtrl.$inject = ['$ionicPopup', '$log', '$scope', '$rootScope'];
