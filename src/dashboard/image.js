import React from 'react'
import { Image } from 'semantic-ui-react'

const ImageExampleLink = () => (
  <Image
    src='https://react.semantic-ui.com/images/wireframe/image-text.png'
    as='a'
    size='medium'
    href='http://google.com'
    target='_blank'
  />
)

export default ImageExampleLink