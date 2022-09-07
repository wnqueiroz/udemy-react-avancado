export type LogoProps = {
  data: {
    attributes: {
      url: string
      alternativeText: string
    }
  }
}

export type LandingPageProps = {
  logo: LogoProps
}
