import loadable from "@loadable/component";

//import Classes from "./private/In/Classes.js"

import Home from "./private/In/Home.js";

import Questionst from "./private/Classroom/Questionst.js";
import Questionso from "./private/Classroom/Questionso.js";

const Classrooms = loadable(() => import("./private/In/Classrooms.js"));
const Classes = loadable(() => import("./private/In/Classes.js"));
const Settings = loadable(() => import("./private/In/Settings.js"));
const Environs = loadable(() => import("./private/In/Environs.js"));
const Organizations = loadable(() => import("./private/In/Organizations.js"));
const Assessments = loadable(() =>
  import("./private/Classroom/Assessments.js")
);
const Solutions = loadable(() => import("./private/Classroom/Solutions.js"));
const Members = loadable(() => import("./private/Classroom/Members.js"));
const MarkAssessment = loadable(() =>
  import("./private/Classroom/MarkAssessment.js")
);
const Submissions = loadable(() =>
  import("./private/Classroom/Submissions.js")
);
const Results = loadable(() => import("./private/Classroom/Results.js"));
const Viewtresult = loadable(() =>
  import("./private/Classroom/Viewtresult.js")
);
const Vieworesult = loadable(() =>
  import("./private/Classroom/Vieworesult.js")
);
const TheoryTest = loadable(() => import("./private/Test/TheoryTest.js"));
const ObjectiveTest = loadable(() => import("./private/Test/ObjectiveTest.js"));
const ObjectiveTestReview = loadable(() =>
  import("./private/Test/ObjectiveTestReview.js")
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
