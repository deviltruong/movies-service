const serverError = () => {
  const env = process.env.NODE_ENV || 'development';

  return (err, req, res) => {
    res.status(500);

    if (env === 'development') {
      res.json(err);
    }
    res.json({
      message: 'Something went wrong',
    });
  };
};

const pageNotFound = () => (req, res) => {
  res.status(404);
  res.json({
    message: 'The page not found',
  });
};

module.exports = {
  pageNotFound,
  serverError,
};
