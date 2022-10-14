import HttpClient from '../../commons/HttpClient'
import _get from 'lodash/get';
import { chatDispatchActions } from './ChatDispatchAction';
import { globalConstants } from '../../utils/global'
import { notificationActions } from '../notification-store';

const expressInterest = (payload) => {
    return (dispatch) => {
        return new HttpClient().post('/interest', payload, '/chat/expressInterest', globalConstants.CHAT)
            .then(() => {
                dispatch(chatDispatchActions.updateInterestExpressed())
                dispatch(notificationActions.createNotification({
                    touser: _get(payload, 'sellerId'),
                    message: `${_get(payload, 'currentUserName')} messaged you regarding ${_get(payload, 'title')}. Check your inbox.`,
                    path: '/chat'
                }))
            })
            .catch(err => err)
    }
}

const getCurrentConversations = (payload) => {
    return (dispatch) => {
        return new HttpClient().get(`/user?currentUser=${_get(payload, 'currentUser')}`, '/chat/currentConversations', globalConstants.CHAT)
            .then((res) => {
                if (_get(res, 'data.length', 0) > 0)
                    res.data.sort((a, b) => (a.systemUpdateTime < b.systemUpdateTime) ? 1 : ((b.systemUpdateTime < a.systemUpdateTime) ? -1 : 0))
                dispatch(chatDispatchActions.updateChatConversationsList(res.data))
            })
            .catch(err => err)
    }
}

const fetchMessages = (payload) => {
    return (dispatch) => {
        return new HttpClient().post('/messages', payload, '/chat/expressInterest', globalConstants.CHAT)
            .then((res) => dispatch(chatDispatchActions.updateMessagesWithUser(res.data)))
            .catch(err => err)
    }
}

const updateMessages = (payload) => {
    return (dispatch, getState) => {
        const messageList = _get(getState(), 'chat.messageList', []);
        const newList = [...messageList, payload];
        return dispatch(chatDispatchActions.updateMessagesWithUser(newList))

    }
}

const deleteChats = (payload) => {
    return (dispatch) => {
        return new HttpClient().post('/user/deletechats', _get(payload, 'listForDeletion'), '/chat/deleteConversations', globalConstants.CHAT)
            .then((res) => dispatch(getCurrentConversations({ currentUser: _get(payload, 'currentUser') })))
    }
}

const clearMessageList = () => (dispatch) => dispatch(chatDispatchActions.clearMessageList())

const setCurrentConversation = (payload) => dispatch => dispatch(chatDispatchActions.updateCurrentConversation(payload))

const clearInterest = () => dispatch => dispatch(chatDispatchActions.clearInterest())

export const chatActions = {
    expressInterest,
    getCurrentConversations,
    fetchMessages,
    updateMessages, clearMessageList,
    setCurrentConversation, clearInterest,
    deleteChats
}