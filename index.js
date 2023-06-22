const express = require("express")
const path = require ("path")
require('dotenv').config()

const PORT = process.env.PORT || 4000

const app = express()

app.use(express.static("public"))   //allow pages from other dirs read those .js and .css files

app.set('view engine', 'ejs')       //template to render html files with params

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"))
})

app.get("/points-map", (req, res) => {
  // res.sendFile(path.join(__dirname, "/views/pages/points/index.html"))             //render HTML file
  res.render('pages/points', {GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY})  //render ESJ template file
})

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))