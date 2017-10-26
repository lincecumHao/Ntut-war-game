ServiceConfiguration.configurations.remove({
    service: 'google'
});

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

ServiceConfiguration.configurations.upsert({
    service: 'facebook'
}, {
    $set: {
        appId: '293748341032599',
        loginStyle: 'popup',
        secret: '72ac9a40a9305785c39b743ae07f8345'
    }
});

ServiceConfiguration.configurations.upsert({
    service: 'google'
}, {
    $set: {
        clientId: '212363001748-meego5c21s60212i402lqv77h9iug31o.apps.googleusercontent.com',
        loginStyle: 'popup',
        secret: '92hELVCFKA0hJZqRscAjEqBM'
    }
});