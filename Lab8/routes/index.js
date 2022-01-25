const charRoutes = require('./characters');
const path = require('path');

const constructorMethod = (app) => {
    app.use('/', charRoutes);
    // app.get('/about', (req, res) => {
    //     res.sendFile(path.resolve('static/about.html'));
    // });

    app.use('*', (req, res) => {
        res.status(404).json({ error: '404, Page Not Found' });
    });
};

module.exports = constructorMethod;
