import React, { useEffect, useState } from 'react';
import { FunctionComponent } from 'react';
import api from '../../lib/api';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TableRowData, TableData, DiffResponseData } from '../../types/types';
import { Box, Button } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { useTableStyles } from '../../table-styles/tableStyles';
import {
  formatDate,
  SortbyNewestFirst,
  SortbyOldestFirst,
} from '../../utils/utils';

export const ProjectsTable: FunctionComponent = () => {
  const [projectsDiffResponse, setProjectsDiffResponse] =
    useState<DiffResponseData>();
  const [projectsData, setProjectsData] = useState<TableData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isSortedByOldest, setIsSortedByOldest] = useState<boolean>(false);

  const classes: ClassNameMap = useTableStyles();

  const fetchProjectsData = async (): Promise<void> => {
    setLoading(true);
    try {
      const result: DiffResponseData = await api.getProjectsDiff();
      setProjectsDiffResponse(result);
      if (isSortedByOldest) {
        setProjectsData((previousValue: any) =>
          SortbyOldestFirst([...previousValue, ...result.data])
        );
      } else {
        setProjectsData((previousValue: any) =>
          SortbyNewestFirst([...previousValue, ...result.data])
        );
      }
      setErrorMessage('');
    } catch (e) {
      console.log(e);
      setErrorMessage('We had problems fetching your data. Please try again');
    } finally {
      setLoading(false);
    }
  };

  const createData = (
    date: Date,
    id: string,
    oldValue: string,
    newValue: string
  ) => {
    return { date, id, oldValue, newValue };
  };

  const rows: TableRowData[] = projectsData?.map((project: TableData) =>
    createData(
      project.timestamp,
      project.id,
      project.diff[0].oldValue,
      project.diff[0].newValue
    )
  );

  useEffect(() => {
    fetchProjectsData();
  }, []);

  return (
    <div className={classes.tableContainer}>
      <h1 className={classes.title}>Projects</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>
                Date &nbsp;
                {!isSortedByOldest ? (
                  <span
                    className={classes.icon}
                    onClick={() => {
                      setIsSortedByOldest(!isSortedByOldest);
                      SortbyOldestFirst(projectsData);
                    }}
                  >
                    &#8681;
                  </span>
                ) : (
                  <span
                    className={classes.icon}
                    onClick={() => {
                      setIsSortedByOldest(!isSortedByOldest);
                      SortbyNewestFirst(projectsData);
                    }}
                  >
                    &#8679;
                  </span>
                )}
              </TableCell>
              <TableCell className={classes.tableHead}>Project ID</TableCell>
              <TableCell className={classes.tableHead}>Old value</TableCell>
              <TableCell className={classes.tableHead}>New value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.length > 0 &&
              rows?.map((row: TableRowData, idx: number) => (
                <TableRow key={idx}>
                  <TableCell component='th' scope='row'>
                    {`${formatDate(row.date)}`}
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.oldValue}</TableCell>
                  <TableCell>{row.newValue}</TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell colSpan={4} className={classes.loadingCell}>
                <Box>
                  {errorMessage && (
                    <Box m={2}>
                      <p className={classes.error}>{errorMessage}</p>
                    </Box>
                  )}
                  {projectsDiffResponse &&
                    !loading &&
                    projectsData.length < projectsDiffResponse.total && (
                      <Button
                        onClick={fetchProjectsData}
                        className={classes.button}
                        variant='contained'
                      >
                        {!errorMessage ? 'Load more' : 'Retry'}
                      </Button>
                    )}
                  {loading && (
                    <CircularProgress
                      color='secondary'
                      className={classes.spinner}
                    />
                  )}
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
