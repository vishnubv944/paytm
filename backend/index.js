const express = require("express");
const rootRouter = require("./routes/index")
const app = express();
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use(cors())

app.use('/api/v1', rootRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })