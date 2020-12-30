import React, { useEffect, useState } from 'react';
import { PulseLoader } from 'halogenium';

import { Container } from '@components/Layouts';
import { Text } from '@components/DataDisplay';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useAuthorizedFetch } from '@hooks';
import Button from '@components/Inputs/Button';
import Fire from '../types/Fire';
import Covid from '../types/Covid';

export default (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const authFetch = useAuthorizedFetch();
  const [fireArray, setFireArray] = useState<Array<Fire>>([]);
  const [covidArray, setCovidArray] = useState<Array<Covid>>([]);
  const [numClicks, setNumClicks] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/records/submitted/`;
      authFetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          setFireArray(data.fireRecords);
          setCovidArray(data.covidRecords);
          setIsLoading(false);
        });
    };
    fetchData().catch((err) => console.log(err));
  }, [numClicks]);
  function handleDelete(type: string, id: number): () => Promise<void> {
    return async () => {
      try {
        await authFetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/employee/${type}/delete/?id=${id}`
        );
        setNumClicks((prevState) => prevState + 1);
      } catch (err) {
        alert('There was an error deleting that record');
      }
    };
  }
  type FireTableProps = {
    fireArray: Array<Fire>;
  };
  type CovidTableProps = {
    covidArray: Array<Covid>;
  };
  const FireTable = ({ fireArray }: FireTableProps): JSX.Element => {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Aqi</TableCell>
              <TableCell>Area</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Active Status</TableCell>
              <TableCell>Evacuation Level</TableCell>
              <TableCell>Approved</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fireArray?.map((fireEntry) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {fireEntry.name}
                </TableCell>
                <TableCell>{fireEntry.aqi}</TableCell>
                <TableCell>{fireEntry.area}</TableCell>
                <TableCell>{fireEntry.start_date}</TableCell>
                <TableCell>{fireEntry.end_date}</TableCell>
                <TableCell>{fireEntry.active}</TableCell>
                <TableCell>{fireEntry.EvacuationLevel}</TableCell>
                <TableCell>{fireEntry.approved.toString()}</TableCell>
                <TableCell>
                  <Button onClick={handleDelete('fire', fireEntry.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const CovidTable = ({ covidArray }: CovidTableProps): JSX.Element => {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>County</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Cases</TableCell>
              <TableCell>Hospitalizations</TableCell>
              <TableCell>ICU Cases</TableCell>
              <TableCell>Deaths</TableCell>
              <TableCell>Approved</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {covidArray?.map((covidEntry) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {
                    covidEntry.county?.name // -> needs to ensure record stores county name
                  }
                </TableCell>
                <TableCell>{covidEntry.date}</TableCell>
                <TableCell>{covidEntry.cases}</TableCell>
                <TableCell>{covidEntry.hosp}</TableCell>
                <TableCell>{covidEntry.icu}</TableCell>
                <TableCell>{covidEntry.deaths}</TableCell>
                <TableCell>{covidEntry.approved.toString()}</TableCell>
                <TableCell>
                  <Button onClick={handleDelete('covid', covidEntry.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return isLoading ? (
    <Container align="center">
      <PulseLoader color="#26A65B" size="16px" margin="4px" />
    </Container>
  ) : (
    <Container align="center">
      <Text variant="h2">Employee Dashboard</Text>
      <Text variant="h3">Fire Records</Text>
      <FireTable fireArray={fireArray} />
      <Text variant="h3">Covid Records</Text>
      <CovidTable covidArray={covidArray} />
    </Container>
  );
};
