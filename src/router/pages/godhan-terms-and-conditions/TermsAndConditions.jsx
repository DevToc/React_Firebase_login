import React from 'react'
import { Container, useTheme } from '@material-ui/core'
import termsOfUse from './termsOfUse'
import { BlankLayout, RichTextViewer } from '../../../components'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const TermsAndConditionsComponent = (props) => {
  return (
    <>
      <StyledTermsAndConditions theme={useTheme()}>
        <BlankLayout>
          <Container className="view-height"  component="main" maxWidth="xl">
            <div>
              <ArrowBackIcon
                color='primary'
                onClick={() => { props.history.goBack() }}
                className='back-arrow'
              />
            </div>
            <RichTextViewer value={termsOfUse} />
          </Container>
        </BlankLayout>
      </StyledTermsAndConditions>
    </>
  )
}

const StyledTermsAndConditions = styled.div`
.back-arrow{
    cursor: pointer;
}
.quill {
    width: 96%;
}
`
export const TermsAndConditions = withRouter(TermsAndConditionsComponent)
