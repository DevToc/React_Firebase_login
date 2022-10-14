export const formConstants = {
  productListingForm: {
    listedPrice: {
      name: 'listedPrice',
      rules: [ 'MINLENGTH-6', 'MAXLENGTH-20'],
      placeholder: 'Listed Price',
      value: '',
      isValid: true,
      errorText: 'Invalid price'
    },
    productDescription: {
      name: 'productDescription',
      rules: [],
      placeholder: 'Product Description',
      value: '',
      isValid: true,
      errorText: 'Product description is required'
    },
    bidAmount: {
      name: 'bidAmount',
      placeholder: 'Start Typing..',
      value: '',
      type: 'number',
      rules: [],
      isValid: true,
      errorText: 'Invalid Amount'
    }, 
    userMessage: {
      name: 'userMessage',
      value: null
    }
  }
}
