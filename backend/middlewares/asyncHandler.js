const asyncHandler = (fn) =>
   (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err)=>{
    res.status(500).json({message:err.message});
    });
};



export default asyncHandler;