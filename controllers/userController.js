import userModel from '../models/User.js';
import bcrypt from 'bcrypt';
class userController {
    static home= (req,res)=>{
        res.render("index");
    }

    static registration=(req,res)=>{
        res.render("registration");
    }
    // Without using bcrypt
    // static createUserDoc=async(req,res)=>{
    //     try {
    //         const doc=new userModel({
    //             name:req.body.name,
    //             email:req.body.email,
    //             password:req.body.password,
    //         })

    //         await doc.save();
    //         res.redirect('/login');
            
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    static createUserDoc=async(req,res)=>{
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        try {
            const doc =new userModel({
                name:req.body.name,
                email:req.body.email,
                password: hashPassword,
            })
            await doc.save();
            res.redirect("/login");
            
        } catch (error) {
            console.log(error);
        }
    }


    static login=(req,res)=>{
        res.render("login");
    }

    // static verifyLogin=async (req,res)=>{
    //     try {
            
    //         const {email,password}=req.body;
    //         console.log(email,password);
    //         const result= await userModel.findOne({email:email});
    //         if( result != null){
    //             const isMatch=await bcrypt.compare(password,result.password);
    //             if(result.email == email && result.password == password){
    //                 res.send(`<h1> Dashboard ---- ${result}`);
    //             }else{
    //                 res.send("Email or password is invalid");
    //             }
    //         }else{
    //             res.send("<h1>You're not register email</h1>");
    //         }
            
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    static verifyLogin=async(req,res)=>{
        const {email,password}=req.body;
        const result = await userModel.findOne({email:email})
        if(result != null){
            const isMatch=await bcrypt.compare(password,result.password);
            if(result.email == email && isMatch){
                res.send(`<h1> Dashboard ----- ${result}`);
            }else{
                res.send("Please enter valid email or password");
            }
        }else{
            res.send("You are not register user");
        }
    }
}



export default userController;