export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
        REGION: "us-east-1",
        BUCKET: "drfinder-app-api-dev-attachmentsbucket-1uced7gtah8so"
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "http://localhost:3000/graphql"
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_exmP4lrFq",
        APP_CLIENT_ID: "2b74j9ui0q46kudid16jsmhtgg",
        IDENTITY_POOL_ID: "us-east-1:5fba9f5b-78a3-4124-9c31-f2837c0c330a"
    }
};
