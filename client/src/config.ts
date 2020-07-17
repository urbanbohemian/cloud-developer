// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'yrysvn6db7'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  domain: 'dev-rm2ab2nj.us.auth0.com',            // Auth0 domain
  clientId: 'AtywX3S5q3KRrhINgZOeLj1ndH8GK2P4',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}