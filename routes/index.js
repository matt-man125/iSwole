import textanalyzerRoutes from './textanalyzer.js';

const constructorMethod = (app) => {
  app.use('/', textanalyzerRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;