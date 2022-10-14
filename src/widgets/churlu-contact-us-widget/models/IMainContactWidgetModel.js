import * as services from '../../../services'
import _get from 'lodash/get'
const { userActions, formActions } = services

export const mainContactMapStateToProps = (state) => ({
    ticketForm: _get(state, 'form.ticketForm', {}),
    ticket: _get(state, 'user.ticket')
})

export const mainContactMapDispatchToProps = (dispatch) => ({
    submitNewTicket: (payload) =>
        dispatch(userActions.raiseNewTicket(payload)),
    setFormData: (payload) =>
        dispatch(formActions.setFormConstants(payload)),
    clearTicketInfo: (payload) =>
        dispatch(userActions.clearTicketInfo())
})
