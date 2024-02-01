import React from "react"

export default function PageScripts() {
  return (
    <div>
      <a href="javascript:void(0);" className="js-back-to-top back-to-top">
        Top
      </a>
      <script
        src={process.env.PUBLIC_URL + "/vendor/jquery.min.js"}
        type="text/javascript"
      ></script>
      <script
        src={process.env.PUBLIC_URL + "/vendor/jquery-migrate.min.js"}
        type="text/javascript"
      ></script>
      <script
        src={process.env.PUBLIC_URL + "/vendor/bootstrap/js/bootstrap.min.js"}
        type="text/javascript"
      ></script>
      <script
        src={process.env.PUBLIC_URL + "/vendor/jquery.easing.js"}
        type="text/javascript"
      ></script>
      <script
        src={process.env.PUBLIC_URL + "/vendor/jquery.back-to-top.js"}
        type="text/javascript"
      ></script>
      <script
        src={process.env.PUBLIC_URL + "/vendor/jquery.smooth-scroll.js"}
        type="text/javascript"
      ></script>
      <script
        src={process.env.PUBLIC_URL + "/vendor/jquery.wow.min.js"}
        type="text/javascript"
      ></script>
      <script
        src={process.env.PUBLIC_URL + "/vendor/swiper/js/swiper.jquery.min.js"}
        type="text/javascript"
      ></script>
      <script
        src={
          process.env.PUBLIC_URL + "/vendor/masonry/jquery.masonry.pkgd.min.js"
        }
        type="text/javascript"
      ></script>
      <script
        src={
          process.env.PUBLIC_URL + "/vendor/masonry/imagesloaded.pkgd.min.js"
        }
        type="text/javascript"
      ></script>
      <script
        src={process.env.PUBLIC_URL + "/js/layout.min.js"}
        type="text/javascript"
      ></script>
      <script
        src={process.env.PUBLIC_URL + "/js/components/wow.min.js"}
        type="text/javascript"
      ></script>
      <script
        src={process.env.PUBLIC_URL + "/js/components/swiper.min.js"}
        type="text/javascript"
      ></script>
      <script
        src={process.env.PUBLIC_URL + "/js/components/masonry.min.js"}
        type="text/javascript"
      ></script>
    </div>
  )
}
