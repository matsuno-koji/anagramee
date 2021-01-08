import React from "react"
import { EditAnagramRepository } from "../repositories/edit_anagram_repository"
import styled from "styled-components"
import { Editor } from "../components/editor/editor"
import { start } from "repl"

const EditorWrpaeer = styled.div`
  width: 1100px;
`

export const Edit: React.FC = () => {
  const repository = new EditAnagramRepository()
  const info = repository.get()
  const editorConf = {
    boxesPerRow: 20,
    rowHeight: 50,
    style: { height: "50px" , border_box: "1px solid black", display: 'flex', justify_content: 'flex-start'}
  }
  return(
    <>
      <h1>お題：{info.theme_anagram}</h1>
      <EditorWrpaeer>
        <Editor text={info.theme_anagram} editorConf={editorConf} />
      </EditorWrpaeer>
    </>
  )
}