import { authMthUsernamePasswordRepository } from '../../repositories'

export interface ICreateUser
{
  email: string,
  password: string
}

export const createUserConsole = async (argv:ICreateUser) => {
  const user = await authMthUsernamePasswordRepository.create({
    username: argv.email,
    password: argv.password
  })

  console.log('User created: ')
  console.log(user)

  return true
}
