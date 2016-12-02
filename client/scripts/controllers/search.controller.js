import { Controller } from 'angular-ecmascript/module-helpers';
import { Products } from '../../../lib/collections';

export default class SearchCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.searchText = '';
    this.subscribe('products', () => [this.getReactively('searchText'), ['drug']]);
    this.helpers({
      products() {
        return Products.find({});
      }
    });
  }
}

SearchCtrl.$name = 'SearchCtrl';
