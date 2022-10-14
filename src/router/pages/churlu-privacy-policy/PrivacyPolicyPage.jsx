import React from 'react'

import { Container } from '@material-ui/core'
import privacyPolicy from './privacyPolicy'
import { BlankLayout, RichTextViewer } from '../../../components'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

export const PrivacyPolicy = (props) => {
  return (
    <>
      <StyledPrivacyPolicy>
        <BlankLayout>
          <Container className="view-height" component="main" maxWidth="xl">
            <div>
              <ArrowBackIcon
                color='primary'
                onClick={() => { props.history.goBack() }}
                className='back-arrow'
              />
            </div>
            <RichTextViewer value={privacyPolicy} />
          </Container>
        </BlankLayout>
      </StyledPrivacyPolicy>
    </>
  )
}

const StyledPrivacyPolicy = styled.div`
.back-arrow{
    cursor: pointer;
}
.quill {
    width: 96%;
}
`

export const PrivacyPolicyPage = withRouter(PrivacyPolicy)
