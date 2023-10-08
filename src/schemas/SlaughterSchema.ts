import { z } from "zod"

export const SlaughterCheckSchema = z.object({
    alive: z.literal(true, {
        errorMap: () => ({ message: "The cattle need to be alive." })
    }),
    age: z.number({
        required_error: "Amount of milk is required."
    }).min(5, "The age limit is 4 years."),
    amount_milk: z.number({
        required_error: "Amount of milk is required."
    }).max(69, "The quantity of milk reached 70 liters."),
    amount_food: z.number({
        required_error: "Amount of food is required."
    }).min(50, "The amount of food is less than 50 kilos."),
    arrobas: z.number({
        required_error: "Arrobas is required."
    }).min(18, "The cattle have less than 18 arrobas."),
})