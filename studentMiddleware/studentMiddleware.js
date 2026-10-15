// middlewares/studentMiddleware.js

// Middleware to validate data before creating a student
validateCreateStudent = (req, res, next) => {
  const { name, email, studentID } = req.body;

  // Check if required fields are missing
  if (!name || !email || !studentID) {
    // If missing, stop the request and send an error (don't call next())
    return res.status(400).json({
      success: false,
      message: "Please provide name, email, and studentID.",
    });
  }

  next();
};

module.exports = { validateCreateStudent };
