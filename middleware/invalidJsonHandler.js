// // Handle invalid JSON
const invalidJsonHandler = async (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  next(err);
};

// Catch-all error handler (for everything else)
const catchAlleError = async (err, req, res, next) => {
  console.error(err.stack); // Log for debugging
  res.status(500).json({ message: err.message });
};
// error: "Internal Server Error" 
module.exports = {
  invalidJsonHandler,
  catchAlleError,
};
