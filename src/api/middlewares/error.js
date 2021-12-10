const middleError = (err, _req, res, _next) => {
  if(err.isError) {
    return res.status(err.code).json({message: err.message})
  }
}

module.exports = middleError;
