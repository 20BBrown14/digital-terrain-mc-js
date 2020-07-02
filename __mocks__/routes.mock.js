const testHarness = {
  before(app) {
    const bodyParser = require('body-parser');
    const axios = require('axios');
    app.use(bodyParser.json());
    app.use((req, res, next) => {
      res.header('Access-Controler-Allow-Origin', '*');
      next();
    });

    app.get('/loggedin', (req, res) => {
      console.log(req)
      res.redirect('/')
      res.status(200);
    })
  }
}

module.exports = testHarness