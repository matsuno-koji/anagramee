import React, { useState } from 'react'
import { Editor } from "../components/editor/editor"
import styled from "styled-components"

import { 
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
} from '@material-ui/core'

//パネル設定
const PanelConf = {
  height: 50,
  width: 40,
  rowLength: 15,
  verticalLength: 5,
}

const EditorWrpaeer = styled.div`
  position: absolute;
  width: ${PanelConf.width * PanelConf.rowLength + 1 + PanelConf.width}px;
`
const PanelBoard = styled.div`
  position: relative;
  width: ${PanelConf.width * PanelConf.rowLength + 1}px;
  height: ${PanelConf.height * PanelConf.verticalLength + 1 + PanelConf.height}px;
  border: 1px solid orange;
`
const PanelBoardBackground = styled.div`
  position: absolute;
  width: ${PanelConf.width * PanelConf.rowLength + 1}px;
  height: ${PanelConf.height * PanelConf.verticalLength + 1}px;
  z-index: -1;
  background-image: linear-gradient(#000 1px, transparent 0),
                    linear-gradient(90deg, #000 1px, transparent 0);
  background-size: ${PanelConf.width}px ${PanelConf.height}px;
`

const LayoutItemBoardBackground = styled.div`
  position: absolute;
  top: ${PanelConf.height * PanelConf.verticalLength}px;
  left: 0;
  width: ${PanelConf.width * PanelConf.rowLength + 1}px;
  height: ${PanelConf.height + 1}px;
  z-index: -1;
  background-image: linear-gradient(#000 1px, transparent 0),
  linear-gradient(90deg, #000 1px, transparent 0);
  background-size: ${PanelConf.width}px ${PanelConf.height}px;
  background-color: #bdbdbd;
`
const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 16px 0px;
`

const PanelBoardContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Spacer = styled.div`
  width: 100%;
  height: 16px;
`

const ContentWrapper = styled.div`
  padding-top: 32px;
  padding-bottom: 32px;
`

export function EditPage() {
  const defaultTheme = "お題をセットしてアナグラムを作りましょう！"
  const [theme, setTheme] = useState(defaultTheme)
  const [themeValue, setThemeValue] = useState(defaultTheme)
  const editorConf = {
    boxesPerRow: PanelConf.rowLength + 1,
    rowHeight: PanelConf.height,
    style: { height: `${PanelConf.height}px`}
  }

  const handleThemeInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThemeValue(event.target.value)
  }

  const handleSetBtnOnClick = () => {
    setTheme(themeValue)
  }
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="classes.title">
            アナグラムエディタ
          </Typography>
        </Toolbar>
      </AppBar>
      <ContentWrapper>
        <Container maxWidth="sm">
          <TextField
            onChange={handleThemeInputOnChange}
            id="theme_input"
            size="medium"
            label="お題"
            fullWidth
          />
          <BtnWrapper>
            <Button
              onClick={handleSetBtnOnClick}
              variant="contained"
              color="primary"
            >
              お題をボードにセットする
            </Button>
          </BtnWrapper>
        </Container>
        <Spacer/>
        <Container maxWidth="md">
          <PanelBoardContainer>
            <PanelBoard>
              <PanelBoardBackground />
              <LayoutItemBoardBackground />
              <EditorWrpaeer>
                <Editor theme={theme} panelConf={PanelConf} editorConf={editorConf} />
              </EditorWrpaeer>
            </PanelBoard>
          </PanelBoardContainer>
        </Container>
      </ContentWrapper>
    </>
  )
}