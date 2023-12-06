import exerciseRoutes from './exercises.js';
import logRoutes from './logs.js';

const constructorMethod = (app) => {
    app.use('/exercises', exerciseRoutes);
    app.use('/', logRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({error: 'Not found'});
    });
};

export default constructorMethod;
