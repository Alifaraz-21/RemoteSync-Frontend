const {boardmembers} = require('../models/boardmembersSchema');

const checkAdmin = async (req, res, next) => {
//use this

//   const userId = req.user._id;
//   const boardId = req.params.boardId;
// only for checking
   const userId = "6701861b19c73fb6cdcdb201";
   const boardId = "672ab463c73f585d45d0596a";
  const member = await boardmembers.findOne({ boardId, userId });

  if (!member || member.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }

  next();
};
module.exports={checkAdmin};