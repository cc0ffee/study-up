import {z} from "zod"

const addToLocationSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string().optional(),
    address: z.string(),
    neighborhood: z.string().optional(),
    latitude: z.float64(),
    longitude: z.float64(),
    locationType: z.enum(["CAFE", "LIBRARY", "SPACE"], {
        error: () => ({
            message: "locationType must be one of: CAFE, LIBRARY, SPACE"
        })
    }).optional(),
    seatingLevel: z.enum(["LOW", "MEDIUM", "HIGH"], {
        error: () => ({
            message: "seatingLevel must be one of: LOW, MEDIUM, HIGH"
        })
    }),
    quietLevel: z.coerce.number()
    .int("quietLevel must be an integer")
    .min(1, "quietLevel must be between 1 and 5").max(5, "quietLevel must be between 1 and 5")
    .optional(),
    hasWifi: z.boolean().optional(),
    hasOutlets: z.boolean().optional(),
})