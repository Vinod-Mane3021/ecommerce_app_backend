import z, { string } from "zod";

const userSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  mobileNumber: z.string().max(10),
  password: z.string().min(4).max(8),
});

export { userSchema };

