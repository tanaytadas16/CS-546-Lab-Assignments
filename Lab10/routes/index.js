const userRoutes = require('./userRoutes');
// const privateRoutes = require('./private');

const constructorMethod = (app) => {
    app.use('/', userRoutes);

    app.use('*', (req, res) => {
        res.json('Not Found');
    });
};

module.exports = constructorMethod;
