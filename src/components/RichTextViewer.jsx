import React from 'react'
import styled from 'styled-components'
import ReactQuill from 'react-quill'
import { useTheme } from '@material-ui/core'
import 'react-quill/dist/quill.bubble.css'

export const RichTextViewer = ({ value }) => {
  const theme = useTheme()
  return (
    <StyledRichTextViewer theme={theme}>
      <ReactQuill value={value} theme='bubble' readOnly />
    </StyledRichTextViewer>
  )
}

const StyledRichTextViewer = styled.div`
  & * {
    font-family: ${(props) => props.theme.typography.fontFamily};
    font-size: ${(props) => props.theme.typography.fontSize};
  }
`
