/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProjectForEdit = /* GraphQL */ `
  query GetProjectForEdit($id: String!, $key: String!) {
    getProjectForEdit(id: $id, key: $key) {
      id
      name
      description
      type
      status
      field
      country
      location
      zone
      contact_firstname
      contact_lastname
      contact_entity
      url
      date
      dates
      time
      pubId
      createdAt
      state
      thematics
      continent
      team {
        firstname
        lastname
        entity
      }
    }
  }
`;
export const getProject = /* GraphQL */ `
  query GetProject($pubId: String!) {
    getProject(pubId: $pubId) {
      id
      name
      description
      type
      status
      field
      country
      location
      zone
      contact_firstname
      contact_lastname
      contact_entity
      url
      date
      dates
      time
      pubId
      createdAt
      state
      thematics
      continent
      team {
        firstname
        lastname
        entity
      }
      updatedAt
    }
  }
`;
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $pubId: String
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listProjects(
      pubId: $pubId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        description
        type
        status
        field
        country
        location
        zone
        contact_firstname
        contact_lastname
        contact_entity
        url
        date
        dates
        time
        pubId
        createdAt
        state
        thematics
        continent
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchProjects = /* GraphQL */ `
  query SearchProjects(
    $filter: SearchableProjectFilterInput
    $sort: SearchableProjectSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchProjects(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        type
        status
        field
        country
        location
        zone
        contact_firstname
        contact_lastname
        contact_entity
        url
        date
        dates
        time
        pubId
        createdAt
        state
        thematics
        continent
        updatedAt
      }
      nextToken
      total
    }
  }
`;
