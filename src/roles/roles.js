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
        routes: [
            {
                component: 'Home',
                url: '/organizations',
                name: 'Organizations',
                icon: "tim-icons icon-istanbul",
                layout: "/in/dashboard"
            }
        ]
    },
    dephead : {
        routes: [
            {
                component: 'Home',
                url: '/environs',
                name: 'Environs',
                icon: "tim-icons icon-bank",
                layout: "/in/dashboard"
            }
        ]
    },
    educator : {
        routes: [
            {
                component: 'Classrooms',
                url: '/classrooms',
                name: 'Classrooms',
                icon: "tim-icons icon-molecule-40",
                layout: "/in/dashboard"
            }
        ]
    },
    student : {
        routes: [
            {
                component: 'Home',
                url: '/home',
                name: 'Home',
                icon: "tim-icons icon-chart-pie-36",
                layout: "/in/dashboard"
            },
            {
                component: 'Classes',
                url: '/classes',
                name: 'Classes',
                icon: "tim-icons icon-paper",
                layout: "/in/dashboard"
            },
            {
                component: 'Settings',
                url: '/profile-settings',
                name: 'Settings',
                icon: "tim-icons icon-settings-gear-63",
                layout: "/in/dashboard"
            }
        ]
    }

}