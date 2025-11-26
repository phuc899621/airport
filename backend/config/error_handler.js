import HTTPError from "./http_error.js";
import DBError from "./db_error.js";
import jwt from "jsonwebtoken";

export function errorHandler(res,err){
    if (err instanceof HTTPError) {
        return res.status(err.status).json({ message: err.message, data: err.data });
    }
    if(err instanceof DBError){
        return res.status(err.status).json({ message: err.message, data: err.data, error: err.error });
    }
    switch(err.name){
        case "TokenExpiredError": return res.status(401).json({ message: "Token hết hiệu lực", data: {} });
        case "JsonWebTokenError": return res.status(401).json({ message: "Token không hợp lệ", data: {} });
        default: return res.status(500).json({ message: "Server error",error: err.message, data: {} });
    }
}