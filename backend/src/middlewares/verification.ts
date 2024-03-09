import expressAsyncHandler from "express-async-handler";
import Jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

interface DecodedToken {
    _id: string;
    iat: number;
    // Add any other properties if present in your decoded token
}

const verifyJwt = expressAsyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.authToken || (req.headers.authorization && req.headers.authorization.replace("Bearer ", ""));
       
        if (!token) {
            res.status(401).json({ message: "Unauthorized request: Token missing" });
            return; // Ensure to return after sending response
        }

        // Verify token
        const decodedToken = Jwt.verify(token, "harry") as DecodedToken; // Adjust the type assertion
        
        // Attach decoded token to the request for further usage
        (req as any)._id = decodedToken._id;
        

        next(); // Call next middleware
    } catch (error) {
        console.error("Error verifying JWT:", error);
        res.status(500).json({ message: "Something went wrong while verifying" });
    }
});

export default verifyJwt;
