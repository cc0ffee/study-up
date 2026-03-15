export const validateRequest = (schema: any) => {
    return (req:any , res:any, next:any) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const formatted = result.error.format();

            const flatErrors = Object.values(formatted).flat().filter(Boolean).map((err:any) => err._errors).flat();
            return res.status(400).json({message: flatErrors.join(",    ")});
        }
        next();
    };
};