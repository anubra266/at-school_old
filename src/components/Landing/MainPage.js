import React from "react";
import {Link} from "react-router-dom";
import Login from "./subLogin.js" 

class MainPage extends React.Component {
    render() {
        return (
            <div>
                <div className="intro-section" id="home-section">
                    <div
                        className="slide-1"
                        style={{
                        backgroundImage: `url(${require("assets/images/hero_1.jpg")})`
                    }}
                        data-stellar-background-ratio="0.5">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-12">
                                    <div className="row align-items-center">
                                        <div className="col-lg-6 mb-4">
                                            <h1 data-aos="fade-up" data-aos-delay="100">Let the learning flow</h1>
                                            <p className="mb-4" data-aos="fade-up" data-aos-delay="200">We help you keep up with the flow of knowledge. Anywhere and anytime.</p>
                                            <p data-aos="fade-up" data-aos-delay="300">
                                                <Link to="/register"><a href="#at-school" className="btn btn-primary py-3 px-5 btn-pill">Join Us Now</a></Link>
                                            </p>

                                        </div>

                                        <Login />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="site-section" id="programs-section">
                    <div className="container">
                        <div className="row mb-5 justify-content-center">
                            <div className="col-lg-7 text-center" data-aos="fade-up" data-aos-delay="">
                                <h2 className="section-title">What do we have to offer?</h2>
                                <p>As we are doing our utmost best to improve, we aim to get you as close as
                                    possible to offering your students everything you'll offer them in a Physical
                                    Classroom.</p>
                            </div>
                        </div>
                        <div className="row mb-5 align-items-center">
                            <div className="col-lg-7 mb-5" data-aos="fade-up" data-aos-delay="100">
                                <img
                                    src={require("assets/images/undraw_youtube_tutorial.svg")}
                                    alt="Learning Materials"
                                    className="img-fluid"/>
                            </div>
                            <div className="col-lg-4 ml-auto" data-aos="fade-up" data-aos-delay="200">
                                <h2 className="text-black mb-4">Learning Materials</h2>
                                <p className="mb-4">Upload various forms of materials, to assist your Students in their studies.</p>

                                <div className="d-flex align-items-center custom-icon-wrap mb-3">
                                    <span className="custom-icon-inner mr-3">
                                        <span className="icon icon-file-word-o"></span>
                                    </span>
                                    <div>
                                        <h3 className="m-0">Documents such as word files, Pdf's.</h3>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center custom-icon-wrap">
                                    <span className="custom-icon-inner mr-3">
                                        <span className="icon icon-film"></span>
                                    </span>
                                    <div>
                                        <h3 className="m-0">Media Files, such as Videos and Pictures.</h3>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="row mb-5 align-items-center">
                            <div
                                className="col-lg-7 mb-5 order-1 order-lg-2"
                                data-aos="fade-up"
                                data-aos-delay="100">
                                <img
                                    src={require("assets/images/undraw_teaching.svg")}
                                    alt="Assessments"
                                    className="img-fluid"/>
                            </div>
                            <div
                                className="col-lg-4 mr-auto order-2 order-lg-1"
                                data-aos="fade-up"
                                data-aos-delay="200">
                                <h2 className="text-black mb-4">Assessments</h2>
                                <p className="mb-4">We know, one time or another, you'll have to test how much
                                    your students have learnt. We've got you covered.</p>

                                <div className="d-flex align-items-center custom-icon-wrap mb-3">
                                    <span className="custom-icon-inner mr-3">
                                        <span className="icon icon-align-left"></span>
                                    </span>
                                    <div>
                                        <h3 className="m-0">Theoretical Tests in rich editor.</h3>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center custom-icon-wrap">
                                    <span className="custom-icon-inner mr-3">
                                        <span className="icon icon-th-list"></span>
                                    </span>
                                    <div>
                                        <h3 className="m-0">Timed Computer Based Test at your convenient time.</h3>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="row mb-5 align-items-center">
                            <div className="col-lg-7 mb-5" data-aos="fade-up" data-aos-delay="100">
                                <img
                                    src={require("assets/images/undraw_teacher.svg")}
                                    alt="Easy Education"
                                    className="img-fluid"/>
                            </div>
                            <div className="col-lg-4 ml-auto" data-aos="fade-up" data-aos-delay="200">
                                <h2 className="text-black mb-4">Education made easy</h2>
                                <p className="mb-4">Everything you'll meet in there is self explanatory. No haggling or hassling.</p>

                                <div className="d-flex align-items-center custom-icon-wrap mb-3">
                                    <span className="custom-icon-inner mr-3">
                                        <span className="icon icon-bar-chart"></span>
                                    </span>
                                    <div>
                                        <h3 className="m-0">Generate Reports</h3>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center custom-icon-wrap">
                                    <span className="custom-icon-inner mr-3">
                                        <span className="icon icon-more_horiz"></span>
                                    </span>
                                    <div>
                                        <h3 className="m-0">And many more</h3>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <div className="site-section pb-0">

                    <div className="future-blobs">
                        <div className="blob_2">
                            <img src={require("assets/images/blob_2.svg")} alt="at-School"/>
                        </div>
                        <div className="blob_1">
                            <img src={require("assets/images/blob_1.svg")} alt="at-School"/>
                        </div>
                    </div>
                    <div className="container">
                        <div
                            className="row mb-5 justify-content-center"
                            data-aos="fade-up"
                            data-aos-delay="">
                            <div className="col-lg-7 text-center">
                                <h2 className="section-title">Why Choose Us</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div
                                className="col-lg-4 ml-auto align-self-start"
                                data-aos="fade-up"
                                data-aos-delay="100">

                                <div className="p-4 rounded bg-white why-choose-us-box">

                                    <div
                                        className="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                                        <div className="mr-3">
                                            <span className="custom-icon-inner">
                                                <span className="icon icon-share-square-o"></span>
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="m-0">Pass across anything to your Students</h3>
                                        </div>
                                    </div>

                                    <div
                                        className="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                                        <div className="mr-3">
                                            <span className="custom-icon-inner">
                                                <span className="icon icon-import_export"></span>
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="m-0">Import assessments unto the Platform</h3>
                                        </div>
                                    </div>

                                    <div
                                        className="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                                        <div className="mr-3">
                                            <span className="custom-icon-inner">
                                                <span className="icon icon-receipt"></span>
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="m-0">Answer Reviews after Tests</h3>
                                        </div>
                                    </div>

                                    <div
                                        className="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                                        <div className="mr-3">
                                            <span className="custom-icon-inner">
                                                <span className="icon icon-bar-chart-o"></span>
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="m-0">Generate reports for your Classes</h3>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div
                                className="col-lg-7 align-self-end"
                                data-aos="fade-left"
                                data-aos-delay="200">
                                <img
                                    src={require("assets/images/person_transparent.png")}
                                    alt="at-School reports"
                                    className="img-fluid"/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default MainPage;