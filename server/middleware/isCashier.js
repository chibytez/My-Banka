export default (req, res, next) => {
    const {cashier} = req.userInfo;
    const { admin } = req.userInfo;
    
    
if(cashier === 'staff' && admin === false){
return next();
}
res.status(403)
  .json({
    message: 'Forbidden access',
  });
};