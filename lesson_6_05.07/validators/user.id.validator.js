const mongoose = require('mongoose');

const checkUserIdValid = (userId) => (mongoose.Types.ObjectId.isValid(userId));

module.exports = checkUserIdValid;
