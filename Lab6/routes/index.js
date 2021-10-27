const resttRoutes = require('./restaurants');
const reviewRoutes = require('./reviews');

const constructorMethod = (app) => {
    app.use('/restaurants', resttRoutes);
    app.use('/reviews', reviewRoutes);

    app.use('*', (req, res) => {
        res.sendStatus(404).json({
            error: 'Not Found',
        });
    });
};

module.exports = constructorMethod;
