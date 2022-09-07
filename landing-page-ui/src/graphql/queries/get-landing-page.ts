import { gql } from 'graphql-request'

export const GET_LANDING_PAGE = gql`
  fragment imageData on UploadFileEntityResponse {
    data {
      attributes {
        url
        alternativeText
      }
    }
  }

  fragment logo on LandingPage {
    logo {
      ...imageData
    }
  }

  fragment header on LandingPage {
    header {
      title
      description
      button {
        label
        url
      }
      image {
        ...imageData
      }
    }
  }

  fragment sectionAboutProject on LandingPage {
    sectionAboutProject {
      title
      description
      image {
        ...imageData
      }
    }
  }

  query GET_LANDING_PAGE {
    landingPage {
      data {
        attributes {
          ...logo
          ...header
          ...sectionAboutProject
        }
      }
    }
  }
`
