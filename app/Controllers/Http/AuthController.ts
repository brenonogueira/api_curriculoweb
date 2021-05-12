import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async register ({request, response}: HttpContextContract) {
    const dados = request.all()
    const users = await User.create(dados)
    return response.status(201).send(users)
  }

  public async login ({ request, response, auth }: HttpContextContract) {
    try {
      const email = request.input('email')
      const password = request.input('password')
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '20mins'
      })
      return token.toJSON()
    } catch {
      return response.badRequest('Credenciais Inválida')
    }

  }

  public async logout ({ request, auth, response }: HttpContextContract) {

    await auth.use('api').revoke()
    return {
      revoked: true
    }
  }
}
