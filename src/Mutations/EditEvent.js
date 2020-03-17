export const EditEvent = `mutation editEvent($id: ID!, $description: String)
{
    editEvent(
      id: $id,
      description: $description,
    ){
        id
        name
        when
        where
        author
        description
    }
}`