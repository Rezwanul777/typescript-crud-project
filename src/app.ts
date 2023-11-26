import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/config/modules/user/user.route'
const app: Application = express()

//parsers
app.use(express.json())
app.use(cors())

//api endpoint
app.use('/api/users', StudentRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

console.log(process.cwd())

export default app
