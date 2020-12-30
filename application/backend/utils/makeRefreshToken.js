import jwt from 'jsonwebtoken'

function makeRefreshToken(user){
  const maxAge = 3600 * 24 * 365;
  const data = {
    sub: user.email,
    scope: 'refresh'
  };
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: maxAge
  });
  return token;
}

export default makeRefreshToken;
