import React from "react"
import Layout from "../components/Layout/Layout"
import ImageSlider from "../components/ImageSlider"

//TODO: CAROUSEL COMPONENT

export default function Home() {
  const slides = [
    { url: process.env.PUBLIC_URL + "/img/1.jpg", caption: "" },
    { url: process.env.PUBLIC_URL + "/img/2.jpg", caption: "" },
    { url: process.env.PUBLIC_URL + "/img/3.jpg", caption: "" },
    { url: process.env.PUBLIC_URL + "/img/4.jpg", caption: "" },
  ]

  const sliderWrapperStyles = {
    width: "100vw",
    height: "100vh",
    margin: "0 auto",
  }

  return (
    <Layout>
      <div style={sliderWrapperStyles} className="slider-wrapper">
        <ImageSlider slides={slides} />
      </div>

      {/* <div
        id="carousel-example-generic"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="container">
          <ol className="carousel-indicators">
            <li
              data-target="#carousel-example-generic"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carousel-example-generic" data-slide-to="1"></li>
            <li data-target="#carousel-example-generic" data-slide-to="2"></li>
            <li data-target="#carousel-example-generic" data-slide-to="3"></li>
          </ol>
        </div>

        <div className="carousel-inner" role="listbox">
          <div className="item active">
            <img
              className="img-responsive"
              height="600px"
              src="img/2.jpg"
              alt="Slider Image"
            />
            <div className="container">
              <div className="carousel-centered">
                <div className="margin-b-40">
                  <h1 className="carousel-title">
                    Аналітична система матеріально-технічної бази Херсонського
                    Державного Університету
                  </h1>
                </div>
                <a
                  href="1building.html"
                  className="btn-theme btn-theme-sm btn-white-brd text-uppercase"
                >
                  Дивитися
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <img
              className="img-responsive"
              height="600px"
              src="img/1.jpg"
              alt="Slider Image"
            />
            <div className="container">
              <div className="carousel-centered">
                <div className="margin-b-40">
                  <h1 className="carousel-title">
                    Аналітична система матеріально-технічної бази Херсонського
                    Державного Університету
                  </h1>
                </div>
                <a
                  href="1building.html"
                  className="btn-theme btn-theme-sm btn-white-brd text-uppercase"
                >
                  Дивитися
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <img
              className="img-responsive"
              height="600px"
              src="img/3.jpg"
              alt="Slider Image"
            />
            <div className="container">
              <div className="carousel-centered">
                <div className="margin-b-40">
                  <h1 className="carousel-title">
                    Аналітична система матеріально-технічної бази Херсонського
                    Державного Університету
                  </h1>
                </div>
                <a
                  href="1building.html"
                  className="btn-theme btn-theme-sm btn-white-brd text-uppercase"
                >
                  Дивитися
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <img
              className="img-responsive"
              height="600px"
              src="img/4.jpg"
              alt="Slider Image"
            />
            <div className="container">
              <div className="carousel-centered">
                <div className="margin-b-40">
                  <h1 className="carousel-title">
                    Аналітична система матеріальної технічної бази Херсонського
                    Державного Університету
                  </h1>
                </div>
                <a
                  href="1building.html"
                  className="btn-theme btn-theme-sm btn-white-brd text-uppercase"
                >
                  Дивитися
                </a>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="bg-color-sky-light" data-auto-height="true">
        <div className="content-lg container">
          <div className="row row-space-1 margin-b-2">
            <div className="col-sm-3 sm-margin-b-2">
              <div
                className="wow fadeInLeft"
                data-wow-duration=".3"
                data-wow-delay=".3s"
              >
                <div className="service" data-height="height">
                  <div className="service-element">
                    <i className="service-icon">
                      <img src="img/icon.png" />
                    </i>
                  </div>
                  <div className="service-info">
                    <h3>Головний корпус</h3>
                  </div>
                  <a href="1building.html" className="content-wrapper-link"></a>
                </div>
              </div>
            </div>
            <div className="col-sm-3 sm-margin-b-2">
              <div
                className="wow fadeInLeft"
                data-wow-duration=".3"
                data-wow-delay=".2s"
              >
                <div className="service" data-height="height">
                  <div className="service-element">
                    <i className="service-icon fas fa-hotel"></i>
                  </div>
                  <div className="service-info">
                    <h3>2 корпус</h3>
                  </div>
                  <a href="2building.html" className="content-wrapper-link"></a>
                </div>
              </div>
            </div>
            <div className="col-sm-3 sm-margin-b-2">
              <div
                className="wow fadeInLeft"
                data-wow-duration=".3"
                data-wow-delay=".2s"
              >
                <div className="service" data-height="height">
                  <div className="service-element">
                    <i className="service-icon fas fa-hotel"></i>
                  </div>
                  <div className="service-info">
                    <h3>5 корпус</h3>
                  </div>
                  <a href="5building.html" className="content-wrapper-link"></a>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div
                className="wow fadeInLeft"
                data-wow-duration=".3"
                data-wow-delay=".1s"
              >
                <div className="service" data-height="height">
                  <div className="service-element">
                    <i className="service-icon fas fa-building"></i>
                  </div>
                  <div className="service-info">
                    <h3>6 корпус</h3>
                  </div>
                  <a href="6building.html" className="content-wrapper-link"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
