import React from 'react'

import { Container } from '@material-ui/core'
import cancellation from './cancellation'
import { BlankLayout, RichTextViewer } from '../../../components'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

export const CancellationPolicyPage = (props) => {
  return (
    <>
      <StyledCancellationPolicy>
        <BlankLayout>
          <Container  className="view-height" component="main" maxWidth="xl">
            <div>
              <ArrowBackIcon
                color='primary'
                onClick={() => {
                  props.history.goBack()
                }}
                className='back-arrow'
              />
            </div>
            <RichTextViewer value={cancellation} />
          </Container>
        </BlankLayout>
      </StyledCancellationPolicy>
    </>
  )
}

const StyledCancellationPolicy = styled.div`
.back-arrow{
    cursor: pointer;
}
.quill {
    width: 96%;
}
`

export const CancellationPolicy = withRouter(CancellationPolicyPage)
