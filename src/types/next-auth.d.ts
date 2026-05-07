import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      avatar?: string
      bio?: string
    }
  }

  interface User {
    id: string
    name: string
    email: string
    avatar?: string
    bio?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    avatar?: string
  }
}
