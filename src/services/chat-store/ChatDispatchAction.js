import { ChatActionTypes } from "./ChatActionTypes";

class ChatDispatchActions {
    updateInterestExpressed = () => ({
        type: ChatActionTypes.CREATE_NEW_CHAT_REQUEST
    })

    updateChatConversationsList = (payload) => ({
        type: ChatActionTypes.UPDATE_CHAT_CONVERSATIONS,
        payload
    })

    updateMessagesWithUser = (payload) => ({
        type: ChatActionTypes.UPDATE_MESSAGES,
        payload
    })

    clearMessageList = () => ({
        type: ChatActionTypes.CLEAR_MESSAGE_LIST
    })

    updateCurrentConversation = (payload) => ({
        type: ChatActionTypes.SET_CURRENT_CONVERSATION,
        payload
    })

    clearInterest = () => ({
        type: ChatActionTypes.CLEAR_NEW_CHAT
    })
}

export const chatDispatchActions = new ChatDispatchActions();