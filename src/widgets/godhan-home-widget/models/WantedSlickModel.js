import _get from 'lodash/get'

import * as services from '../../../services'

const { chatActions } = services

export const wantedSlickMapStateToProps = (state) => ({
  wantedItems: _get(state, 'item.wantedItems.content'),
  userID: _get(state, 'user.userData.id'),
  username: _get(state, 'user.userData.name')
})

export const wantedSlickMapDispatchToProps = (dispatch) => ({
  expressInterest: (payload) =>
    dispatch(chatActions.expressInterest(payload))
})
