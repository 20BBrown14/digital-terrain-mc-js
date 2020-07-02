import DiscordOauth2 from 'discord-oauth2';
import axios from 'axios';

const oauth = new DiscordOauth2;

const path = 'https://discord.com/api/oauth2/authorize?client_id=693123471210709072&redirect_uri=http%3A%2F%2Flocalhost%3A8080&response_type=code&scope=identify%20guilds'

const discordAuthenticate = () => {

  /* axios.get(path)
    .then((res) => { console.log(res) })
    .catch((error) => { console.log(error) }) */
  
  /* oauth.tokenRequest({
    clientId: '693123471210709072',
    clientSecret: 'BZljijWEW5IiGpziUIcQAONNklyLOpd_',

    code: 'code',
    scope: 'identify guilds',
    grantType: 'authorization_code',

    redirectUri: 'http://localhost:8080/'
  }) */
  return true;
}

export default discordAuthenticate;


// https://discord.com/api/oauth2/authorize?client_id=693123471210709072&redirect_uri=http%3A%2F%2Flocalhost%3A8080&response_type=code&scope=identify%20guilds