import React from 'react'
import {
  Box, Button, TextField, Typography,
  FormControl, RadioGroup, FormControlLabel, Radio, Grid
} from '@material-ui/core'
import _get from 'lodash/get'
import { connect } from 'react-redux'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { raiseTicketMapStateToProps, raiseTicketMapDispatchToProps } from '../models'
import { updateFormStore, validateField } from '../../../utils'
import { raiseTicketStyle } from '../style'


const RaiseTicketComponent = (props) => {
  const { submitNewTicket, ticketForm, setSelectedOption, setAuxiliaryOption } = props
  const handleSubmit = () => {
    submitNewTicket({
      ticketType: _get(ticketForm, 'ticketType.value', ''),
      title: _get(ticketForm, 'title.value', ''),
      description: _get(ticketForm, 'comment.value', '')
    })
    setSelectedOption(3);
    setAuxiliaryOption(0);
  }

  const handleChange = (e) => {
    const { value, name } = e.target
    updateFormStore({ form: 'ticketForm', field: name, value })
  }

  const handleBlur = (e) => {
    const { value, name } = e.target
    updateFormStore({ form: 'ticketForm', field: name, value })
    validateField({ form: 'ticketForm', field: name, data: value })
  }

  return (
    <StyledRaiseTicket>
        <div className='edit-profile-component' id="raise-ticket">
          <div className='profile-header-component' style={{ justifyContent: 'unset' }}>
            <ArrowBackIcon
              color='primary'
              className="pointer-cursor margin-top-arrow-profile"
              onClick={() => {
                setAuxiliaryOption(0)
                setSelectedOption(3);
              }}
              style={{ marginRight: '1rem' }}
            />
            <Typography component='h1' variant='h5'>
              <Box fontWeight='bold' component='span'>Help/Assistance</Box>
            </Typography>
          </div>

          <div className='profile-body-component'>
            <Grid container>
              <Grid item xs={12} md={4} lg={2}>
                <FormControl component="fieldset">
                  <RadioGroup aria-label="ticketType" className="ticket-type" name="ticketType" value={_get(ticketForm, 'ticketType.value')} onChange={handleChange}>
                    <FormControlLabel value="Complaint" control={<Radio color="primary" />} label="Complaint" />
                    <FormControlLabel value="technicalIssue" control={<Radio color="primary" />} label="Technical Issue" />
                    <FormControlLabel value="Suggestion" control={<Radio color="primary" />} label="Suggestion" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <br />
              <Grid item xs={12} md={8} lg={8} className="body-border">
                <TextField
                  name={_get(ticketForm, 'title.name')}
                  label={_get(ticketForm, 'title.placeholder')}
                  variant='outlined'
                  color='primary'
                  fullWidth
                  margin='normal'
                  value={_get(ticketForm, 'title.value')}
                  defaultValue={_get(ticketForm, 'title.value')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!_get(ticketForm, 'title.isValid')}
                  helperText={!_get(ticketForm, 'title.isValid') && _get(ticketForm, 'title.errorText')}
                />
                <TextField
                  name={_get(ticketForm, 'comment.name')}
                  label={_get(ticketForm, 'comment.placeholder')}
                  variant='outlined'
                  color='primary'
                  fullWidth
                  margin='normal'
                  multiline
                  rows={4}
                  value={_get(ticketForm, 'comment.value')}
                  defaultValue={_get(ticketForm, 'comment.value')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!_get(ticketForm, 'comment.isValid')}
                  helperText={!_get(ticketForm, 'comment.isValid') && _get(ticketForm, 'comment.errorText')}
                />
                <div className='edit-profile-buttons'>
                  <Button
                    type='submit'
                    variant='outlined'
                    color='secondary'
                    size='large'
                    aria-label='cancel'
                    fullWidth
                    onClick={() => {
                      setSelectedOption(3);
                      setAuxiliaryOption(0);
                    }}
                    className='cancel-button'
                  >
                    Cancel
                </Button>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    size='large'
                    aria-label='log in'
                    fullWidth
                    disabled={!_get(ticketForm, 'comment.value') || !_get(ticketForm, 'title.value')}
                    onClick={handleSubmit}
                  >
                    Submit
                </Button>
                </div>
              </Grid>
            </Grid>

          </div>
        </div>
    </StyledRaiseTicket>
  )
}

const StyledRaiseTicket = raiseTicketStyle
export const RaiseTicket = connect(raiseTicketMapStateToProps, raiseTicketMapDispatchToProps)(RaiseTicketComponent)
