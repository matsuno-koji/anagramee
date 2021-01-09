import React from "react"
import styled from "styled-components"

interface Props {
  lines: string[]
}

const Oneline = styled.p`
  margin: 0;
  padding: 0;
`

export const Preview: React.FC<Props> = (props) => {
  return (
    <>
      {props.lines.map((line, index) => {
        return <Oneline key={`preview_text_line_${index}`}>{line}</Oneline>
      })}
    </>
  )
}
