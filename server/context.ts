import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { prisma } from 'lib/prisma';
import { getServerSession } from 'next-auth';
import options from 'common/config/next';

export const createContext = async (ctx: trpcNext.CreateNextContextOptions) => {
  const session = await getServerSession(ctx, options);
  const { req, res } = ctx;
  return {
    req,
    res,
    session,
    prisma,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
