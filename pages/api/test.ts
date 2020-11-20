import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function test(req:NextApiRequest,res:NextApiResponse){
    try{
        if(req.method==='GET'){
            res.setHeader('Set-Cookie', cookie.serialize('auth', 'hello', {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 3600,
                path: '/'
              }))
              res.json({message: 'Welcome back to the app!'});
        }
    }catch(error){
        res.status(400).json({message:'wrong request'})
    }
}