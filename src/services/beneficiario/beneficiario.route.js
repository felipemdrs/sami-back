module.exports = (app) => {
    app.get('', (req, res, next) => {
        res.send('Hello, World!');
        next();
    });
};
