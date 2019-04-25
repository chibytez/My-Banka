export default (req, res, next) => {
  const {admin} = req.userInfo;
console.log('user:',req.userInfo);

    if (admin) {
      return next();
    }
    console.log('admin',req.userInfo,)
    res.status(403)
      .json({
        message: 'Forbidden access',
      });
  };