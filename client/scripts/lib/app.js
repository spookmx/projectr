
import 'angular-animate';
import 'angular-meteor';
import 'angular-meteor-auth';
import 'angular-sanitize';
import 'angular-ui-router';
import 'ionic-scripts';
import Angular from 'angular';
import Loader from 'angular-ecmascript/module-loader';
import { Meteor } from 'meteor/meteor';

//Modules
import SearchCtrl from '../controllers/search.controller';
import ProfileCtrl from '../controllers/profile.controller';
import ProfileRegisterCtrl from '../controllers/profile-register.controller';
import ProfilePortfolioCtrl from '../controllers/profile-portfolio.controller';
import AddCompanyCtrl from '../controllers/add-company.controller';
import AddCompanyService from '../services/add-company.service';

import PortfolioCompanyDirective from '../directives/portfolio-company.directive';
import PortfolioCompanyCtrl from '../controllers/portfolio-company.controller';

import AddProductsCtrl from '../controllers/add-products.controller';
import AddProductsService from '../services/add-products.service';

import PortfolioProductDirective from '../directives/portfolio-product.directive';
import PortfolioProductCtrl from '../controllers/portfolio-product.controller';

import RoutesConfig from '../routes';

const App = 'Projectr';

Angular.module(App, [
  'angular-meteor',
  'angular-meteor.auth',
  'ionic'
]);

new Loader(App)
  .load(SearchCtrl)
  .load(ProfileCtrl)
  .load(ProfileRegisterCtrl)
  .load(ProfilePortfolioCtrl)
  .load(AddCompanyCtrl)
  .load(AddCompanyService)
  .load(PortfolioCompanyDirective)
  .load(PortfolioCompanyCtrl)
  .load(AddProductsCtrl)
  .load(AddProductsService)
  .load(PortfolioProductDirective)
  .load(PortfolioProductCtrl)
  .load(RoutesConfig);

if (Meteor.isCordova) {
  Angular.element(document).on('deviceready', onReady);
}else {
  Angular.element(document).ready(onReady);
}
function onReady() {
  Angular.bootstrap(document, [App]);
}