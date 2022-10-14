import * as _ from 'lodash'

export const featuredListingMapStateToProps = (state) => ({
    selectedSponsorshipOption: _.get(state, 'form.listingForm.sponsorship.value'),
})

export const featuredListingMapDispatchToProps = () => ({

})