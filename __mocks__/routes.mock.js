const testHarness = {
  before(app) {
    const bodyParser = require('body-parser');
    const axios = require('axios');
    const formUrlEncode = require('form-urlencoded').default;
    app.use(bodyParser.json());
    app.use((req, res, next) => {
      res.header('Access-Controler-Allow-Origin', '*');
      next();
    });

    app.get('/loggedin', (req, res) => {
      if(req.query.code) {
        const data = {
          'client_id': '727970691089170534',
          'client_secret': 'vMkSAKS3xeI9M5mU9pBTLcPGTvTaJm6U',
          'grant_type': 'authorization_code',
          'code': req.query.code,
          'redirect_uri': 'http://localhost:8080/loggedin',
          'scope': 'identify guilds',
        }
        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
        axios({
          method: 'post',
          url: 'https://discord.com/api/v6/oauth2/token',
          data: formUrlEncode(data),
          headers: headers,
        }) 
        .then((tokeResponse) => { console.log(tokeResponse); res.redirect('/')})
        .catch((error) => { console.log(error); console.log('error response')})
        //res.status(200);
      }
      else {
        console.log('no code', req);
      }
    })

    app.get('/callback', (req, res) => {
      console.log(req);
      console.log('callback')
    });
  }
}

module.exports = testHarness