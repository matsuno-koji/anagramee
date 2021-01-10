import React from 'react'
import styled from 'styled-components'
import { WordPanelElement } from '../../types/editor'
import KeyboarReturnIcon from '@material-ui/icons/KeyboardReturn'
const Panel = styled.div`
  display: flex;
  align-items: center;
  width: 39px;
  height: calc(100% - 1px);
  margin: 1px;
  box-sizing: border-box;
  cursor: grab;
  background-color: rgba(245,245,245,0.7);
  &:active {
    cursor: grabbing;
  }
  box-shadow: -1px -3px 2px 2px rgba(10,10,10,0.1) inset, 0px 0px 0px 1px rgba(10,10,10,0.02) inset;
`
const WordContainer = styled.p`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
`
interface Props {
  element: WordPanelElement
}

export const WordPanel: React.FC<Props> = (props) => {
  const returnIcon = <KeyboarReturnIcon />
  const displayWord = isReturn(props.element) ? returnIcon : props.element.word
  return (
  <Panel>
    <WordContainer>
      {displayWord}
    </WordContainer>
  </Panel>
  )
}

function isReturn(element: WordPanelElement) {
  if (!element.isLayout) {
    return false
  }
  if (element.word === 'n') {
    return true
  }
  return false
}