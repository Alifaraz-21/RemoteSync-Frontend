const mongoose = require('mongoose');
const { ROLES } = require('../config/rolesPermissions');


const boardSchema = new mongoose.Schema({
    boardName: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },{timestamps: true, 
});

const board = mongoose.model('Board', boardSchema);
module.exports = {board};