export default {
  //role name as a key.
  new: {
    routes: [
      {
        component: "Welcome",
        url: "/welcome",
      },
    ],
  },
  student: {
    routes: [
      {
        component: "Home",
        url: "/home",
        name: "Home",
        icon: "icon-home",
        layout: "/in/dashboard",
      },
      {
        component: "Settings",
        url: "/profile-settings",
        name: "Settings",
        icon: "icon-gear",
        layout: "/in/dashboard",
      },
      {
        component: "Classes",
        url: "/classes",
        name: "Classes",
        icon: "icon-people_outline",
        layout: "/in/dashboard",
      },

      {
        component: "Members",
        url: "/members",
        name: "Members",
        icon: "icon-users",
        layout: "/in/classroom",
      },
      {
        component: "Assessments",
        url: "/assessments",
        name: "Assessments",
        icon: "icon-pencil",
        layout: "/in/classroom",
      },
      {
        component: "Solutions",
        url: "/solutions",
        name: "Solutions",
        icon: "icon-question_answer",
        layout: "/in/classroom",
        only: "student",
      },
      {
        component: "Results",
        url: "/results",
        name: "Results",
        icon: "icon-receipt",
        layout: "/in/classroom",
      },
      {
        component: "TheoryTest",
        url: "/theory/:test",
        name: "Theory Test",
        icon: "tim-icons icon-paper",
        layout: "/in/test",
        dont_show: true,
      },
      {
        component: "ObjectiveTest",
        url: "/objective/:test",
        name: "Objective Test",
        icon: "tim-icons icon-paper",
        layout: "/in/test",
        dont_show: true,
      },
      {
        component: "ObjectiveTestReview",
        url: "/objective/:test/review",
        name: "Review Objective Test",
        icon: "tim-icons icon-paper",
        layout: "/in/test",
        dont_show: true,
      },
    ],
  },
  orgadmin: {
    routes: [
      {
        component: "Organizations",
        url: "/organizations",
        name: "Organizations",
        icon: "icon-institution",
        layout: "/in/dashboard",
      },
    ],
  },
  dephead: {
    routes: [
      {
        component: "Environs",
        url: "/environs",
        name: "Environs",
        icon: "icon-group_work",
        layout: "/in/dashboard",
      },
    ],
  },
  educator: {
    routes: [
      {
        component: "Classrooms",
        url: "/classrooms",
        name: "Classrooms",
        icon: "icon-people",
        layout: "/in/dashboard",
      },
      {
        component: "Questionst",
        url: "/tests/questionst/:test",
        name: "Test Questions",
        icon: "icon-file-text-o",
        layout: "/in/classroom",
        dont_show: true,
      },
      {
        component: "Questionso",
        url: "/tests/questionso/:test",
        name: "Test Questions",
        icon: "icon-th-list",
        layout: "/in/classroom",
        dont_show: true,
      },
      {
        component: "MarkAssessment",
        url: "/mark-assessment/:test/:user",
        name: "Mark Assessment",
        icon: "tim-icons icon-paper",
        layout: "/in/classroom",
        dont_show: true,
      },
      {
        component: "Submissions",
        url: "/submissions/:test",
        name: "submissions",
        icon: "tim-icons icon-paper",
        layout: "/in/classroom",
        dont_show: true,
      },
      {
        component: "Viewtresult",
        url: "/viewtresult/:test",
        name: "Viewtresult",
        icon: "tim-icons icon-paper",
        layout: "/in/classroom",
        dont_show: true,
      },
      {
        component: "Vieworesult",
        url: "/vieworesult/:test",
        name: "Vieworesult",
        icon: "tim-icons icon-paper",
        layout: "/in/classroom",
        dont_show: true,
      },
    ],
  },
};