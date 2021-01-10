import React from "react"
import styled from "styled-components"

interface Props {
  lines: string[]
}

const Oneline = styled.p`
  margin: 0;
  padding: 0;
  font-size: 1.6rem;
  font-family: 'Noto Serif JP', serif;
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
