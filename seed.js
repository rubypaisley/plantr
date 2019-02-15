const db = require('./models').db;
const {Gardener, Plot, Vegetable} = require('./models').models;
db.sync({ force: true })
    .then(() => {
        return Promise.all([
            Vegetable.create({name: 'zucchini', color: 'green'}),
            Vegetable.create({name: 'carrot', color: 'orange'})]
    )})
    .then( (vegetables) => {
        console.log(vegetables[0].get());
        return Promise.all([
            Gardener.create({name: 'gardener1', age: 25, favoriteVegetableId: vegetables[0].id}),
            Gardener.create({name: 'gardener2', age: 45, favoriteVegetableId: vegetables[1].id})]
    )})
    .then( (gardeners) => {
        return Plot.create({name: 'plot1', shaded: true, gardenerId: gardeners[0].id});
    })
    .then( (plot1) => {
        return Vegetable.findAll()
            .then( (veggies) => {
                return veggies[0].addPlot(plot1)
            })
            .catch(e => console.log(e))
    })
    .catch((e) => {
        console.log(e);
    })
    .finally(() => {
        db.close();
    });


