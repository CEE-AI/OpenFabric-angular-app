import express from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { isOwner } from '../middleware/index';
import { UserModel } from '../database/users';
import {getUserById, deleteUserById, getUsers} from '../database/users'
import { authenticateJwt } from '../config/passport';

const usersRouter = express.Router();

  usersRouter.delete('/:id', isOwner, async (req, res) => {
    try{
			const {id} = req.params;

			const user = await deleteUserById(id);
			if(user){
				const deletedUser = await user.deleteOne()
				res.status(200).json(deletedUser)
				
			}else{
				res.status(404)
			}
		}catch(error){
			console.log(error)
			return res.sendStatus(400)
		}
  });

	usersRouter.get('/', async (req, res)=>{
		try{
			const users = await getUsers();

			return res.status(200).json(users)
		}catch (error) {
		console.log(error);
		return res.sendStatus(400);
		}
	});

	usersRouter.get('/:id', async (req, res)=>{
		try{
			const cookie = req.cookies['jwt']
			const authenticated = jwt.verify(cookie, process.env.SECRET_KEY) as JwtPayload

			if(!authenticated){
				return res.status(401).send({message: 'user not authorized'})
			}

			const user = await UserModel.findOne({_id: authenticated._id })
			if(!user){
				res.status(404).json({message: 'user not found'})
			}
			const {password,...data} = user.toJSON()
			
			res.status(200).json(data)
		}catch(error){
			console.log(error)
			res.sendStatus(400)
		}
	})

	usersRouter.patch('/:id', isOwner, async (req, res)=>{
		try{
			const { id } = req.params;
			const { username } = req.body;

			if(!username) {
				return res.sendStatus(403)
			}
			
			const user = await getUserById(id);
			if(user !== null && user !== undefined){

				user.username = username;
				await user.save();
			}
			

			return res.status(200).json(user).end()

		}catch(error){
			console.log(error)
			return res.sendStatus(500)
		}
	})
usersRouter.get("/profile", authenticateJwt,(
	req: express.Request, 
	res: express.Response, 
	next: express.NextFunction)=> res.send({user:req.user}))

export default usersRouter