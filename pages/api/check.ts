import { NextApiRequest, NextApiResponse } from "next";

export default async function check(req:NextApiRequest,res:NextApiResponse){
    try{
        console.log(req.cookies)
        if(req.method==='GET'){
            if(req.cookies.auth){
                res.json({message: req.cookies.auth});
            }else{
                res.status(401).json({message:'no cookies'})
            }
         
    }
    }catch(error){
        res.status(400).json({message:'wrong request'})
    }
}