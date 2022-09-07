export type ImageDataProps = {
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
  image: ImageDataProps
}

export type SectionAboutProjectProps = {
  title: string
  description: string
  image: ImageDataProps
}

export type SectionTechProps = {
  title: string
  techIcons: {
    title: string
    icon: ImageDataProps
  }[]
}

export type SectionConceptsProps = {
  title: string
  concepts: {
    title: string
  }[]
}

export type SectionModulesProps = {
  title: string
  modules: {
    title: string
    subtitle: string
    description: string
  }[]
}

export type SectionAgendaProps = {
  title: string
  description: string
}

export type PricingBoxProps = {
  benefits: string
  totalPrice: number
  priceInstallment: number
  numberInstallments: number
  button: {
    label: string
    url: string
  }
}

export type SocialLink = {
  title: string
  url: string
}

export type Author = {
  attributes: {
    photo: ImageDataProps
    name: string
    role: string
    socialLinks: Array<SocialLink>
    description: string
  }
}

export type SectionAboutUsProps = {
  title: string
  authors: {
    data: Array<Author>
  }
}

export type LandingPageProps = {
  logo: ImageDataProps
  header: HeaderProps
  pricingBox: PricingBoxProps
  sectionTech: SectionTechProps
  sectionAgenda: SectionAgendaProps
  sectionAboutUs: SectionAboutUsProps
  sectionModules: SectionModulesProps
  sectionConcepts: SectionConceptsProps
  sectionAboutProject: SectionAboutProjectProps
}
