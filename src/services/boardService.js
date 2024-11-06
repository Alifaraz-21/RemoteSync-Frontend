const jwt = require('jsonwebtoken');
require('dotenv').config();
const {board} = require("../models/boardSchema");
const { ROLES } = require('../config/rolesPermissions');
const { users } = require('../models/userSchema');
const {boardmembers} = require('../models/boardmembersSchema');
const { sendInvitationEmail } = require('../services/emailService');


//for creating board
const createBoard = async (creatorId, boardName)=>{
    try{
        console.log(creatorId,boardName);
        const user = await users.findById(creatorId); 
        if (!user) {
            throw new Error('User not found');
        }
        const newBoard = new board({
            boardName,
            user: creatorId
        })
        console.log(newBoard)
        await  newBoard.save();
        const addingMembers = new boardmembers({
            boardId: newBoard._id,
            inviterId: creatorId,
            inviteeEmail:user.email,
            userId:creatorId,
            role:ROLES.ADMIN
        });
        await addingMembers.save();
        console.log("Board has been created");
        const mess  = "Board has been created";
        return mess;
    }
    catch(error){
        throw new Error(error.message || 'Error occurred during creating board.');
    }
}

//for inviting members on a board
const inviteMember= async (boardId, inviterId, inviteeEmail, role)=>{
    if (!Object.values(ROLES).includes(role)) {
        throw new Error('Invalid role specified');
    }
    const boards = await board.findById(boardId);
    if (!boards){ 
        throw new Error('Board not found');
    }
    // console.log(boardId, inviterId, inviteeEmail, role)
     let boardmember = await boardmembers.findOne({ inviteeEmail, boardId});
        if (boardmember) {
            throw new Error('Already a member on the board');    
        }

    const token = jwt.sign({ boardId, inviterId ,inviteeEmail, role }, process.env.BOARDMEMBER_JWT_SECRET, { expiresIn: '24h' });
    await sendInvitationEmail(inviteeEmail, token);
    return {success: true, message: 'Invitation sent successfully.'};
}

const acceptInvitation = async (token) => {
    try {
        // Decode token to get board and role info
        const { boardId, inviterId,inviteeEmail, role } = jwt.verify(token, process.env.BOARDMEMBER_JWT_SECRET);
        const user = await users.findOne({ email: inviteeEmail });
    
        if (!user){ 
            throw new Error('User not registered');
        }
         const addingMembers = new boardmembers({
        boardId,
        inviterId,
        inviteeEmail,
        userId:user._id,
        role
    });
        await addingMembers.save();
        return { success: true, message: 'User added to board.' };
      } 
      catch (error) {
        console.error('Error accepting invitation:', error);
        throw error;
      }
    };




module.exports={createBoard,inviteMember,acceptInvitation};