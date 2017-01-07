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
        appId: '181668918970090',
        loginStyle: 'popup',
        secret: '3e30bce75d288d4b5f3a2a5545f90f8b'
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