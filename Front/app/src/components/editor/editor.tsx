import React, { useEffect, useState } from "react"
import { WordPanel } from "./wordpanel"
import { WordPanelElement } from "../../types/editor"
import { Preview } from "../editor/preview"
import styled from "styled-components"
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move
} from "react-grid-dnd"
import { keys } from "@material-ui/core/styles/createBreakpoints"

const Spacer = styled.div`
  width: 100%;
  height: 16px;
`
interface Props {
  theme: string
  panelConf: {
    height: number,
    width: number,
    rowLength: number,
    verticalLength: number
  }
  editorConf: {
    boxesPerRow: number
    rowHeight: number
    style?: React.CSSProperties
  }
}

interface Line {
  index: number,
  elements: WordPanelElement[]
  isLayout: boolean,
}

interface Lines {
  [id: string]: Line
}

export const Editor: React.FC<Props> = (props) => {
  const lines = initialize(props.theme, props.panelConf.rowLength, props.panelConf.verticalLength)
  const [items, setItems] = useState(lines)
  const [previewText, setText] = useState(props.theme.split("n"))
  useEffect(() => {
    setItems(lines)
  }, [props.theme])

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
        items[sourceId].elements,
        items[targetId].elements,
        sourceIndex,
        targetIndex
      );
      items[sourceId].elements = result[0]
      items[targetId].elements = result[1]
      if (isOutOfFrame(items, props.editorConf.boxesPerRow)) {
        return
      }
      if (isLineBreakRequired(items, props.editorConf.boxesPerRow)) {
        const lineBrokenItems = lineBreak(items, props.editorConf.boxesPerRow)
        setItems({...lineBrokenItems})
        return
      }
      setItems({...items})
      return
    }
    const result = swap(items[sourceId].elements, sourceIndex, targetIndex)
    items[sourceId].elements = result
    return setItems({...items})
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
              {items[key].elements.map((item) => (
                <GridItem key={item.key}>
                  <WordPanel element={item} />
                </GridItem>
              ))}
            </GridDropZone>
        ))}
      </GridContextProvider>
      <Spacer/>
      <Preview lines={previewText} />
    </>
  )
}

//文章の初期化
function initialize(text: string, horizontalLength: number, verticalLength: number): Lines {
  const words = text.split("")
  const elements: WordPanelElement[] = words.map( (word, index) => {
    const line = Math.floor(index / horizontalLength)
    return {key: `${index}`, word: `${word}`, line: line, isLayout: false}
  })
  const lines = devideLine(elements, verticalLength)
  lines['layoutItems'] = {index: Object.keys(lines).length + 1, elements: getLayoutItems(5), isLayout: true}
  return lines
}

//レイアウト用アイテムの取得
function getLayoutItems(lfNum: number): WordPanelElement[] {
  let preItem = "n".repeat(lfNum)
  const splitItems = preItem.split("")
  const elements = splitItems.map((item, index) => {
    return {key: `layout_item_${index}`, word: `${item}`, line: 1, isLayout: true}
  })
  return elements
}

//ラインでグループ分け
function devideLine(elements: WordPanelElement[], verticalLength: number): Lines {
  const lines: Lines = {}
  for(let lineNum = 0; lineNum < verticalLength; lineNum++) {
    lines[`line_${lineNum}`] = {index: lineNum, elements: extractTargetLineWords(elements, lineNum), isLayout: false}
  }
  return lines
}

function extractTargetLineWords(elements: WordPanelElement[], line: number) {
  return elements.filter(element => {
    return element.line === line
  })
}

//入れ替えたテキストを合体
function joinText(lines: Lines): string[] {
  let text = ""
  Object.keys(lines).map( (key) => {
    if(lines[key].isLayout) {
      return
    }
    lines[key].elements.map( element => (
      text = text + element.word
    ))
  })
  //TODO:改行文字は共通化すべき
  const textItems = text.split('n')
  return textItems
}

function isOutOfFrame(lines: Lines, boxesPerRow: number): boolean {
  const keys = Object.keys(lines)
  const lastLineIndex = keys.length
  let result = false
  keys.map((key) => {
    if(lines[key].index === lastLineIndex) {
      result = lines[key].elements.length >= boxesPerRow
    }
  })
  return result
}

function isLineBreakRequired(lines: Lines, boxesPerRow: number): boolean {
  let result = false
  Object.keys(lines).map((key) => {
    if (lines[key].elements.length >= boxesPerRow) {
      result = true
    }
  })
  return result
}

function lineBreak(lines: Lines, boxesPerRow: number): Lines {
  const keys = Object.keys(lines)
  keys.map((key, index) => {
      if (lines[key].elements.length >= boxesPerRow) {
        const lastOfLineElement = lines[key].elements.pop()
        if (lastOfLineElement === undefined) {
          return
        }
        lines[keys[index + 1]].elements.unshift(lastOfLineElement)
      }
  })
  return lines
}