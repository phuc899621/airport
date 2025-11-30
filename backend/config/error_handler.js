import {HTTPError, DBError, BaseError} from "./errors.js";
import jwt from "jsonwebtoken";
export function errorHandler(res,err){
    console.log(err);
    if (err instanceof BaseError) {
        return res.status(err.status).json({ 
            success: false,
            error: err.toJSON()
        });
    }
    if (err.name === "TokenExpiredError") {
        return res.status(401).json({
        success: false,
        error: {
            type: "Authentication Error",
            detail: "Token hết hiệu lực",
        }
        });
    }

    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
        success: false,
        error: {
            type: "Authentication Error",
            detail: "Token không hợp lệ",
        }
        });
    }

    return res.status(500).json({
        success: false,
        error: {
            type: "Server Error",
            detail: err.detail || err.message,
        }
    });
    
}