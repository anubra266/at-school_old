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
    orgadmin : {
        routes: []
    },
    dephead : {
        routes: []
    },
    educator : {
        routes: []
    },
    student : {
        routes: [
            {
                component: 'Home',
                url: '/home',
                name: 'Home',
                icon: "tim-icons icon-chart-pie-36",
                layout: "/in"
            }
        ]
    }

}