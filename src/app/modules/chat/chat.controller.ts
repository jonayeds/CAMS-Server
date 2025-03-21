import { JwtPayload } from "jsonwebtoken"
import { CustomRequest } from "../../middlewares/auth"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { ChatService } from "./chat.service"

const sendChatRequest = catchAsync(async(req:CustomRequest, res, next)=>{
    const {classroomId} = req.params
    const result = await ChatService.sendChatRequest(classroomId, req.user as JwtPayload)
    sendResponse(res,{
            success:true,
        statusCode:200,
        message:"Chat request sent successfully",
        data:result
    })
})

const handleChatRequest = catchAsync(async(req:CustomRequest, res, next)=>{
    const result = await ChatService.handleChatRequest(req.body, req.user as JwtPayload)
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Chat request handled successfully",
        data:result
    })
})  

const getClassroomChatRequests = catchAsync(async(req:CustomRequest, res, next)=>{
    const {classroomId} = req.params
    const result = await ChatService.getClassroomChatRequests(classroomId, req.user as JwtPayload)
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Classroom chat requests fetched successfully",
        data:result
    })
})

export const ChatController = {
    sendChatRequest,
    handleChatRequest,
    getClassroomChatRequests
}