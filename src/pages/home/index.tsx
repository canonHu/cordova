import React from 'react'
import { styled } from 'linaria/react'

const Title = styled.view`
  color: ${props => props.color}
`;

const Index = () => {
  return <Title color='red' className="aaa">
    Hello World!
  </Title>
}

export default Index