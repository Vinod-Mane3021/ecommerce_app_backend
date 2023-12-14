export const Keys = {
    port: process.env.PORT || 3000,
    database: {
        name : process.env.MONGODB_NAME,
        url: process.env.MONGODB_URI,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        tokenLife: '7d'
    },
};
