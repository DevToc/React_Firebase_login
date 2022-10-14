import * as services from '../../../services'
import _get from 'lodash/get'
import { chatActions } from '../../../services'

const { userActions, formActions, refDatActions, itemActions, authorizationAction } = services

export const mainProfileMapDispatchToProps = (dispatch) => ({
  setFormData: (payload) =>
    dispatch(formActions.setFormConstants(payload)),
  fetchUserDetails: (payload) =>
    dispatch(userActions.getUserData(payload)),
  getSellCategories: (payload) =>
    dispatch(refDatActions.getSellCategories(payload)),
  getRentCategories: (payload) =>
    dispatch(refDatActions.getRentCategories(payload)),
  fetchFilterOptions: (payload) =>
    dispatch(itemActions.fetchFilterOptions(payload)),
  fetchProductList: (payload) =>
    dispatch(itemActions.makeSearch(payload)),
  updateMessageList: (payload) =>
    dispatch(chatActions.updateMessages(payload)),
  getMessages: (payload) =>
    dispatch(chatActions.fetchMessages(payload)),
  clearMessageList: (payload) =>
    dispatch(chatActions.clearMessageList(payload)),
  clearListedProducts: (payload) =>
    dispatch(userActions.clearListedProducts(payload)),
  fetchCurrentConversations: (payload) =>
    dispatch(chatActions.getCurrentConversations(payload)),
  fetchSellerProfie: (payload) =>
    dispatch(userActions.fetchProductDetails(payload)),
  fetchFavouriteItems: (payload) =>
    dispatch(itemActions.fetchFavouriteItems(payload)),
  fetchFavouriteIds: (payload) =>
    dispatch(itemActions.fetchFavouriteIds(payload)),
  clearOtpStatus: (payload) =>
    dispatch(authorizationAction.clearOtpStatus(payload)),
  clearProductList: (payload) =>
    dispatch(itemActions.clearProductList(payload)),
})

export const mainProfileMapStateToProps = (state) => ({
  sellData: _get(state, 'refData.sellData', {}),
  rentData: _get(state, 'refData.rentData', {}),
  loader: _get(state, 'user.loader', false),
  conversationList: _get(state, 'chat.conversationList', []),
  userDetails: _get(state, 'user.userData', {}),
  currentChat: _get(state, 'chat.currentConversationId', '1111'),
  otpStatus: _get(state, 'authorization.otpStatus'),
  socket: _get(state, 'form.chatForm.socket.value', {}),
  deletedUser: _get(state, 'user.deletedUser', {}),
  otpForm: _get(state, 'form.otpForm', {}),
  profileForm: _get(state, "form.profileForm", {}),
  product: _get(state, "item.product", {}),
})
