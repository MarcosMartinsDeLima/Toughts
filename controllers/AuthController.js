const session = require('express-session')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController{
    static login(req,resp){
        resp.render('auth/login')
    }

    static async loginPost(req,resp){
        const {email,password} = req.body

        //validar se email existe
        const user = await User.findOne({where:{email:email}})
        if(!user){
            req.flash('message','usuario não encontrado!')
            resp.render('auth/login')
            return
        }

        // checar se a senha é correta
        const passwordMatch = bcrypt.compareSync(password,user.password)
        if(!passwordMatch){
            req.flash('message','senha incorreta!')
            resp.render('auth/login')
            return
        }

        req.session.userid = user.id

        req.flash('message','Login realizado com sucesso!')

        req.session.save(()=>{
        resp.redirect('/') })
    }

    static register(req,resp){
        resp.render('auth/register')
    }

    static async registerPost(req,resp){
        const {name,email,password,confirmpassword} = req.body
        //password match validation
        if(password != confirmpassword){
            req.flash('message','as senhas não são iguais,tente novamente!')
            resp.render('auth/register')
            return
        }

        //email exist validation
        const emailExist = await User.findOne({where:{email:email}})
        if(emailExist){
            req.flash('message','email já cadastrado!')
            resp.render('auth/register')
            return
        }

        //create password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password,salt)

        const user = {
            name,
            email,
            password:hashedPassword
        }

        
           User.create(user)
           .then((user)=>{
                //initialize a session 
                req.session.userid = user.id
                
                req.flash('message','Cadastro realizado com sucesso!')

                req.session.save(()=>{
                    resp.redirect('/',session.userid)
                })
           }) .catch((err) => console.log(err))
            
           
           
        
        }

        static logout(req,resp){
            req.session.destroy()
            resp.redirect('/login')
        }
    }
    