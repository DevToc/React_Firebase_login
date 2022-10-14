import * as services from '../../../services'
import _get from 'lodash/get'
const { userActions } = services

export const raiseTicketMapStateToProps = (state) => ({
  ticketForm: _get(state, 'form.ticketForm', {})
})

export const raiseTicketMapDispatchToProps = (dispatch) => ({
  submitNewTicket: (payload) =>
    dispatch(userActions.raiseNewTicket(payload))
})
