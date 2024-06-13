import { z } from "zod";
import { patterns } from "../../constants";

export const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .refine((email) => patterns.email.test(email), {
      message: "email not valid",
    }),
  states: z.array(z.string()).min(1, { message: "" }).max(2),
  languagesSpoken: z.array(z.string()),
  gender: z.string().min(1),
  skills: z.array(z.string()).max(2),
  registrationDateAndTime: z.date(),
});

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  variant: "create",
  email: "",
  name: "",
  states: [],
  languagesSpoken: [],
  gender: "",
  skills: [],
  registrationDateAndTime: new Date(),
  formerEmploymentPeriod: [new Date(), new Date()],
  salaryRange: [0, 2000],
  isTeacher: false,
};
