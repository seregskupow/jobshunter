import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import jwt from 'next-auth/jwt'
const database = []
const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
      
    }),
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Add logic here to look up the user from the credentials supplied
        try {
          let isExist = database.find((user) => user.username === credentials.username)
          const {username,name,email,password} = credentials;
          const user = { id: database.length, username,name:name,email, password }
          console.log(credentials)
          if (user) {
            if (isExist === undefined) {
              database.push(user)
              console.log(database);
              return Promise.resolve(user)
            }
            return Promise.resolve(new Error('user alreade exist'))
          } else {
            // If you return null or false then the credentials will be rejected
            return Promise.resolve(null)
            // You can also Reject this callback with an Error or with a URL:
            // return Promise.reject(new Error('error message')) // Redirect to error page
            // return Promise.reject('/path/to/redirect')        // Redirect to a URL
          }
        } catch (e) {
          console.log(e.message)
        }
      }
    })
    // ...add more providers here
  ],
  session: {
    jwt: true,
    maxAge:24*60*60
  },
  jwt: {
    secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw'
  },
  callbacks: {
    signIn: async (user, account, profile) => {
      console.log(user)
      console.log(account)
      console.log(profile)
    },
  }
  ,
  // A database is optional, but required to persist accounts in a database
  database: 'mongodb+srv://sergey:serglink12345@cluster0-flzke.mongodb.net/test?retryWrites=true&w=majority',
}

export default async (req, res) => {
  NextAuth(req, res, options)
}