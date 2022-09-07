import React from 'react'
import { ImageDataProps } from '../../types/api'
import { getImageUrl } from '../../utils/get-image-url'
import * as S from './styles'

const Logo = ({
  data: {
    attributes: { alternativeText, url }
  }
}: ImageDataProps) => (
  <S.LogoWrapper src={getImageUrl(url)} alt={alternativeText} />
)

export default Logo
