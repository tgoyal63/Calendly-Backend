import { z } from 'zod';

const meetingSchema = z.object({
    guestEmail: z.string().email(),
    guestName: z.string(),
    start: z.string(),
    end: z.string(),
});

export default meetingSchema;