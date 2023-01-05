import React from 'react';
import { Container, Box } from '@material-ui/core';
import { TableComponent } from './users/TableComponent';
import api from '../lib/api';

export const App = () => {
  return (
    <Container className='app' fixed>
      <Box data-testid="app-box">
        <TableComponent title='Users' getDiff={api.getUsersDiff} />
        <TableComponent title='Projects' getDiff={api.getProjectsDiff} />
      </Box>
    </Container>
  );
};

export default App;
