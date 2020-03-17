export const CreateEvent = `mutation CreateEvent($authlevel: String, $name: String!, $when: String!, $where: String!, $description: String!) {
    createEvent(authlevel: $authlevel, name: $name, when: $when, where: $where, description: $description) {
      id
      authlevel
      name
      author
      where
      when
      description
    }
  }`;