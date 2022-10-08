const jwt = require("jsonwebtoken");

const config = process.env;

export const verifyToken = ({ req, res, next }: any) => {
    const authorizationHeader: string = req.headers.authorization;
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
        return res.status(403).send("please preform login ! you dont have access token");
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};
