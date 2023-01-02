import React from 'react';
import { Container, Box } from '@material-ui/core';
import { UsersTable } from './users/UsersTable';
import { ProjectsTable } from './projects/ProjectsTable';

export const App = () => {
  return (
    <Container className='app' fixed>
      <Box data-testid="app-box">
        <UsersTable />
        <ProjectsTable />
      </Box>
    </Container>
  );
};

export default App;
