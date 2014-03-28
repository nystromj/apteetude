module.exports = {
    db: 'mongodb://root:root@oceanic.mongohq.com:10065/app23251161',
    app: {
        name: 'Apteetude'
    },
    facebook: {
        clientID: '680519565341022',
        clientSecret: '2091a2c3f5ae9933a82ba538ec5bf281',
        callbackURL: 'http://rocky-waters-6979.herokuapp.com/auth/facebook/callback'
    },
    twitter: {
        clientID: 'CONSUMER_KEY',
        clientSecret: 'CONSUMER_SECRET',
        callbackURL: 'http://localhost:3000/auth/twitter/callback'
    },
    github: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    google: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    linkedin: {
        clientID: 'API_KEY',
        clientSecret: 'SECRET_KEY',
        callbackURL: 'http://localhost:3000/auth/linkedin/callback'
    }
};