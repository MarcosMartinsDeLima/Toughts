const User = require('../models/User')
const Toughts = require('../models/Thoughts')
const {Op} = require('sequelize') 

module.exports = class ToughtsController{
    static  async showToughts(req,resp){

        let search = ''
        if(req.query.search){
            search = req.query.search
        }

        let order = 'DESC'

        if(req.query.order === 'old'){
            order = 'ASC'
        }

        const tought = await Toughts.findAll({include:User,where:{title:{[Op.like]:`%${search}%`}},order:[['createdAt',order]]})
        const toughts = tought.map((result)=>result.get({plain:true}))

        let toughtsQty = toughts.length
        console.log(toughtsQty)

        if(toughtsQty === 0){
            toughtsQty = false
        }

        resp.render('toughts/home',{toughts,search,toughtsQty})
    }

    static async dashboard(req,resp){
        const userid = req.session.userid
        const user = await User.findOne({where:{id:userid},include:Toughts,plain:true})
        
        //check if user exist
        if(!user){
            resp.redirect('/login')
        }

        const toughts = user.Toughts.map((result)=>result.dataValues)

        let emptyToughts = false
        if(toughts.length === 0){
            emptyToughts = true
        }

        resp.render('toughts/dashboard',{toughts,emptyToughts})
    }

    static createTought(req,resp){
        resp.render('toughts/create')
    }

    static async createToughtSave(req,resp){
        const tought = {
            title :req.body.title,
            UserId : req.session.userid
        }

        Toughts.create(tought)
        
        req.flash('message','Pensamento criado com sucesso!')

        req.session.save(()=>{
            resp.redirect('/toughts/dashboard')
        })
    }

    static async removeTought(req,resp){
        const id = req.body.id
        const userid = req.session.userid

        await Toughts.destroy({where:{id:id,UserId:userid}})

        req.flash('message','Pensamento removido com sucesso!')

        req.session.save(()=>{
            resp.redirect('/toughts/dashboard')
        })
    }

    static async editTought(req,resp){
        const id = req.params.id
        const tought = await Toughts.findOne({where:{id:id},raw:true})

        resp.render('toughts/edit',{tought})
    }

    static async editToughtSave(req,resp){
        const id = req.body.id
        const tought = {
            title : req.body.title
        }

        await Toughts.update(tought,{where:{id:id}})

        req.flash('message','Pensamento atualizado com sucesso!')

        req.session.save(()=>{
            resp.redirect('/toughts/dashboard')
        })
    }
}