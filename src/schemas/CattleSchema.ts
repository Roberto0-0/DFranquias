import { z } from "zod"

export const CattleCreateSchema = z.object({
    code: z.string({
        required_error: "Code is required."
    }).min(4, "Invalid code.").max(4, "Invalid code."),
    amount_milk: z.number({
        required_error: "Amount of milk is required."
    }),
    amount_food: z.number({
        required_error: "Amount of food is required."
    }),
    weight: z.number({
        required_error: "Weight is required."
    }).min(0, "Invalid weight."),
    birth: z.date({
        required_error: "Date of birth is required.",
        invalid_type_error: "That's not a date."
    })
    .min(new Date("2000-01-01"), { message: "Too old." })
    .max(new Date(), { message: "Too young." })
})

export const CattleUpdateSchema = z.object({
    id: z.number({
        required_error: "Id is required." 
    }),
    code: z.string({
        required_error: "Code is required."
    }).min(4, "Invalid code.").max(4, "Invalid code."),
    amount_milk: z.number({
        required_error: "Amount of milk is required."
    }),
    amount_food: z.number({
        required_error: "Amount of food is required."
    }),
    weight: z.number({
        required_error: "Weight is required."
    }).min(0, "Invalid weight."),
    birth: z.date({
        required_error: "Date of birth is required.",
        invalid_type_error: "That's not a date!"
    })
    .min(new Date("2000-01-01"), { message: "Too old." })
    .max(new Date(), { message: "Too young." })
})