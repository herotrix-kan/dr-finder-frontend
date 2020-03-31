export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
        REGION: "us-east-1",
        BUCKET: "drfinder-app-api-dev-attachmentsbucket-1uced7gtah8so"
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://uq0jt4jgdl.execute-api.us-east-1.amazonaws.com/dev"
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_9ym3gxyrU",
        APP_CLIENT_ID: "3kddutctm902v8vdrnu83erlea",
        IDENTITY_POOL_ID: "us-east-1:ecb086d8-d9bf-4856-bf8e-eb7ba601e98b"
    }
};
