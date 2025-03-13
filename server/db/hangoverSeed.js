const {
  Hangovers,
  Symptoms,
  PastDrinks,
  PastMixers,
  PastFoods,
} = require('./index');

const models = [Hangovers, Symptoms, PastDrinks, PastMixers, PastFoods];

const hangoverData = [
  {
    name: 'Sunrise over Big Daddys',
    day: '2025-25-02',
    pastWater: 3,
    additional: false,
  },
  {
    name: 'Happy birthday, Jenna',
    day: '2025-01-03',
    pastWater: 2,
    additional: true,
    notes: 'skittles and pop-rocks',
  },
  {
    name: 'Mardi Gras!!',
    day: '2025-04-03',
    pastWater: 5,
    additional: true,
    notes: 'tabs and spacebars',
  },
];

const symptomsData = [
  {
    name: 'headache',
    severity: 4,
    duration: 3,
    hangRef: 1 /* reference to above hangover */,
  },
  {
    name: 'nausea',
    severity: 6,
    duration: 5,
    hangRef: 1 /* reference to above hangover */,
  },
  {
    name: 'sweats',
    severity: 2,
    duration: 2,
    hangRef: 1 /* reference to hangover */,
  },
  {
    name: 'Shakes',
    severity: 3,
    duration: 2,
    hangRef: 2 /* reference to hangover */,
  },
  {
    name: 'headache',
    severity: 8,
    duration: 4,
    hangRef: 2 /* reference to hangover */,
  },
  {
    name: 'nausea',
    severity: 6,
    duration: 7,
    hangRef: 2 /* reference to hangover */,
  },
  {
    name: 'headache',
    severity: 11,
    duration: 4,
    hangRef: 3 /* reference to hangover */,
  },
  {
    name: 'nausea',
    severity: 5,
    duration: 10,
    hangRef: 3 /* reference to hangover */,
  },
  {
    name: 'depression',
    severity: 4,
    duration: 12,
    hangRef: 3 /* reference to hangover */,
  },
  {
    name: 'light sensitivity',
    severity: 9,
    duration: 8,
    hangRef: 3 /* reference to hangover */,
  },
];

const pastDrinksData = [
  {
    name: 'tequila',
    shots: 5,
    timeSpan: 4, // timespan will be in hours
    hangRef: 1,
  },
  {
    name: 'rum',
    shots: 3,
    timeSpan: 4,
    hangRef: 1,
  },
  {
    name: 'tequila',
    timeSpan: 10,
    shots: 5,
    hangRef: 2,
  },
  {
    name: 'red wine',
    shots: 3, // I guess for wine, it will be by glasses
    timeSpan: 5,
    hangRef: 2,
  },
  {
    name: 'tequila',
    shots: 14,
    timeSpan: 12,
    hangRef: 3,
  },
  {
    name: 'rum',
    shots: 4,
    timeSpan: 12,
    hangRef: 3,
  },
  {
    name: 'everclear',
    shots: 3,
    timeSpan: 12,
    hangRef: 3,
  },
];

const pastFoodsData = [
  {
    name: 'shrimp po-boy',
    hangRef: 1,
  },
  {
    name: 'cake',
    hangRef: 2,
  },
  {
    name: 'cake',
    hangRef: 3,
  },
  {
    name: 'fried chicken',
    hangRef: 3,
  },
];
const pastMixersData = [
  {
    name: 'orange juice',
    hangRef: 1,
  },
  {
    name: 'orange juice',
    hangRef: 2,
  },
  {
    name: 'orange juice',
    hangRef: 3,
  },
];
const seeds = [
  hangoverData,
  symptomsData,
  pastDrinksData,
  pastMixersData,
  pastFoodsData,
];

// const seedDb = (model, array) => {
//   model
//     .destroy({
//       where: {},
//     })
//     .then(() => console.log(`${model} successfully destroyed`))
//     .then(() => {
//       model.bulkCreate(array, { ignoreDuplicates: true });
//     })
//     .catch((err) => console.error('failed to seed table', err));
// };

// const seedAll = (modArr) => {
//   modArr.forEach((mod, i) => {
//     seedDb(mod, seeds[i]);
//   });
// };
// seedAll(models);

const seedHangover = () => {
  Hangovers.destroy({
    where: {},
  })
    .then(() => console.log('Hangovers successfully destroyed'))
    .then(() => {
      Hangovers.bulkCreate(hangoverData, { ignoreDuplicates: true });
    })
    .catch((err) => console.error('failed to seed Hangovers', err));
};
const seedSymptoms = () => {
  Symptoms.destroy({
    where: {},
  })
    .then(() => console.log('Symptoms successfully destroyed'))
    .then(() => {
      Symptoms.bulkCreate(symptomsData, { ignoreDuplicates: true });
    })
    .catch((err) => console.error('failed to seed Symptoms', err));
};
const seedPastDrinks = () => {
  PastDrinks.destroy({
    where: {},
  })
    .then(() => console.log('PastDrinks successfully destroyed'))
    .then(() => {
      PastDrinks.bulkCreate(pastDrinksData, { ignoreDuplicates: true });
    })
    .catch((err) => console.error('failed to seed PastDrinks', err));
};
const seedPastFoods = () => {
  PastFoods.destroy({
    where: {},
  })
    .then(() => console.log('PastFoods successfully destroyed'))
    .then(() => {
      PastFoods.bulkCreate(pastFoodsData, { ignoreDuplicates: true });
    })
    .catch((err) => console.error('failed to seed PastFoods', err));
};
const seedPastMixers = () => {
  PastMixers.destroy({
    where: {},
  })
    .then(() => console.log('PastMixers successfully destroyed'))
    .then(() => {
      PastMixers.bulkCreate(pastMixersData, { ignoreDuplicates: true });
    })
    .catch((err) => console.error('failed to seed PastMixers', err));
};
seedHangover();
seedSymptoms();
seedPastDrinks();
seedPastMixers();
seedPastFoods();
