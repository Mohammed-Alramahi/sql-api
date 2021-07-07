module.exports = (err, req, res, next) => {
  if (!req.body.name) {
    res.status(500).json({ error: err });
    next("Please Fill all needed Information");
    return;
  }
  next();
};
