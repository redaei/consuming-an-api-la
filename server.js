const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
var bodyParser = require('body-parser')

const axios = require('axios')

app.use(express.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

const port = process.env.PORT ? process.env.PORT : '3000'

app.get('/', (req, res) => {
  res.render('../views/index.ejs')
})

app.post('/weather', (req, res) => {
  axios({
    method: 'get',
    url: `https://api.openweathermap.org/data/2.5/weather?zip=${req.body.zipcode},us&units=imperial&appid=${process.env.API_KEY}`
  })
    .then((resp) => {
      res.render('../views/weather/show.ejs', { data: resp.data })
    })
    .catch((err) => {
      console.log(err)
    })
})

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})
