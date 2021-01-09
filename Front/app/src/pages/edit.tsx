import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Editor } from "../components/editor/editor"


const panelHeight = 50
const panelWidth = 40
const horizontanLength = 20
const verticalLength = 5
const EditorWrpaeer = styled.div`
  position: absolute;
  width: ${panelWidth * horizontanLength + 1}px;
`
const PanelBoard = styled.div`
  position: relative;
  width: ${panelWidth * horizontanLength + 1}px;
  height: ${panelHeight * verticalLength + 1}px;
  border: 1px solid orange;
`
const PanelBoardBackground = styled.div`
  position: absolute;
  width: ${panelWidth * horizontanLength + 1}px;
  height: ${panelHeight * verticalLength + 1}px;
  z-index: -1;
  background-image: linear-gradient(#000 1px, transparent 0),
                    linear-gradient(90deg, #000 1px, transparent 0);
  background-size: ${panelWidth}px ${panelHeight}px;
`

const ThemeInput = styled.input`
  width:50%;
`
const ThemeSetBtn = styled.button`

`
export const Edit: React.FC = () => {
  const [theme, setTheme] = useState("")
  const [themeValue, setThemeValue] = useState("")
  const editorConf = {
    boxesPerRow: 20,
    rowHeight: 50,
    style: { height: "50px"}
  }

  const themeInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThemeValue(event.target.value)
  }

  const themeSetBtnOnClick = () => {
    setTheme(themeValue)
  }

  return(
    <>
      <h1>お題：</h1>
      <ThemeInput onChange={themeInputOnChange}/>
      <ThemeSetBtn onClick={themeSetBtnOnClick}>
        お題をボードにセットする
      </ThemeSetBtn>
      <PanelBoard>
        <PanelBoardBackground />
        <EditorWrpaeer>
          <Editor text={theme} editorConf={editorConf} />
        </EditorWrpaeer>
      </PanelBoard>
    </>
  )
}