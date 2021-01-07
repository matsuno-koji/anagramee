import React from "react"

interface Props {
  text: string
  boxesPerRow: number
}

interface textElement {
  lineBreak: boolean
  text: string
}

export const Preview: React.FC<Props> = (props) => {
  const previewTextElements = formatText(props.text, props.boxesPerRow)
  return (
    <>
      {previewTextElements.map((element) => {
        const lineBreak = element.lineBreak ? <br /> : ""
        return <>{element.text}{lineBreak}</>
      })}
    </>
  )
}

function formatText(text: string, boxesPerRow: number): textElement[] {
  const length = text.length
  const cutNum = Math.ceil(length / boxesPerRow)
  const lines = []
  for (let num = 0; num < cutNum; num++) {
    lines.push(text.substr(num * boxesPerRow, boxesPerRow))
  }
  const textElements = lines.map((line) => {
    const trimedLine = line.trim()
    const lineBreak = trimedLine.length < boxesPerRow && trimedLine.length >= 1
    const textElment: textElement = {lineBreak: lineBreak, text: trimedLine}
    return textElment
  })
  return textElements
} 