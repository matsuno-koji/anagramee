import React from "react"
import { EditAnagramRepository } from "../repositories/edit_anagram_repository"
import styled from "styled-components"
import { Editor } from "../components/editor/editor"

const EditorWrpaeer = styled.div`
  width: 400px;
`

export const Edit: React.FC = () => {
  const repository = new EditAnagramRepository()
  const info = repository.get()
  const editorConf = {
    boxesPerRow: 10,
    rowHeight: 50,
    style: { height: "250px" }
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