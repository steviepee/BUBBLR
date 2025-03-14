const {
  Hangover,
  Symptom,
  PastDrink,
  PastMixer,
  PastFood,
} = require('./index');

// const models = [Hangover, Symptom, PastDrink, PastMixer, PastFood];

const hangoverData = [
  {

    name: 'Sunrise over Big Daddys',
    day: '2025-02-25 08:00:00',
    pastWater: 3,
    additional: false,
  },
  {
    name: 'Happy birthday, Jenna',
    day: '2025-03-01 08:00:00',
    pastWater: 2,
    additional: true,
    notes: 'skittles and pop-rocks',
  },
  {
    name: 'Mardi Gras!!',
    day: '2025-03-04 08:00:00',
    pastWater: 5,
    additional: true,
    notes: 'tabs and spacebars',
  },
];

const symptomData = [
  {
    name: 'headache',
    severity: 4,
    duration: 3,
    hang_symptom: 1 /* reference to above hangover */,
  },
  {
    name: 'nausea',
    severity: 6,
    duration: 5,
    hang_symptom: 1 /* reference to above hangover */,
  },
  {
    name: 'sweats',
    severity: 2,
    duration: 2,
    hang_symptom: 1 /* reference to hangover */,
  },
  {
    name: 'Shakes',
    severity: 3,
    duration: 2,
    hang_symptom: 2 /* reference to hangover */,
  },
  {
    name: 'headache',
    severity: 8,
    duration: 4,
    hang_symptom: 2 /* reference to hangover */,
  },
  {
    name: 'nausea',
    severity: 6,
    duration: 7,
    hang_symptom: 2 /* reference to hangover */,
  },
  {
    name: 'headache',
    severity: 11,
    duration: 4,
    hang_symptom: 3 /* reference to hangover */,
  },
  {
    name: 'nausea',
    severity: 5,
    duration: 10,
    hang_symptom: 3 /* reference to hangover */,
  },
  {
    name: 'depression',
    severity: 4,
    duration: 12,
    hang_symptom: 3 /* reference to hangover */,
  },
  {
    name: 'light sensitivity',
    severity: 9,
    duration: 8,
    hang_symptom: 3 /* reference to hangover */,
  },
];

const pastDrinkData = [
  {
    name: 'tequila',
    shots: 5,
    timeSpan: 4, // timeSpan will be in hours
    hang_drink: 1,
  },
  {
    name: 'rum',
    shots: 3,
    timeSpan: 4,
    hang_drink: 1,
  },
  {
    name: 'tequila',
    timeSpan: 10,
    shots: 5,
    hang_drink: 2,
  },
  {
    name: 'red wine',
    shots: 3, // I guess for wine, it will be by glasses
    timeSpan: 5,
    hang_drink: 2,
  },
  {
    name: 'tequila',
    shots: 14,
    timeSpan: 12,
    hang_drink: 3,
  },
  {
    name: 'rum',
    shots: 4,
    timeSpan: 12,
    hang_drink: 3,
  },
  {
    name: 'everclear',
    shots: 3,
    timeSpan: 12,
    hang_drink: 3,
  },
];

const pastFoodData = [
  {
    name: 'shrimp po-boy',
    hang_drink: 1,
  },
  {
    name: 'cake',
    hang_drink: 2,
  },
  {
    name: 'cake',
    hang_drink: 3,
  },
  {
    name: 'fried chicken',
    hang_drink: 3,
  },
];
const pastMixerData = [
  {
    name: 'orange juice',
    hang_mixer: 1,
  },
  {
    name: 'orange juice',
    hang_mixer: 2,
  },
  {
    name: 'orange juice',
    hang_mixer: 3,
  },
];
// const seeds = [
//   hangoverData,
//   symptomData,
//   pastDrinkData,
//   pastMixerData,
//   pastFoodData,
// ];

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

const seedHangovers = () => {
  Hangover.destroy({
    where: {},
  })
    .then(() => console.log('Hangovers successfully destroyed'))
    .then(() => {
      Hangover.bulkCreate(hangoverData, { ignoreDuplicates: true });
    })
    .catch((err) => console.error('failed to seed Hangovers', err));
};
const seedSymptoms = () => {
  Symptom.destroy({
    where: {},
  })
    .then(() => console.log('Symptoms successfully destroyed'))
    .then(() => {
      Symptom.bulkCreate(symptomData, { ignoreDuplicates: true });
    })
    .catch((err) => console.error('failed to seed Symptoms', err));
};
const seedPastDrinks = () => {
  PastDrink.destroy({
    where: {},
  })
    .then(() => console.log('PastDrinks successfully destroyed'))
    .then(() => {
      PastDrink.bulkCreate(pastDrinkData, { ignoreDuplicates: true });
    })
    .catch((err) => console.error('failed to seed PastDrinks', err));
};
const seedPastFoods = () => {
  PastFood.destroy({
    where: {},
  })
    .then(() => console.log('PastFoods successfully destroyed'))
    .then(() => {
      PastFood.bulkCreate(pastFoodData, { ignoreDuplicates: true });
    })
    .catch((err) => console.error('failed to seed PastFoods', err));
};
const seedPastMixers = () => {
  PastMixer.destroy({
    where: {},
  })
    .then(() => console.log('PastMixers successfully destroyed'))
    .then(() => {
      PastMixer.bulkCreate(pastMixerData, { ignoreDuplicates: true });
    })
    .catch((err) => console.error('failed to seed PastMixers', err));
};
seedHangovers();
seedSymptoms();
seedPastDrinks();
seedPastMixers();
seedPastFoods();
