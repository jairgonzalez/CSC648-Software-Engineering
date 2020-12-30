import React, { useState } from 'react';
import queryString from 'querystring';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Container } from '@components/Layouts';
import { Link, Text } from '@components/DataDisplay';
import { Button } from '@components/Inputs';
import County from '../types/County';

const VPHome = (): JSX.Element => {
  const [infoType, setInfoType] = useState('All');
  const [county, setCounty] = useState('');
  const [countyList, setCountyList] = useState<Array<County>>([]);

  async function getCounties() {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const query = {
      name: county,
      type: infoType,
    };
    const url = `${baseURL}/api/counties/?${queryString.stringify(query)}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCountyList(data));
  }

  type CountyTableProps = {
    countyArray: Array<County>;
  };

  const CountyTable = ({ countyArray }: CountyTableProps): JSX.Element => {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>County Name</TableCell>
              <TableCell>Population</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countyArray.map((countyEntry) => (
              <TableRow key={countyEntry.id}>
                <TableCell component="th" scope="row">
                  <Link
                    href={{
                      pathname: `/infoPages/counties/${countyEntry.id}`,
                      query: {
                        type: infoType,
                      },
                    }}
                  >
                    {countyEntry.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={{
                      pathname: `/infoPages/counties/${countyEntry.id}`,
                      query: {
                        type: infoType,
                      },
                    }}
                  >
                    {countyEntry.population}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={{
                      pathname: `/infoPages/counties/${countyEntry.id}`,
                      query: {
                        type: infoType,
                      },
                    }}
                  >
                    {countyEntry.latitude}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={{
                      pathname: `/infoPages/counties/${countyEntry.id}`,
                      query: {
                        type: infoType,
                      },
                    }}
                  >
                    {countyEntry.longitude}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Container align="center">
      <Text variant="h2">CSC648.02 Team 6</Text>
      <Text variant="h3">Data Display</Text>
      <Text variant="h4">County:</Text>
      <input
        id="width"
        type="text"
        value={county}
        onChange={(event) => setCounty(event.target.value)}
      />
      <br />
      <Text variant="h4">Info Selection:</Text>
      <select
        name="infoType"
        id="infoType"
        onChange={(event) => setInfoType(event.target.value)}
      >
        <option value="All">All</option>
        <option value="Covid">Corona Virus</option>
        <option value="Fire">Fires</option>

      </select>
      <div>Leave blank for list of all counties.</div>
      <Button variant="secondary" onClick={() => getCounties()}>
        Search
      </Button>
      <CountyTable countyArray={countyList} />
    </Container>
  );
};

export default VPHome;
