import jwt from 'jsonwebtoken';

const generateToken = (res,userId) => {
    // Create a JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });


    //set the token in a cookie
    res.cookie('jwt', token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'Strict', // Prevents CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expires in 30 days
    });

    return token;
}

export default generateToken;