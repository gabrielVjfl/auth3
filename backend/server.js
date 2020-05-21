const port = 7101

const express = require('express')

const app = express()

const bodyparser = require('body-parser')

const cors = require('cors')



const routerAuth = require("./auth/routes")



app.use(cors())

app.use(bodyparser.urlencoded({
    extended: false
}))

app.use(bodyparser.json())

app.use('/auth', routerAuth)


app.listen(port, () => {
    console.log("Rodando na porta", port)
})

