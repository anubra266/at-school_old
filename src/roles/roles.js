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
            },
            {
                component: 'Questionst',
                url: '/tests/questionst/:test',
                name: 'Test Questions',
                icon: "tim-icons icon-paper",
                layout: "/in/classroom",
                dont_show:true
            },
            {
                component: 'Questionso',
                url: '/tests/questionso/:test',
                name: 'Test Questions',
                icon: "tim-icons icon-paper",
                layout: "/in/classroom",
                dont_show:true
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
            }, {
                component: 'Classes',
                url: '/classes',
                name: 'Classes',
                icon: "tim-icons icon-paper",
                layout: "/in/dashboard"
            }, {
                component: 'Settings',
                url: '/profile-settings',
                name: 'Settings',
                icon: "tim-icons icon-settings-gear-63",
                layout: "/in/dashboard"
            }, {
                component: 'Tests',
                url: '/tests',
                name: 'Tests',
                icon: "tim-icons icon-paper",
                layout: "/in/classroom"
            },
            {
                component: 'TheoryTest',
                url: '/theory/:test',
                name: 'Theory Test',
                icon: "tim-icons icon-paper",
                layout: "/in/test",
                dont_show:true
            },
            {
                component: 'ObjectiveTest',
                url: '/objective/:test',
                name: 'Objective Test',
                icon: "tim-icons icon-paper",
                layout: "/in/test",
                dont_show:true
            },
            {
                component: 'ObjectiveTestReview',
                url: '/objective/:test/review',
                name: 'Review Objective Test',
                icon: "tim-icons icon-paper",
                layout: "/in/test",
                dont_show:true
            }
        ]
    }

}