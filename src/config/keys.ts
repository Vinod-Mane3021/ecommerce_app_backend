export const Keys = {
    port: process.env.PORT || 3000,
    cors: process.env.CORS_ORIGIN,
    database: {
        uri: process.env.MONGODB_URI,
        name : process.env.MONGODB_NAME,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        tokenLife: process.env.TOKEN_EXPIRY
    },
    stripe: {
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        secretKey: process.env.STRIPE_SECRET_KEY,
    }
};
