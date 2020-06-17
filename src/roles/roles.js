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
                component: 'Organizations',
                url: '/organizations',
                name: 'Organizations',
                icon: "icon-institution",
                layout: "/in/dashboard"
            }
        ]
    },
    dephead : {
        routes: [
            {
                component: 'Environs',
                url: '/environs',
                name: 'Environs',
                icon: "icon-group_work",
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
                icon: "icon-people",
                layout: "/in/dashboard"
            }, {
                component: 'Questionst',
                url: '/tests/questionst/:test',
                name: 'Test Questions',
                icon: "icon-file-text-o",
                layout: "/in/classroom",
                dont_show: true
            }, {
                component: 'Questionso',
                url: '/tests/questionso/:test',
                name: 'Test Questions',
                icon: "icon-th-list",
                layout: "/in/classroom",
                dont_show: true
            }
        ]
    },
    student : {
        routes: [
            {
                component: 'Classes',
                url: '/classes',
                name: 'Classes',
                icon: "icon-people_outline",
                layout: "/in/dashboard"
            },
            /* {
                component: 'Settings',
                url: '/profile-settings',
                name: 'Settings',
                icon: "tim-icons icon-settings-gear-63",
                layout: "/in/dashboard"
            },
            */
            {
                component: 'Home',
                url: '/home',
                name: 'Home',
                icon: "icon-home",
                layout: "/in/dashboard"
            }, 
            {
                component: 'Tests',
                url: '/tests',
                name: 'Tests',
                icon: "icon-pencil",
                layout: "/in/classroom"
            }, {
                component: 'TheoryTest',
                url: '/theory/:test',
                name: 'Theory Test',
                icon: "tim-icons icon-paper",
                layout: "/in/test",
                dont_show: true
            }, {
                component: 'ObjectiveTest',
                url: '/objective/:test',
                name: 'Objective Test',
                icon: "tim-icons icon-paper",
                layout: "/in/test",
                dont_show: true
            }, {
                component: 'ObjectiveTestReview',
                url: '/objective/:test/review',
                name: 'Review Objective Test',
                icon: "tim-icons icon-paper",
                layout: "/in/test",
                dont_show: true
            }
        ]
    }

}