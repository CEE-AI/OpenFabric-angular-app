import express from 'express';
import { get, merge} from 'lodash'
import jwt from 'jsonwebtoken';

export const isOwner = async ( req: express.Request, res: express.Response, next: express.NextFunction ) =>{
    try{
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if(!currentUserId){
            return res.sendStatus(403)
        }

        if(currentUserId.toString() !== id) {
            return res.sendStatus(403);
        }
        next()
    }catch(error){
        console.log(error)
        return res.sendStatus(400)
    }
}
