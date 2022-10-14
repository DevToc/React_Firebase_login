import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Box, Typography, Button, useTheme, Container } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import _isEmpty from 'lodash/isEmpty'
import { profileVerificationMapDispatchToProps, profileVerificationMapStateToProps } from '../models'
import { viewProfileStyle } from '../style'

const ProfileVerificationComponent = (props) => {
  const { submitProfile, setAuxiliaryOption, setSelectedOption } = props
  const [files, setFiles] = useState({})

  const submitProfileForVerification = (e) => {
    e.preventDefault()
    const formData = new FormData()
    for (const key of Object.keys(files)) {
      formData.append('files', files[key])
    }
    submitProfile(formData)
    setSelectedOption(3);
    setAuxiliaryOption(0);
  }

  const handleChange = (e) => setFiles(e.target.files)

  return (
    <ViewProfileStyle theme={useTheme()}>
      <Container>
        <div className='edit-profile-component' id="profile-verification">
          <div className='profile-header-component'>
            <div>
              <ArrowBackIcon
                color='primary'
                className="pointer-cursor margin-top-arrow-profile"
                onClick={() => {
                  setSelectedOption(3);
                  setAuxiliaryOption(0);
                }}
              />
            </div>
            <div>
              <Typography component='h1' variant='h5'>
                <Box fontWeight='bold' component='span'>Verify your profile</Box>
              </Typography>
            </div>

          </div>
          <div className='profile-body-component'>
            <Typography component='h1' variant='h6'>
              <Box fontWeight='bold' component='span'>Upload documents and request verification</Box>
            </Typography>
            <div>
              Attach all identity documents and/or supporting documents. <br /> You can choose multiple files (if required).
        </div>
            <br />
            <form onSubmit={submitProfileForVerification}>
              <input type='file' multiple name='file-upload' onChange={handleChange} placeholder="Select your file(s)" />
            </form>
            <br />
            {
              !_isEmpty(files) && (
                <>
                  <Typography component='h6' variant='h6'>
                    <Box component='span'>Your selected files</Box>
                  </Typography>
                  {[...files].map(file => (
                    <div>
                      {file.name}
                    </div>
                  ))}
                </>
              )
            }
            <br />
            <div className='edit-profile-buttons'>
              <Button
                type='cancel'
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
                onClick={submitProfileForVerification}
                disabled={_isEmpty(files)}
                key={`${_isEmpty(files)}`}
              >
                Verify
            </Button>
            </div>
            {/* </form> */}

          </div>
        </div >
      </Container>
    </ViewProfileStyle>

  )
}

const ViewProfileStyle = viewProfileStyle;

export const ProfileVerification = connect(profileVerificationMapStateToProps, profileVerificationMapDispatchToProps)(ProfileVerificationComponent)
