import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import {tabsMapDispatchToProps, tabsMapStateToProps} from '../models'
import {updateFormStore} from '../../../utils'
import * as _get from 'lodash/get';

function TabPanel(props) {
    const {children, value, index, ...other} = props

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%'
    }
}))

export const FullWidthTabsComponent = (props) => {
    const {homeForm} = props;
    const classes = useStyles()
    const [value, setValue] = React.useState(0)
    const handleChange = (event, newValue) => {
        var type;
        setValue(newValue);
        switch (newValue) {
            case 0:
                type = 'rent';
                break;
            case 1:
                type = 'sell';
                break;
            case 2:
                type = 'wanted';
                break;
            case 3:
                type = 'task';
                break;
            default:
                type = 'rent';
                break;

        }
        if (!_get(homeForm, 'skipFormClear.value')) {
            updateFormStore({form: 'homeForm', field: 'selectedType', value: type})
            updateFormStore({form: 'homeForm', field: 'listType', value: ''})
            updateFormStore({form: 'homeForm', field: 'searchField', value: ''})
        } else {
            updateFormStore({form: 'homeForm', field: 'skipFormClear', value: false})
        }
    }

    return (
        <div className={`${classes.root} tabs-width`}>
            <AppBar position='static' color='default'>
                <Tabs
                    TabIndicatorProps={{
                        style: {
                            display: "none",
                        },
                    }}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    variant='fullWidth'
                    aria-label='full width tabs example'
                    id="full-width-tabs"
                >
                    <Tab label='Rent' {...a11yProps(0)} />
                    <Tab label='Buy' {...a11yProps(1)} />
                    <Tab label='Wanted' {...a11yProps(2)} />
                    <Tab label='Task' {...a11yProps(3)} />
                </Tabs>
            </AppBar>
        </div>
    )
}

export const FullWidthTabs = connect(tabsMapStateToProps, tabsMapDispatchToProps)(FullWidthTabsComponent)
