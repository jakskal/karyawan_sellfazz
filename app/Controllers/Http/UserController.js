'use strict'
const User = use('App/Models/User');
class UserController {
    async login({request, auth}){
        const {email, password} = request.all();
        const token = await auth.attempt(email,password);
        return token
    }

    async register({request, response}){
        const body = request.all();
        const user = await User.create(body)
        response.status(201).send(user)
    };

    async index({request}){
        let {first_name,last_name,ktp} = request.get()
        if(first_name && last_name){
            const user = await User.query()
            .where('first_name','like',`%${first_name}%`)
            .andWhere('last_name','like',`%${last_name}%`)
            .fetch()
            return user
        }else if(first_name){
            const user = await User.query()
            .where('first_name','like',`%${first_name}%`).fetch()
            return user
        }else if(last_name){
            const user = await User.query()
            .where('last_name','like',`%${first_name}%`).fetch()
            return user
        }else if(ktp){
            const user = await User.findBy({ktp})
            return user
        }
        const users = await User.all()
        // Response.status(200)
        return users
    }

    async update({request, auth}){
        const user = await auth.getUser()
        const UpUser = await User.find(user.id)
        const {first_name, last_name, email} = request.all()
        UpUser.merge({
            first_name,
            last_name,
            email
        })
        await UpUser.save()
        return UpUser
    }
    async destroy({ auth}){
        const user = await auth.getUser()
        await user.delete()
        return {deleted_user:user}
    }

    async riwayat({request}){
        const {ktp} = request.get()
        const riwayat = await User.findBy({ktp})
        const result = riwayat.kepegawaian().fetch()
        if(!result){
            return {message :" resource not found"}
        }
        return result
    }
}

module.exports = UserController
