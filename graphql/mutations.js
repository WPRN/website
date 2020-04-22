/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const newProject = `mutation NewProject($input: CreateProjectInput!) {
  newProject(input: $input)
}
`;
export const editProject = `mutation EditProject($input: EditProjectInput!) {
  editProject(input: $input)
}
`;
export const newContact = `mutation NewContact($input: CreateContactInput!) {
  newContact(input: $input)
}
`;
export const verifyEmail = `mutation VerifyEmail($id: String!, $key: String!) {
  verifyEmail(id: $id, key: $key)
}
`;
export const createProject = `mutation CreateProject(
  $input: CreateProjectInput!
  $condition: ModelProjectConditionInput
) {
  createProject(input: $input, condition: $condition) {
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
export const updateProject = `mutation UpdateProject(
  $input: UpdateProjectInput!
  $condition: ModelProjectConditionInput
) {
  updateProject(input: $input, condition: $condition) {
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
export const deleteProject = `mutation DeleteProject(
  $input: DeleteProjectInput!
  $condition: ModelProjectConditionInput
) {
  deleteProject(input: $input, condition: $condition) {
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
