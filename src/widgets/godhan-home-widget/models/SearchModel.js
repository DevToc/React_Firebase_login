import _get from 'lodash/get'

export const searchMapStateToProps = (state) => ({
  homeForm: _get(state, 'form.homeForm')
})

export const searchMapDispatchToProps = (dispatch) => ({

})
