import React from 'react'
import styled from 'styled-components'
import { WordPanelElement } from '../../types/editor'

const Panel = styled.div`
  display: inline-block;
  width: 40px;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  cursor: grab;
  background-color: rgba(0,0,0,0.3);
  &:active {
    cursor: grabbing;
  }
`

interface Props {
  element: WordPanelElement
}

export const WordPanel: React.FC<Props> = (props) => (
  <Panel>
    {props.element.word}
  </Panel>
)