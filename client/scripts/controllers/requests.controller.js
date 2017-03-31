import { Controller } from 'angular-ecmascript/module-helpers';

export default class RequestsCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.callMethod('getRequests', this.query, (err, result) => {
      if (err) return this.handleError(err);
      this.handleGetRequests(result);
    });
  }

  handleGetRequests(result){
    console.log(result);
  }

}

RequestsCtrl.$name = 'RequestsCtrl';
RequestsCtrl.$inject = ['$ionicPopup', '$log', '$scope', '$rootScope'];
