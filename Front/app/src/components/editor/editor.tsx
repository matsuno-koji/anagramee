import React, { useState } from "react"
import { WordPanel } from "./wordpanel"
import { WordPanelElement } from "../../types/editor"
import { Preview } from "../editor/preview"
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move
} from "react-grid-dnd"

interface Props {
  text: string
  editorConf: {
    boxesPerRow: number
    rowHeight: number
    style?: React.CSSProperties
  }
}

interface Lines {
  [index: string]: WordPanelElement[]
}

export const Editor: React.FC<Props> = (props) => {
  const lines = initialize(props.text, props.editorConf.boxesPerRow)
  const [items, setItems] = useState(lines)
  const [text, setText] = useState(props.text)

  const onChange = (
    sourceId: string,
    sourceIndex: number,
    targetIndex: number,
    targetId?: string
  ) => {
    if (targetId) {
      const result = move(
        items[sourceId],
        items[targetId],
        sourceIndex,
        targetIndex
      );
      return setItems({
        ...items,
        [sourceId]: result[0],
        [targetId]: result[1]
      })
    }
    const result = swap(items[sourceId], sourceIndex, targetIndex)
    return setItems({
      ...items,
      [sourceId]: result
    })
    // setText(joinText(nextState))
  }

  return(
    <>
      <GridContextProvider onChange={onChange}>
        <GridDropZone 
          id='one'
          {...props.editorConf}
        >
          {items.one.map((item) => (
            <GridItem key={item.key}>
              <WordPanel element={item} />
            </GridItem>
          ))}
        </GridDropZone>
        <GridDropZone 
          id='two'
          {...props.editorConf}
        >
          {items.two.map((item) => (
            <GridItem key={item.key}>
              <WordPanel element={item} />
            </GridItem>
          ))}
        </GridDropZone>
        <GridDropZone 
          id='three'
          {...props.editorConf}
        >
          {items.three.map((item) => (
            <GridItem key={item.key}>
              <WordPanel element={item} />
            </GridItem>
          ))}
        </GridDropZone>
        <GridDropZone 
          id='four'
          {...props.editorConf}
        >
          {items.four.map((item) => (
            <GridItem key={item.key}>
              <WordPanel element={item} />
            </GridItem>
          ))}
        </GridDropZone>
        <GridDropZone 
          id='five'
          {...props.editorConf}
        >
          {items.five.map((item) => (
            <GridItem key={item.key}>
              <WordPanel element={item} />
            </GridItem>
          ))}
        </GridDropZone>
      </GridContextProvider>
      <Preview text={text} boxesPerRow={props.editorConf.boxesPerRow} />
    </>
  )
}

//文章の初期化
function initialize(text: string, boxesPerRow: number): Lines {
  const words = text.split("")
  const elements = words.map( (word, index) => {
    const line = Math.floor(index / boxesPerRow)
    return {key: `${index}`, word: `${word}`, line: line}
  })
  const lines = devideLine(elements)
  return lines
}

//ラインでグループ分け
function devideLine(elements: WordPanelElement[]): Lines {
  const words_one = extractTargetLineWords(elements, 0)
  const words_two = extractTargetLineWords(elements, 1)
  const words_three = extractTargetLineWords(elements, 2)
  const words_four = extractTargetLineWords(elements, 3)
  const words_five = extractTargetLineWords(elements, 4)
  const lines: Lines = {
    one: words_one,
    two: words_two,
    three: words_three,
    four: words_four,
    five: words_five
  }
  return lines
}

function extractTargetLineWords(elements: WordPanelElement[], line: number) {
  return elements.filter(element => {
    return element.line === line
  })
}

//入れ替えたテキストを合体
function joinText(elements: WordPanelElement[]): string {
  let text = ""
  elements.map((element) => (
    text = text + element.word
  ))
  return text
}