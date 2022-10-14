import { Card, CardHeader, TextField, Button } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import _get from 'lodash/get'
import { productDetailsMapDispatchToProps, productDetailsMapStateToProps } from '../models'
import { sellerInformationBody } from '../utils'
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import { updateFormStore, globalUtils } from '../../../utils'
import { Link } from 'react-router-dom'
import Typography from "@material-ui/core/Typography";
import _includes from 'lodash/includes';
import moment from 'moment';
import { editableStatuses } from '../utils/ProductView.props'

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'red'
  },
  actions: {
    justifyContent: 'space-between'
  },
  fullWidth: {
    width: '100%'
  }
}))
const ProductDetailsView = (props) => {
  const classes = useStyles()
  const {
    product, userDetails, productForm, isAuthorized, userID,
    username, expressInterest, setCurrentConversation
  } = props;

  const handleAmountChange = (e) => {
    const { value, name } = e.target
    updateFormStore({ form: 'productListingForm', field: name, value })
  }

  const handleAmountBlur = (e) => {
    const { value, name } = e.target
    updateFormStore({ form: 'productListingForm', field: name, value })
  }

  const handleInterest = () => {
    setCurrentConversation(_get(product, 'productId'))
    if (String(userID) === String(_get(product, "userID"))) {
      return updateFormStore({ form: 'productListingForm', field: 'userMessage', value: 'You cannot bid on a product you listed' })
    }
    updateFormStore({ form: 'productListingForm', field: 'userMessage', value: null });
    expressInterest({
      currentUser: String(userID),
      currentUserName: username,
      listedBy: _get(product, 'userName'),
      id: String(_get(product, 'productID')),
      title: _get(product, 'productTitle'),
      sellerId: String(_get(product, 'userID')),
      isInitiateChat: true,
      image: _get(product, 'imageURL[0]'),
      amount: globalUtils.isNumeric(_get(productForm, 'bidAmount.value')) ? `${globalUtils.getCountryProperty('currency', userDetails?.countryCode)} ${_get(productForm, 'bidAmount.value')}` : _get(productForm, 'bidAmount.value')
    });
    updateFormStore({ form: 'productListingForm', field: 'bidAmount', value: '' })
  }

  const renderProductDetails = () => (
    <div className='product-details-view-component'>
      <div style={{ display: 'none' }}>
        {
          _includes(editableStatuses, _get(product, 'listingStatus')) && (
            <CardActions className={classes.actions}>

              {
                _get(userDetails, 'id') === _get(product, 'userID') && _get(product, 'sponsorListing') && (
                  <div className="notification-section">
                    {_get(product, 'sponsoredListingExpiryDate') || true ?
                      <Typography variant="h6" style={{}}>
                        Your sponsorship {globalUtils.getDateDifference(moment.utc(_get(product, 'sponsoredListingExpiryDate')), moment.utc(new Date()))}
                        <br />
                        Go to MY PROFILE to extend it
                  </Typography> :
                      <Typography>
                        Extend your listing from the listed products in PROFILE
                  </Typography>
                    }
                  </div>
                )
              }
            </CardActions>
          )
        }
      </div>
      <Card variant="outlined">
        {getBidSection()}

      </Card>
    </div>
  )

  const getBidSection = () => (
    <><div className="amount-section">
      <CardHeader
        title={sellerInformationBody(product)}
      >
      </CardHeader>
      <TextField style={{ paddingLeft: '20px', paddingRight: '20px' }}
        name={_get(productForm, 'bidAmount.name')}
        placeholder={_get(productForm, 'bidAmount.placeholder')}
        value={_get(productForm, 'bidAmount.value')}
        variant='outlined'
        color='primary'
        type={_get(productForm, 'bidAmount.type')}
        fullWidth
        margin='normal'
        onChange={handleAmountChange}
        onBlur={handleAmountBlur}
        multiline
        rows={3}
      />
    </div>

      <div className='bid-buttons'>
        {
          isAuthorized ? (
            <>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                onClick={handleInterest}
                className='handleInterestIcon'
                disabled={!_includes(editableStatuses, _get(product, 'listingStatus'))}
                key={`${!_includes(editableStatuses, _get(product, 'listingStatus'))}`}
              >
                Send Message
              </Button>
            </>
          ) : (
              <Link to='/login' className={classes.fullWidth}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className='handleInterestIcon'
                  disabled={!_includes(editableStatuses, _get(product, 'listingStatus'))}
                  key={!_includes(editableStatuses, _get(product, 'listingStatus'))}
                >
                  Send Message
                </Button>
              </Link>
            )
        }
      </div>
    </>
  )
  return renderProductDetails()
}

export const ProductDetailsViewComponent = connect(productDetailsMapStateToProps, productDetailsMapDispatchToProps)(ProductDetailsView)