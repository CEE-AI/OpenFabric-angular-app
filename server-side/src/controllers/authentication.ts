import express from 'express';
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser';
import { createUser, getUserById, getUserByUsername, getUsers, UserModel } from '../database/users';
import { hashedPassword} from '../helpers/index'
import jwt from 'jsonwebtoken';
import * as passport from "passport";
import * as dotenv from 'dotenv'
import users from '../router/users';
dotenv.config()

const expiresIn = 604800

// Register user

export const register = async (req: express.Request, res: express.Response) => {
  try{
    const {name, username, email, password} = req.body;

    if(!name || !username || !email || !password){
        return res.sendStatus(400)
    }

    const existingUser = await UserModel.findOne({email})

    if(existingUser) {
        return res.status(400).send({message: 'Email is already registered'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await createUser({
        name,
        email,
        username,
        password: hashedPassword,
    });
    const token = jwt.sign({_id:user._id}, process.env.SECRET_KEY || 'default_secret_key', {
      expiresIn,
    });
    res.cookie("jwt", token,{
      httpOnly: true, maxAge: 24*60*60*1000
    })

    return res.status(200).json(user);

  }catch (error) {
  console.log(error);
  return res.sendStatus(500);
  }
}

// Login user

export const login = async(req: express.Request, res: express.Response) =>{
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const token = jwt.sign({_id:user._id}, process.env.SECRET_KEY || 'default_secret_key', {
       expiresIn,
      });
    res.cookie("jwt", token,{
      httpOnly: true, maxAge: 24*60*60*1000
    })
    return res.status(200).json({success: user});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const logout = (req: express.Request, res: express.Response) =>{
  res.cookie('jwt',"",{ maxAge: 0 })

  res.send({message: 'logout successful'})
}