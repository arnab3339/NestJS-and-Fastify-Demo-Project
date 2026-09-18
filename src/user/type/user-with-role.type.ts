import { Prisma } from '../../generated/prisma/client.js';

export type UserWithRole = Prisma.UserGetPayload<{
    include: {
        role: true;
    };
}>;