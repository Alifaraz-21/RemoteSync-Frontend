const { createBoard,inviteMember,acceptInvitation} = require('../services/boardService');

const createBoradCont =async(req,res)=>{
    //only for checking userId is insert manually..
    const {boardName,userId} =req.body;
    console.log(boardName,userId);
    //const userId = req.user._id; // Assumes req.user._id is available from authentication middleware but now this will be comment 
    try{
        if (!boardName || !userId) {
           return res.status(400).json({ message: "Empty fields" });
        }
        const boardmessage = await createBoard(userId,boardName);
        return res.status(201).json({ message: boardmessage });
    }
    catch(error){
        return res.status(400).json({message:error.message})
    }
}


const inviteMemberController = async (req, res) => {
    try {
        //only for checking inviterId is insert manually..
        const { boardId, inviterId,inviteeEmail, role } = req.body;
        //this should be use when authentication is check
        // const inviterId = req.user.id;  //  user ID is available in `req.user` after authentication
        const message = await inviteMember(boardId, inviterId, inviteeEmail, role);
        res.status(200).json({ message });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const acceptInvitationController = async (req, res) => {
    const { token } = req.params;
    try {
        const message = await acceptInvitation(token);
        res.status(200).json({ message });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports={createBoradCont,inviteMemberController,acceptInvitationController};