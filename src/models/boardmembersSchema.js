const mongoose = require('mongoose');
const { ROLES } = require('../config/rolesPermissions');

const boardmembersSchema = new mongoose.Schema({
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
    inviterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    inviteeEmail: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },  // Will be populated upon acceptance
    role: { type: String, enum: Object.values(ROLES), required: true },
    // status: { type: String, enum: ['pending', 'accepted', 'awaiting_signup'], default: 'pending' },  
},
    {timestamps: true,}
);
const boardmembers = mongoose.model('Boardmembers', boardmembersSchema);
module.exports = {boardmembers};
