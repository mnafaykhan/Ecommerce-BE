// Implementation 1: Using Promise.resolve

const catchAsync = (fn) => (req, res, next) => {
  // Advantage: Works with both promise-returning and non-promise-returning functions.
  Promise.resolve(fn(req, res, next))
    .catch((err) => next(err));
  // Limitation: Wraps non-promise-returning functions in a promise, potentially unnecessary.
};

// // Implementation 2: Using async/await

// const catchAsync = (fn) => async (req, res, next) => {
//   try {
//     // Advantage: Explicitly expects fn to be an asynchronous function returning a promise.
//     await fn(req, res, next);
//   } catch (err) {
//     next(err);
//   }
//   // Limitation: Requires fn to be an asynchronous function.
// };

// // Implementation 3: Chaining with .catch

// const catchAsync = (fn) => (req, res, next) =>
//   // Advantage: Concise and assumes fn returns a promise.
//   fn(req, res, next).catch(next);
//   // Limitation: Assumes that fn returns a promise and doesn't explicitly handle non-promise-returning functions.






module.exports = catchAsync;
