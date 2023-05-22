import express from 'express';
import authentication from './authentication';
import usersRouter from './users';
import productsRouter from './products';

const router = express.Router();

// Router
export default () => {
  authentication(router);
  router.use('/users', usersRouter);
  router.use('/products', productsRouter); // Call the updated products module with the router argument
  return router;
}
