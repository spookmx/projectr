import { Meteor } from 'meteor/meteor';
import { Companies, Products, States, Cities } from '../lib/collections';

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

  //Add state
  if (States.find().count() === 0) {
    const states = [
      {
          "name": "Alabama",
          "abbreviation": "AL"
      },
      {
          "name": "Alaska",
          "abbreviation": "AK"
      },
      {
          "name": "Arizona",
          "abbreviation": "AZ"
      },
      {
          "name": "Arkansas",
          "abbreviation": "AR"
      },
      {
          "name": "California",
          "abbreviation": "CA"
      },
      {
          "name": "Colorado",
          "abbreviation": "CO"
      },
      {
          "name": "Connecticut",
          "abbreviation": "CT"
      },
      {
          "name": "Delaware",
          "abbreviation": "DE"
      },
      {
          "name": "District Of Columbia",
          "abbreviation": "DC"
      },
      {
          "name": "Florida",
          "abbreviation": "FL"
      },
      {
          "name": "Georgia",
          "abbreviation": "GA"
      },
      {
          "name": "Hawaii",
          "abbreviation": "HI"
      },
      {
          "name": "Idaho",
          "abbreviation": "ID"
      },
      {
          "name": "Illinois",
          "abbreviation": "IL"
      },
      {
          "name": "Indiana",
          "abbreviation": "IN"
      },
      {
          "name": "Iowa",
          "abbreviation": "IA"
      },
      {
          "name": "Kansas",
          "abbreviation": "KS"
      },
      {
          "name": "Kentucky",
          "abbreviation": "KY"
      },
      {
          "name": "Louisiana",
          "abbreviation": "LA"
      },
      {
          "name": "Maine",
          "abbreviation": "ME"
      },
      {
          "name": "Maryland",
          "abbreviation": "MD"
      },
      {
          "name": "Massachusetts",
          "abbreviation": "MA"
      },
      {
          "name": "Michigan",
          "abbreviation": "MI"
      },
      {
          "name": "Minnesota",
          "abbreviation": "MN"
      },
      {
          "name": "Mississippi",
          "abbreviation": "MS"
      },
      {
          "name": "Missouri",
          "abbreviation": "MO"
      },
      {
          "name": "Montana",
          "abbreviation": "MT"
      },
      {
          "name": "Nebraska",
          "abbreviation": "NE"
      },
      {
          "name": "Nevada",
          "abbreviation": "NV"
      },
      {
          "name": "New Hampshire",
          "abbreviation": "NH"
      },
      {
          "name": "New Jersey",
          "abbreviation": "NJ"
      },
      {
          "name": "New Mexico",
          "abbreviation": "NM"
      },
      {
          "name": "New York",
          "abbreviation": "NY"
      },
      {
          "name": "North Carolina",
          "abbreviation": "NC"
      },
      {
          "name": "North Dakota",
          "abbreviation": "ND"
      },
      {
          "name": "Ohio",
          "abbreviation": "OH"
      },
      {
          "name": "Oklahoma",
          "abbreviation": "OK"
      },
      {
          "name": "Oregon",
          "abbreviation": "OR"
      },
      {
          "name": "Pennsylvania",
          "abbreviation": "PA"
      },
      {
          "name": "Rhode Island",
          "abbreviation": "RI"
      },
      {
          "name": "South Carolina",
          "abbreviation": "SC"
      },
      {
          "name": "South Dakota",
          "abbreviation": "SD"
      },
      {
          "name": "Tennessee",
          "abbreviation": "TN"
      },
      {
          "name": "Texas",
          "abbreviation": "TX"
      },
      {
          "name": "Utah",
          "abbreviation": "UT"
      },
      {
          "name": "Vermont",
          "abbreviation": "VT"
      },
      {
          "name": "Virginia",
          "abbreviation": "VA"
      },
      {
          "name": "Washington",
          "abbreviation": "WA"
      },
      {
          "name": "West Virginia",
          "abbreviation": "WV"
      },
      {
          "name": "Wisconsin",
          "abbreviation": "WI"
      },
      {
          "name": "Wyoming",
          "abbreviation": "WY"
      }
    ];

    states.forEach((state) => {
      States.insert(state)
    });
  }

  //Add cities
  if (Cities.find().count() === 0) {
    const cities = [{
        name: 'Amarillo',
        state: 'Texas'
    }, {
        name: 'Arlington',
        state: 'Texas'
    }, {
        name: 'Austin',
        state: 'Texas'
    }, {
        name: 'Beaumont',
        state: 'Texas'
    }, {
        name: 'College Station',
        state: 'Texas'
    }, {
        name: 'Corpus Christi',
        state: 'Texas'
    }, {
        name: 'Dallas',
        state: 'Texas'
    }, {
        name: 'El Paso',
        state: 'Texas'
    }, {
        name: 'Ft. Worth',
        state: 'Texas'
    }, {
        name: 'Grand Prarie',
        state: 'Texas'
    }, {
        name: 'Houston',
        state: 'Texas'
    }, {
        name: 'Killeen',
        state: 'Texas'
    }, {
        name: 'Laredo',
        state: 'Texas'
    }, {
        name: 'Lewisville',
        state: 'Texas'
    }, {
        name: 'Longview',
        state: 'Texas'
    }, {
        name: 'Lubbock',
        state: 'Texas'
    }, {
        name: 'McAllen',
        state: 'Texas'
    }, {
        name: 'Midland',
        state: 'Texas'
    }, {
        name: 'Odessa',
        state: 'Texas'
    }, {
        name: 'Pasadena',
        state: 'Texas'
    }, {
        name: 'Pearland',
        state: 'Texas'
    }, {
        name: 'Plainview',
        state: 'Texas'
    }, {
        name: 'Plano',
        state: 'Texas'
    }, {
        name: 'Round Rock',
        state: 'Texas'
    }, {
        name: 'San Antonio',
        state: 'Texas'
    }, {
        name: 'Temple',
        state: 'Texas'
    }, {
        name: 'The Woodlands',
        state: 'Texas'
    }, {
        name: 'Tyler',
        state: 'Texas'
    }, {
        name: 'Waco',
        state: 'Texas'
    }];

    cities.forEach((city) => {
      Cities.insert(city)
    });
  }
});
