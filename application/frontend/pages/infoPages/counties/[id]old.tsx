import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Container } from '@components/Layouts';
import { Text } from '@components/DataDisplay';

const CountyPage = (): JSX.Element => {
  const firePerimGeoJSON =
    'https://opendata.arcgis.com/datasets/5da472c6d27b4b67970acc7b5044c862_0.geojson';
  const router = useRouter();
  const [initialized, setInit] = useState(false);
  const currCoords: [number, number, number] = [0, 0, 0];
  const [LongLat, setLongLat] = useState(currCoords);
  const [countyName, setCountyName] = useState('');
  const countyId = router.query.id;

  useEffect(() => {
    async function loadMap() {
      if (initialized) {
        return;
      }
      const leaflet = await import('leaflet');
      const L = leaflet;
      const url = process.env.NEXT_PUBLIC_BASE_URL;

      const currLongLat: [number, number, number] = [0, 0, 0];
      const fetchUrl = `${url}/api/counties/${countyId}`;

      const mymap = L.map('mapid').setView(L.latLng(currLongLat), 8);

      await fetch(fetchUrl)
        .then((response) => response.json())
        .then((data) => {
          currLongLat[0] = data.latitude;
          currLongLat[1] = data.longitude;
          setLongLat([data.longitude, data.latitude, 0]);
          setCountyName(data.name);
        });

      await fetch(firePerimGeoJSON)
        .then((response) => response.json())
        .then((data) => {
          const myLayer = L.geoJSON().addTo(mymap);
          myLayer.addData(data);
        });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 5,
        maxZoom: 18,
        id: 'OSM',
        tileSize: 512,
        zoomOffset: -1,
      }).addTo(mymap);
      const temp = L.latLng(currLongLat);
      mymap.setView(temp, 12);
      const CalBounds = L.latLngBounds(
        L.latLng(32.534156, -124.409591), // Southwest
        L.latLng(42.009518, -114.131211) // Northeast
      );

      mymap.setMaxBounds(CalBounds);
      mymap.fitBounds(CalBounds);
      mymap.setView(temp, 10);
    }

    loadMap();

    setInit(true);
  }, [initialized, LongLat, countyId]);

  return (
    <div>
      <Container align="center">
        <Text variant="h3">
          {router.query.type
            ? // @ts-ignore
              router.query.type.charAt(0).toUpperCase() +
              router.query.type.slice(1) +
              ' '
            : 'All'}
          Data for
          {' ' + countyName}
        </Text>
        County:
        {router.query.county || 'Not Specified'}
        <br />
        {LongLat}
      </Container>
      <div id="mapid" style={{ height: '500px' }} />
    </div>
  );
};

export default CountyPage;
