import _get from 'lodash/get';
import * as services from '../../../services';

const { chatActions } = services;
export const bidProductsMapStateToProps = (state) => ({
    conversationList: _get(state, 'chat.conversationList'),
    socket: _get(state, 'form.chatForm.socketObject.value'),
    userDetails: _get(state, 'user.userData', {}),
    currentChat: _get(state, 'chat.currentConversationId', '1111'),
})

export const bidProductsMapDispatchToProps = (dispatch) => ({
    getMessages: (payload) =>
        dispatch(chatActions.fetchMessages(payload)),
    updateMessageList: (payload) =>
        dispatch(chatActions.updateMessages(payload)),
    fetchCurrentConversations: (payload) =>
        dispatch(chatActions.getCurrentConversations(payload)),
    deleteChats: (payload) =>
        dispatch(chatActions.deleteChats(payload))
})
