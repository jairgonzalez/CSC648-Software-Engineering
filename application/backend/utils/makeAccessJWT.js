import jwt from 'jsonwebtoken'

function makeAccessJWT(user){
  //maxAge has units of seconds, this is one hour
  const maxAge = 3600;
  const data = {
    sub: user.email,
    access: user.access ? user.access : 'standard',
  };
  const token = jwt.sign(data, process.env.JWT_SECRET,{
    algorithm: 'HS256',
    expiresIn: maxAge
  });
  return token;
}

export default makeAccessJWT;
