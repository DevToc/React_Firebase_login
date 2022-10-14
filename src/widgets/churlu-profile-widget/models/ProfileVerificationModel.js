import * as services from '../../../services'

const { userActions } = services

export const profileVerificationMapStateToProps = (state) => ({

})

export const profileVerificationMapDispatchToProps = (dispatch) => ({
  submitProfile: (payload) =>
    dispatch(userActions.uploadVerificationFiles(payload))
})
