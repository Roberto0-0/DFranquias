import { z } from "zod"

export const SlaughterCheckSchema = z.object({
    alive: z.literal(true, {
        errorMap: () => ({ message: "The cattle need to be alive." })
    }),
    age: z.number({
        required_error: "Age is required."
    }).min(5, "The age limit is 4 years."),
    amount_milk: z.number({
        required_error: "Amount of milk is required."
    }).max(69, "Above 70 liters."),
    amount_food: z.number({
        required_error: "Amount of food is required."
    }).min(50, "Under 50 kilos of food."),
    arrobas: z.number({
        required_error: "Arrobas is required."
    }).min(18, "Below 18 arrobas."),
})