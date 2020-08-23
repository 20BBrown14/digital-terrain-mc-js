/* eslint-disable global-require */

const testHarness = {
  before(app) {
    const bodyParser = require('body-parser');
    const axios = require('axios');
    const formUrlEncode = require('form-urlencoded').default;
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

    app.get('/loadApps', (req, res) => {
      const appsJson = require('./appsMock.json');
      const filteredApps = appsJson.filter((application) => (
        application.status === req.query.applicationFilter
      ));
      res.json(filteredApps);
    });

    app.post('/updateappstatus', (req, res) => {
      res.sendStatus(204);
    });

    app.post('/deleteapp', (req, res) => {
      res.sendStatus(204);
    });

    app.get('/galleryImages', (req, res) => {
      const { isFeatured } = req.query;
      let images = require('./imagesMock.json');
      if (isFeatured === 'true') {
        images = images.filter((image) => (
          image.isFeatured
        ));
      }
      res.json(images);
    });

    app.post('/deleteImage', (req, res) => {
      res.sendStatus(204);
    });

    app.post('/toggleFeaturedImage', (req, res) => {
      res.sendStatus(204);
    });

    app.post('/imageUpload', (req, res) => {
      res.sendStatus(204);
    });

    app.get('/loggedin', (req, res) => {
      const environment = require('../.env.json');
      if (req.query.code) {
        const data = {
          client_id: '693123471210709072',
          client_secret: environment.discord_client_secret,
          grant_type: 'authorization_code',
          code: req.query.code,
          redirect_uri: 'http://localhost:3000/loggedin',
          scope: 'identify guilds',
        };
        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
        };
        const encodedData = formUrlEncode(data);
        axios({
          method: 'post',
          url: 'https://discord.com/api/v6/oauth2/token',
          data: encodedData,
          headers,
        })
          .then(() => { res.redirect('/'); });
      }
    });
  },
};

module.exports = testHarness;
