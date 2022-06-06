import { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from 'lib/prisma';

const options: NextAuthOptions = {
  debug: true,
  adapter: PrismaAdapter(prisma),
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    EmailProvider({
      server: {
        // @ts-ignore
        service: 'Mailjet',
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      const id = token.id ?? '';
      session.user = {
        email: token.email ?? '',
        id,
      };
      return session;
    },
    jwt: async ({ token }) => {
      if (token.email) {
        const user = await prisma.user.findUnique({ where: { email: token.email }, select: { id: true } });
        if (user) {
          token.id = user.id;
        }
      }
      return token;
    },
  },
};

if (process.env.NODE_ENV === 'development') {
  options.cookies = {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        path: '/',
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      },
    },
    callbackUrl: {
      name: 'next-auth.callback-url',
      options: {
        path: '/',
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      },
    },
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        path: '/',
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      },
    },
  };
};

export default options;
