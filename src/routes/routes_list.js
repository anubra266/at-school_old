import React from "react";
import loadable from "@loadable/component";
import Loading from "../components/Loading.js";
//import Classes from "./private/In/Classes.js"

import Home from "./private/In/Home.js";

const Questionst = loadable(() => import("./private/Classroom/Questionst.js"), {
  fallback: <Loading></Loading>,
});
const Questionso = loadable(() => import("./private/Classroom/Questionso.js"), {
  fallback: <Loading></Loading>,
});

const Classrooms = loadable(() => import("./private/In/Classrooms.js"), {
  fallback: <Loading></Loading>,
});
const Classes = loadable(() => import("./private/In/Classes.js"), {
  fallback: <Loading></Loading>,
});
const Settings = loadable(() => import("./private/In/Settings.js"), {
  fallback: <Loading></Loading>,
});
const Environs = loadable(() => import("./private/In/Environs.js"), {
  fallback: <Loading></Loading>,
});
const Organizations = loadable(() => import("./private/In/Organizations.js"), {
  fallback: <Loading></Loading>,
});
const Assessments = loadable(() =>
  import("./private/Classroom/Assessments.js")
);
const Solutions = loadable(() => import("./private/Classroom/Solutions.js"), {
  fallback: <Loading></Loading>,
});
const Members = loadable(() => import("./private/Classroom/Members.js"), {
  fallback: <Loading></Loading>,
});
const MarkAssessment = loadable(
  () => import("./private/Classroom/MarkAssessment.js"),
  {
    fallback: <Loading></Loading>,
  }
);
const Submissions = loadable(
  () => import("./private/Classroom/Submissions.js"),
  {
    fallback: <Loading></Loading>,
  }
);
const Results = loadable(() => import("./private/Classroom/Results.js"), {
  fallback: <Loading></Loading>,
});
const Viewtresult = loadable(
  () => import("./private/Classroom/Viewtresult.js"),
  {
    fallback: <Loading></Loading>,
  }
);
const Vieworesult = loadable(
  () => import("./private/Classroom/Vieworesult.js"),
  {
    fallback: <Loading></Loading>,
  }
);
const TheoryTest = loadable(() => import("./private/Test/TheoryTest.js"), {
  fallback: <Loading></Loading>,
});
const ObjectiveTest = loadable(
  () => import("./private/Test/ObjectiveTest.js"),
  {
    fallback: <Loading></Loading>,
  }
);
const ObjectiveTestReview = loadable(
  () => import("./private/Test/ObjectiveTestReview.js"),
  {
    fallback: <Loading></Loading>,
  }
);

export {
  Home,
  Settings,
  Classrooms,
  Classes,
  Environs,
  Organizations,
  Assessments,
  Solutions,
  Members,
  Questionst,
  Questionso,
  TheoryTest,
  MarkAssessment,
  Submissions,
  Results,
  Viewtresult,
  Vieworesult,
  ObjectiveTest,
  ObjectiveTestReview,
};
