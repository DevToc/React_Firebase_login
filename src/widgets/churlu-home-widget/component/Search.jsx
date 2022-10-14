import React from 'react'
import { useTheme, TextField } from '@material-ui/core'
import { connect } from 'react-redux'
import { searchMapStateToProps, searchMapDispatchToProps } from '../models'
import _get from 'lodash/get'
import { updateFormStore, validateField } from '../../../utils'
import { searchStyle } from '../style'

export const SearchComponent = (props) => {
  const { homeForm } = props

  const handleChange = (e) => {
    const { value, name } = e.target
    updateFormStore({ form: 'homeForm', field: name, value: value })
  }

  const handleBlur = (e) => {
    const { value, name } = e.target
    validateField({ form: 'homeForm', field: name, data: value })
  }

  return (
    <>
      <SearchBar theme={useTheme()}>
        <TextField
          id={_get(homeForm, 'searchField.name')}
          name={_get(homeForm, 'searchField.name')}
          label=""
          placeholder={_get(homeForm, 'searchField.placeholder')}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          color='primary'
          fullWidth={!!window.screen.width < 700}
          value={_get(homeForm, 'searchField.value', '')}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          style={{ backgroundColor: 'white', borderRadius: '4px', height: '100%' }}
        />
      </SearchBar>
    </>
  )
}

const SearchBar = searchStyle

export const Search = connect(searchMapStateToProps, searchMapDispatchToProps)(SearchComponent)
