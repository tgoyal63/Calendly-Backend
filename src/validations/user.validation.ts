import { z } from 'zod';

const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    googleId: z.string(),
    accessToken: z.string(),
    refreshToken: z.string(),
    workingHours: z.object({
        start: z.number(),
        end: z.number(),
    }),
    duration: z.number(),
})

export default userSchema;