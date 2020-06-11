export default {
    //role name as a key.
    new : {
        routes: [
            {
                component: 'Welcome',
                url: '/welcome'
            }
        ]
    },
    everyone : {
        routes: [
            {
                component: 'Home',
                url: '/home'
            }
        ]
    },
    orgadmin : {
        routes: [
            {
                component: 'OnlyForHeadOfOperation',
                url: '/orghome'
            }
        ]
    },
    dephead : {
        routes: [
            {
                component: 'OnlyForHeadOfOperation',
                url: '/orghome'
            }
        ]
    },
    educator : {
        routes: [
            {
                component: 'OnlyForHeadOfOperation',
                url: '/orghome'
            }
        ]
    },
    student : {
        routes: [
            {
                component: 'OnlyForHeadOfOperation',
                url: '/orghome'
            }
        ]
    }

}