import jwt from 'jsonwebtoken';

function verifyJWT(req,res,next){
  const [type, token] = req.get('Authorization').split(' ');
  if(type !== 'Bearer'){
    console.log('Rejecting JWT with incorrect type as: ');
    console.log(type);
    console.log('Authorization header as: ');
    console.log(req.get('Authorization'));
    res.sendStatus(400);
    return;
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if(err || !decodedToken){
      res.status(400).send(err);
      console.log("JWT Token verification failed with err: ");
      console.log(err);
      console.log("Attempted decoded token as: ");
      console.log(decodedToken);
      return;
    }
    req.token = decodedToken;
    next();
  });
}

export default verifyJWT;
