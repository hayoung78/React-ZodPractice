import { z } from "zod";

const Schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    age: z.number(),
});
export default Schema;
