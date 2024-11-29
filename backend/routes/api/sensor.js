const express = require("express")
const router = express.Router()
require("dotenv").config()

const SENSOR_URL = process.env.SENSOR_URL || 5000
const SENSOR_MODE = process.env.SENSOR_MODE || "TEST"

router.get("/:id", getDataFromSensor, (req, res) => {
  res.json(res.data)
})

async function getDataFromSensor(req, res, next) {
  if (SENSOR_MODE === "TEST") {
    res.data = {
      temperature: [{ value: Math.random() * 90 - 45 }],
      humidity: [{ value: Math.random() * 100 }],
      co2: [{ value: Math.random() * 6000 }],
      tvoc: [{ value: Math.random() * 6000 }],
    }
  } else {
    try {
      const response = await fetch(`${SENSOR_URL}/api/auth/login`, {
        data: JSON.stringify({
          username: "dvlad0847@gmail.com",
          password: "al140190alo",
        }),
      }).then((data) => {
        let usrtoken = `Bearer ${data["token"]}`
        const res = fetch(
          `${SENSOR_URL}/api/plugins/telemetry/DEVICE/${req.params.id}/values/timeseries?keys=temperature,humidity,co2,tvoc`,
          {
            headers: {
              "X-Authorization": usrtoken,
            },
          }
        )
          .then((data) => {
            res.data = data
          })
          .catch((err) => {
            return res.status(500).json({ message: err.message })
          })
      })
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }

  next()
}

module.exports = router
