import React from "react"
import { EditAnagramRepository } from "../repositories/edit_anagram_repository"
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
const PanelBoardBackgroundWrapper = styled.div`
  position: absolute;
  width: ${panelWidth * horizontanLength + 1}px;
  height: ${panelHeight * verticalLength + 1}px;
  z-index: -1;
  background-image: linear-gradient(#000 1px, transparent 0),
                    linear-gradient(90deg, #000 1px, transparent 0);
  background-size: ${panelWidth}px ${panelHeight}px;
`

const PanelBoardBackground = styled.div`
  width: ${panelWidth}px;
  height: ${panelHeight}px;
  border-right: 1px solid blue;
  border-bottom: 1px solid blue;
  box-sizing: border-box;
`
export const Edit: React.FC = () => {
  const repository = new EditAnagramRepository()
  const info = repository.get()
  const editorConf = {
    boxesPerRow: 20,
    rowHeight: 50,
    style: { height: "50px"}
  }
  const PanelBoardBackgrounds = [];
  for (let i = 0; i < verticalLength * horizontanLength; i++) {
    PanelBoardBackgrounds.push(<><PanelBoardBackground /></>)
  }
  return(
    <>
      <h1>お題：{info.theme_anagram}</h1>
      <PanelBoard>
        <PanelBoardBackgroundWrapper>
          {/* {PanelBoardBackgrounds} */}
        </PanelBoardBackgroundWrapper>
        <EditorWrpaeer>
          <Editor text={info.theme_anagram} editorConf={editorConf} />
        </EditorWrpaeer>
      </PanelBoard>
    </>
  )
}