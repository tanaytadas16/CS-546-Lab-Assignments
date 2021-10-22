const peopleroutes = require('./people');
const stockroutes = require('./stocks');

const constructorMethod = (app) => {
    app.use('/people', peopleroutes);
    app.use('/stocks', stockroutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
};
module.exports = constructorMethod;
