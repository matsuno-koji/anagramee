import React, { useEffect, useState } from "react"
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
  const mockProp = {text: props.text, verticalLength: 5, horizontalLength: 20}
  const lines = initialize(mockProp.text, mockProp.horizontalLength, mockProp.verticalLength, )
  const [items, setItems] = useState(lines)
  const [previewText, setText] = useState(props.text.split("n"))

  useEffect(() => {
    const text = joinText(items)
    setText(text)
  }, [items])

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
      setItems({
        ...items,
        [sourceId]: result[0],
        [targetId]: result[1]
      })

      return
    }
    const result = swap(items[sourceId], sourceIndex, targetIndex)
    return setItems({
      ...items,
      [sourceId]: result
    })
  }

  return(
    <>
      <GridContextProvider onChange={onChange}>
        {Object.keys(items).map((key) => (
            <GridDropZone
              key={key}
              id={key}
              {...props.editorConf}
            >
              {items[key].map((item) => (
                <GridItem key={item.key}>
                  <WordPanel element={item} />
                </GridItem>
              ))}
            </GridDropZone>
        ))}
      </GridContextProvider>
      <Preview lines={previewText} />
    </>
  )
}

//文章の初期化
function initialize(text: string, horizontalLength: number, verticalLength: number): Lines {
  const words = text.split("")
  const elements: WordPanelElement[] = words.map( (word, index) => {
    const line = Math.floor(index / horizontalLength)
    return {key: `${index}`, word: `${word}`, line: line}
  })
  const lines = devideLine(elements, verticalLength)
  lines['layoutItems'] = getLayoutItems(5)
  return lines
}

//レイアウト用アイテムの取得
function getLayoutItems(lfNum: number): WordPanelElement[] {
  let preItem = "n".repeat(lfNum)
  const splitItems = preItem.split("")
  const elements = splitItems.map((item, index) => {
    return {key: `layout_item_${index}`, word: `${item}`, line: 1}
  })
  return elements
}

//ラインでグループ分け
function devideLine(elements: WordPanelElement[], verticalLength: number): Lines {
  const lines: Lines = {}
  for(let lineNum = 0; lineNum < verticalLength; lineNum++) {
    lines[`line_${lineNum}`] = extractTargetLineWords(elements, lineNum)
  }
  return lines
}

function extractTargetLineWords(elements: WordPanelElement[], line: number) {
  return elements.filter(element => {
    return element.line === line
  })
}

//入れ替えたテキストを合体
function joinText(elements: Lines): string[] {
  let text = ""
  Object.keys(elements).map( (key) => {
    if(key === 'layoutItems') {
      return
    }
    elements[key].map( element => (
      text = text + element.word
    ))
  })
  //TODO:改行文字は共通化すべき
  const textItems = text.split('n')
  return textItems
}