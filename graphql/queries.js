/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getItem = `query GetItem($pubId: String!) {
  getItem(pubId: $pubId) {
    id
    name
    description
    type
    status
    field
    country
    city
    zone
    contact_firstname
    contact_lastname
    contact_entity
    url
    date
    time
    pubId
    createdAt
    state
    thematics
  }
}
`;
export const getProject = `query GetProject($pubId: String!) {
  getProject(pubId: $pubId) {
    id
    name
    description
    type
    status
    field
    country
    city
    zone
    contact_firstname
    contact_lastname
    contact_entity
    url
    date
    time
    pubId
    createdAt
    state
    thematics
  }
}
`;
export const listProjects = `query ListProjects(
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
      city
      zone
      contact_firstname
      contact_lastname
      contact_entity
      url
      date
      time
      pubId
      createdAt
      state
      thematics
    }
    nextToken
  }
}
`;
export const searchProjects = `query SearchProjects(
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
      city
      zone
      contact_firstname
      contact_lastname
      contact_entity
      url
      date
      time
      pubId
      createdAt
      state
      thematics
    }
    nextToken
    total
  }
}
`;
