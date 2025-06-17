import { User } from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

const filterObj = (obj, ...allowedFields) => {
  // Loop through all keys of obj.
  // If the key is in allowedFields, add it to newObj.
  // Finally, return a new object that only contains the allowed fields.
  // (Used to filter which fields a user is allowed to update)
  return Object.keys(obj).reduce((newObj, key) => {
    if (allowedFields.includes(key)) {
      newObj[key] = obj[key];
    }
    return newObj;
  }, {}); // second argument is the initial value of newObj, which is an empty object
};

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

export const updateMe = catchAsync(async (req, res, next) => {
  // 1. create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates.\nPlease use /updateMyPassword instead.',
        400
      )
    );
  }

  // 2. update user data
  const filteredBody = filterObj(req.body, 'name', 'email'); // only allow name and email to be updated
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id, // req.user is set by the protect middleware
    filteredBody,
    {
      new: true, // return the updated user
      runValidators: true, // run validators on the updated fields
    }
  );

  // 3. return updated user
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    active: false,
  });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// admin-only operations, leave for future implementation
// export const createUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined!',
//   });
// };

// export const getUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined!',
//   });
// };

// export const updateUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined!',
//   });
// };

// export const deleteUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined!',
//   });
// };
