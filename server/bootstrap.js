import { Meteor } from 'meteor/meteor';
import { Companies, Products } from '../lib/collections';

Meteor.startup(() => {
  if (Companies.find().count() === 0) {
    const companies = [{
      'name': 'Abbott',
      'description': 'Abbott Laboratories is an American worldwide health care company. It has 74,000 employees and operates in more than 150 countries.',
      'type': ['pharmaceutical', 'device'],
      'website':'http://abbott.com',
    }, {
      'name': 'Novartis',
      'description': 'Novartis International AG is a Swiss multinational pharmaceutical company based in Basel, Switzerland, ranking number one in sales among the world-wide industry in 2013.',
      'type': ['pharmaceutical'],
      'website':'http://novartis.com',
    }, {
      'name': 'Siemens Healthineers',
      'description': 'Siemens Healthineers (formerly Siemens Healthcare, Siemens Medical Solutions, Siemens Medical Systems) is a medical technology company and is headquartered in Erlangen, Germany.',
      'type': ['device'],
      'website':'https://www.healthcare.siemens.com/',
    }];

    companies.forEach((company) => {
      Companies.insert(company)
    });
  }
  //Add products
  if (Products.find().count() === 0) {
    const products = [{
      'name_brand': 'Synthroid',
      'name_generic': 'Levothyroxine',
      'description': 'It can treat hypothyroidism. It can also treat an enlarged thyroid gland and thyroid cancer.',
      'type': ['drug'],
      'website':'https://www.synthroid.com/',
    }, {
      'name_brand': 'Tirosint',
      'name_generic': 'Levothyroxine',
      'description': 'Tirosint (levothyroxine sodium) is a unique hypothyroidism treatment gel cap. It contains only 4 ingredients with no additives to interfere with drug efficacy.',
      'type': ['drug'],
      'website':'https://www.tirosint.com/',
    }, {
      'name_brand': 'Unithroid',
      'name_generic': 'Levothyroxine',
      'description': 'It can treat hypothyroidism. It can also treat an enlarged thyroid gland and thyroid cancer.',
      'type': ['drug'],
      'website':'https://www.unithroid.com/',
    }];

    products.forEach((product) => {
      Products.insert(product)
    });
  }
});
