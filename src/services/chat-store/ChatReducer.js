import { ChatActionTypes } from './ChatActionTypes';

const initialState = {
    conversationList: [],
    currentConversationId: ''
};

export const chat = (state = initialState, action) => {
    switch (action.type) {
        case ChatActionTypes.CREATE_NEW_CHAT_REQUEST:
            return { ...state, newInterest: true };
        case ChatActionTypes.UPDATE_CHAT_CONVERSATIONS:
            return { ...state, conversationList: action.payload }
        case ChatActionTypes.UPDATE_MESSAGES:
            return { ...state, messageList: action.payload }
        case ChatActionTypes.CLEAR_MESSAGE_LIST:
            return { ...state, messageList: [] }
        case ChatActionTypes.SET_CURRENT_CONVERSATION:
            return { ...state, currentConversationId: action.payload }
        case ChatActionTypes.CLEAR_NEW_CHAT:
            return { ...state, newInterest: false }
        default:
            return { ...state }
    }
}