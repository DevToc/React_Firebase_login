import _get from 'lodash/get'

export const ticketTrackingMapStateToProps = (state) => ({
    ticketList: _get(state, 'user.ticketList', [])
})

export const ticketTrackingMapDispatchToProps = (dispatch) => ({

})