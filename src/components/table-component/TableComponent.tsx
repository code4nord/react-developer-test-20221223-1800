import React, { useEffect, useState } from 'react';
import { FunctionComponent } from 'react';
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

interface TableComponentProps {
  title: string;
  getDiff: () => Promise<DiffResponseData>;
}

export const TableComponent: FunctionComponent<TableComponentProps> = (
  props
) => {
  const [diffResponse, setDiffResponse] = useState<DiffResponseData>();
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isSortedByOldest, setIsSortedByOldest] = useState<boolean>(false);

  const classes: ClassNameMap = useTableStyles();

  const fetchTableData = async (): Promise<void> => {
    setLoading(true);
    try {
      const result: DiffResponseData = await props.getDiff();
      setDiffResponse(result);
      if (isSortedByOldest) {
        setTableData((previousValue: TableData[]) =>
          SortbyOldestFirst([...previousValue, ...result.data])
        );
      } else {
        setTableData((previousValue: TableData[]) =>
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

  const rows: TableRowData[] = tableData?.map((row: TableData) =>
    createData(
      row.timestamp,
      row.id,
      row.diff[0].oldValue,
      row.diff[0].newValue
    )
  );

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <div className={classes.tableContainer}>
      <h1 className={classes.title}>{props.title}</h1>
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
                      SortbyOldestFirst(tableData);
                    }}
                  >
                    &#8681;
                  </span>
                ) : (
                  <span
                    className={classes.icon}
                    onClick={() => {
                      setIsSortedByOldest(!isSortedByOldest);
                      SortbyNewestFirst(tableData);
                    }}
                  >
                    &#8679;
                  </span>
                )}
              </TableCell>
              <TableCell className={classes.tableHead}>
                {props.title} ID
              </TableCell>
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
                  {diffResponse &&
                    !loading &&
                    tableData.length < diffResponse.total && (
                      <Button
                        onClick={fetchTableData}
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
