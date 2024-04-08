import express from 'express';
import http, { createServer } from 'http';
import bodyParser from 'body-parser';
import cookieparser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router/index';
import productsRouter from './router/products';
import usersRouter from './router/users'
import passport from 'passport';
import path from 'path'
interface CustomError extends Error {
  status?: number;
}


const app = express();

const port = 8701;

app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}))

//Middlewares

app.use(compression());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieparser());
app.use(passport.initialize());
// app.use(passport.session())


// App routers

app.use('/users', usersRouter);
app.use('/', router())
app.use('/products', productsRouter)

// Server Configuration
const server = http.createServer(app);

app.get('/', (req:express.Request, res:express.Response) => res.send("<h1>OpenFabric Server</h1>"))
server.listen(port,()=>{ console.log('server runing on port '+ port)})
// Error customization

app.use((req, res, next)=>{
  const error = new Error('not found') as CustomError
  error.status = 404
  next(error)
});

//error handler

app.use((error: CustomError, req: express.Request, res: express.Response, next: express.NextFunction)=>{
  res.status(error.status || 500);
  res.send({
    error:{
      status: error.status || 500, message:error.message
    }
  })
})

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Mongo Database COnfiguration

const Mongod_db = 'mongodb+srv://chijiokeihedioha:Domain001@cluster0.9a8xxrz.mongodb.net/my-angular-app'
mongoose.Promise = Promise;
mongoose.connect(Mongod_db)
mongoose.connection.on('connected', () => console.log('connected to database'));
mongoose.connection.on('error', (error) => console.log(error));