export type LogoProps = {
  data: {
    attributes: {
      url: string
      alternativeText: string
    }
  }
}

export type HeaderProps = {
  title: string
  description: string
  button: {
    label: string
    url: string
  }
  image: LogoProps
}

export type LandingPageProps = {
  logo: LogoProps
  header: HeaderProps
}
