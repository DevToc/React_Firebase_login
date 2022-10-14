import _get from 'lodash/get'
import { chatActions } from '../../../services';

export const conversationMapStateToProps = (state) => ({
    currentConversation: _get(state, 'form.chatForm.currentConversation.value'),
    userDetails: _get(state, 'user.userData', {}),
    messageList: _get(state, 'chat.messageList', []),
    chatForm: _get(state, 'form.chatForm', {}),
    socket: _get(state, 'form.chatForm.socket.value', {})
});

export const conversationMapDispatchToProps = (dispatch) => ({
    fetchCurrentConversations: (payload) =>
        dispatch(chatActions.getCurrentConversations(payload)),

})