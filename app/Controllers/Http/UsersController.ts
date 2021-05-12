import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {


  public async index ({}: HttpContextContract) {
    const user = await User.all()
    return user
  }

  public async store ({ request, response }: HttpContextContract) {
    //   try {
        const dados = request.all()
        const users = await User.create(dados)
        return response.status(201).send(users)
    //   } catch (error) {
    //     return response.status(400).send(error)
    //   }
  }

  public async show ({ params }: HttpContextContract) {
    const user = await User.find(params.id)
    return user
  }

  public async update ({ params, request, response }: HttpContextContract) {

    const user = await User.findOrFail(params.id);
    const dados = request.all();
    user.merge(dados)
    await user.save()
    return user
  }

  public async destroy ({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return response.status(204).send('registro excluído com sucesso!')
  }
}
