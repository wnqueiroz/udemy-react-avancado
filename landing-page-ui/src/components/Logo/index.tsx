import React from 'react'
import { LogoProps } from '../../types/api'
import { getImageUrl } from '../../utils/get-image-url'
import * as S from './styles'

const Logo = ({
  data: {
    attributes: { alternativeText, url }
  }
}: LogoProps) => <S.LogoWrapper src={getImageUrl(url)} alt={alternativeText} />

export default Logo
