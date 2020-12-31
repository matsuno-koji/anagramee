import React, { useState } from "react"
import { WordPanel } from "./wordpanel"
import { WordPanelElement } from "../../types/editor"
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd"

interface Props {
  text: string
  editorConf: {
    boxesPerRow: number
    rowHeight: number
    style?: React.CSSProperties
  }
}

export const Editor: React.FC<Props> = (props) => {
  const elements = initialize(props.text)
  const [list, setList] = useState(elements)

  const onChange = (
    sourceId: string,
    sourceIndex: number,
    targetIndex: number,
  ) => {
    const nextState = swap(list, sourceIndex, targetIndex)
    setList(nextState)
  }

  return(
    <GridContextProvider onChange={onChange}>
      <GridDropZone 
        id='editor'
        {...props.editorConf}
      >
        {list.map(element => (
          <GridItem key={element.key}>
            <WordPanel element={element} />
          </GridItem>
        ))}
      </GridDropZone>
    </GridContextProvider>
  )
}

//文章の初期化
function initialize(text: string): WordPanelElement[] {
  const spaceAddedText = addSpace(text)
  const words = spaceAddedText.split("")
  const elements = words.map( (word, index) => {
    return {key: `${index}`, word: `${word}`}
  })
  return elements
}

//使わない部分へ
function addSpace(text: string): string {
  const length = text.length
  const limit = 50
  const diff = limit - length
  let newString = text
  for (let num = 0; num < diff; num++) {
    newString = newString + "　"
  }
  return newString
}