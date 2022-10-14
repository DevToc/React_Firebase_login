export const productOverviewProps = [
    { label: 'Listing Status', property: 'listingStatus' },
    { label: 'Item Condition', property: 'itemDescription' },
    { label: 'Offered By', property: 'offeredBy' },
]

export const productOverviewSellProps = [
    { label: 'Listing Status', property: 'listingStatus' },
    { label: 'Item Condition', property: 'itemDescription' },
]

export const productInformationProps = [
    { label: 'Listed Price', property: 'listedPrice', isEditable: true, propertyToUpdate: 'price' },
    { label: 'Item description', property: 'productDescription', isEditable: true, propertyToUpdate: 'description' },
]
export const sellerInformationProps = [
    { label: 'Seller Name', property: 'userName' }

]

export const editableStatuses = ['New', 'Active', 'Extended'];

export const wantedProps = [
    { label: 'Purpose', property: 'itemDescription' },
    { label: 'Listing Status', property: 'itemStatus' },
    { label: 'Listing Type', property: 'type', isCapital: true },
    { label: 'Category', property: 'categoryName' },
    // { label: 'Number of views', property: 'numberOfView' },
    { label: 'Budget Type', property: 'rateType' },
]

export const taskProps = [
    { label: 'Listing Status', property: 'itemStatus' },
    { label: 'Listing Type', property: 'type', isCapital: true },
    { label: 'Category', property: 'categoryName' },
    // { label: 'Number of views', property: 'numberOfView' },
    { label: 'Budget Type', property: 'rateType' },
]
