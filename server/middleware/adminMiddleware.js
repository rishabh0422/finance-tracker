import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
    // console.log(token);
  jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
    if (error) {
      console.log(`Token-middleware: ${error}`);
      return res.status(401).send({
        success: false,
        message: "unauthorized",
      });
    }
    req.data = decode;
    // console.log(`Admin Dashboard: ${req.data}`);
    
  });
  next();
};
