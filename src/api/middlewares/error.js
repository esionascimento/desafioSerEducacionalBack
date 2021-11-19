const middleError = (err, _req, res, _next) => {

  if(err.isError) {
    return res.status(422).json({message: err.message})
  }
}

module.exports = middleError;
