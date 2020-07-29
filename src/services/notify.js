import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class notify {
  date(date) {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(date).toLocaleString(undefined, options);
  }
  appname() {
    return "at-School";
  }
  APP_URL() {
    var url = window.location.hostname;
    if (url === "localhost") {
      return "http://localhost:8000/";
    }
    return "https://api.at-school.xyz/";
  }
  user(title, message, type) {
    store.addNotification({
      title: title,
      message: message,
      type: type, // 'default', 'success', 'info', 'warning'
      insert: "top", // where to add the notification to another
      container: "bottom-right", // where to position the notifications
      animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
      animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
      dismiss: {
        duration: 3000,
      },
    });
  }
  capf = (word) => {
    return word[0].toUpperCase() + word.slice(1);
  };
  convert_excel = (dresult) => {
    var data = [];
    for (var i = 0; i < dresult.length; i++) {
      var result = dresult[i];
      var obj = {};
      obj.name =
        result.user.firstName + 
        " " +
        result.user.middleName.charAt(0) +
        ". " +
        result.user.lastName;
      obj.gender = result.user.gender;
      obj.email = result.user.email;
      obj.telephone = result.user.telephone;
      obj.dateofbirth = result.user.dateOfBirth;
      obj.school = result.user.school;
      obj.school_town = result.user.school_town;
      obj.score = result.score;
      obj.total = result.total;
      obj.percentage = Math.round((result.score / result.total) * 100) + "%";
      data.push(obj);
    }
    return data;
  };
  
  searchresult(student, search) {
    var fname =
      student.firstName.toLowerCase().indexOf(search.toLowerCase()) > -1;
    var mname =
      student.middleName.toLowerCase().indexOf(search.toLowerCase()) > -1;
    var lname =
      student.lastName.toLowerCase().indexOf(search.toLowerCase()) > -1;
    var gender = student.email.toLowerCase().indexOf(search.toLowerCase()) > -1;
    var email = student.email.toLowerCase().indexOf(search.toLowerCase()) > -1;
    var telephone =
      student.telephone.toLowerCase().indexOf(search.toLowerCase()) > -1;
    var dob =
      new Date(student.dateOfBirth)
        .toLocaleDateString()
        .indexOf(search.toLowerCase()) > -1;
    var school =
      student.school.toLowerCase().indexOf(search.toLowerCase()) > -1;
    var school_town =
      student.school_town.toLowerCase().indexOf(search.toLowerCase()) > -1;
    var result =
      fname ||
      mname ||
      lname ||
      gender ||
      email ||
      telephone ||
      dob ||
      school ||
      school_town;
    return result;
  }
  chart(type, theorydata, objectivedata) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const testNum = 5;
    if (type === "theory") {
      return (canvas) => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
        var x_axis = [];
        var y_axis = [];

        theorydata.forEach((test) => {
          x_axis.push(
            new Date(test.created_at).toLocaleString(undefined, options)
          );
          y_axis.push(Math.round((test.score / test.total) * 100));
        });
        if (x_axis > testNum) {
          x_axis.slice(x_axis.length - testNum);
          y_axis.slice(y_axis.length - testNum);
        }
        return (
          x_axis.length > 1 && {
            labels: x_axis,
            datasets: [
              {
                label: "Test Percentage",
                fill: true,
                backgroundColor: gradientStroke,
                borderColor: "#1f8ef1",
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: "#1f8ef1",
                pointBorderColor: "rgba(255,255,255,0)",
                pointHoverBackgroundColor: "#1f8ef1",
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: y_axis,
              },
            ],
          }
        );
      };
    } else {
      return (canvas) => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
        var x_axis2 = [];
        var y_axis2 = [];
        objectivedata.forEach((test) => {
          x_axis2.push(
            new Date(test.created_at).toLocaleString(undefined, options)
          );
          y_axis2.push(Math.round((test.score / test.total) * 100));
        });
        if (x_axis2 > testNum) {
          x_axis2.slice(x_axis2.length - testNum);
          y_axis2.slice(y_axis2.length - testNum);
        }

        return (
          x_axis2.length > 1 && {
            labels: x_axis2,
            datasets: [
              {
                label: "Test Percentage",
                fill: true,
                backgroundColor: gradientStroke,
                borderColor: "#1f8ef1",
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: "#1f8ef1",
                pointBorderColor: "rgba(255,255,255,0)",
                pointHoverBackgroundColor: "#1f8ef1",
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: y_axis2,
              },
            ],
          }
        );
      };
    }
  }
  chartoptions() {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        // ############################## // // Chart variables
        // #############################
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 100,
              padding: 20,
              fontColor: "#9a9a9a",
            },
          },
        ],
        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a",
            },
          },
        ],
      },
    };
  }
}

export default new notify();
