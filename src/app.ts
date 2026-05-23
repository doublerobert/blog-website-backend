import express from "express"
import testRoute from "./routes/test.ts"


const app = express()

app.use("/", testRoute)

export default app