import initializeBasicAuth from 'nextjs-basic-auth'

const users = [
  {
    user: process.env.NEXT_PUBLIC_BASIC_AUTH_USER!,
    password: process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD!
  }
]

export default initializeBasicAuth({ users })
