import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

const validate = (schema: ZodSchema<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = schema.parse(req.body);
            req.body = data;
            next();
        } catch (error) {
            return res.status(400).json({
                message: 'Validation error',
                errors: error
            })
        }
    };
};

export default validate;    