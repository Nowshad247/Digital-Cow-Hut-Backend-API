import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandelar from './app/middlewares/globalErrorHandelar'
import { AurhRouth } from './app/modules/auth/auth.route'
import { cowRoute } from './app/modules/cow/cow.route'
import { OrderRouter } from './app/modules/order/order.route'
import { userRoute } from './app/modules/user/user.route'
const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Auth signup
app.use('/api/v1/auth/', AurhRouth)
// GEt all User
app.use('/api/v1/users/', userRoute)
app.use('/api/v1/cow/', cowRoute)
app.use('/api/v1/order/', OrderRouter)

//Defolt Responce
app.get('/', (req: Request, res: Response) => {
  res.send('Digital Cow Hut Backend API')
})

app.use(globalErrorHandelar)

export default app
