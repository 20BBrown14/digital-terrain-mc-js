/* eslint-disable global-require */

const testHarness = {
  before(app) {
    const bodyParser = require('body-parser');
    app.use(bodyParser.json());

    app.get('/serverRules', (req, res) => {
      const rulesJson = require('./rules.json');
      res.json(rulesJson);
    });

    app.get('/serverInformation', (req, res) => {
      const serverInformation = require('./serverInformation.json');
      res.json(serverInformation);
    });

    app.get('/aboutUsInformation', (req, res) => {
      const aboutUsInformation = require('./adminModsUUID.json');
      res.json(aboutUsInformation);
    });

    app.get('/veteransInformation', (req, res) => {
      const veteransInformation = require('./veterans.json');
      res.json(veteransInformation);
    });

    app.post('/save', (req, res) => {
      res.json(req.body.JSON);
    });

    app.post('/applicationsubmit', (req, res) => {
      res.sendStatus(204);
    });
  },
};

module.exports = testHarness;
