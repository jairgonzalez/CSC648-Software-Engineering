import csv from 'csv-parser';
import fs from 'fs';
import Prisma from '@prisma/client';

const {PrismaClient} = Prisma;



function updateCountyGeoData() {
    const prisma = new PrismaClient();
    const filePath = 'utils/CountyGeoData.csv'

    //The following ABOMINATION is necessary because there are different types of dashes
    const filter = /–/g;

    console.log("Loading county data from " + filePath + " ... ");

    fs.createReadStream(filePath).pipe(
        csv({
            mapHeaders: ({header, index}) => header.replace(filter,'-'),
            mapValues: ({header, index, value}) => value.replace(filter,'-'),
        }).on('data', async (row) => {
            let counties = await prisma.county.findMany({
                where: {
                    name: {
                        contains: row.County,
                    }
                }
            });
            if(counties[0]){
                let updated = await prisma.county.update({
                    where: {
                        id: counties[0].id
                    },
                    data: {
                        latitude: parseFloat(row.Latitude),
                        longitude: parseFloat(row.Longitude)
                    }
                }).catch(error => console.log(`Failed to parse ${value}`));
            } else{
                console.log(`Error parsing ${JSON.stringify(row)}`);
            }
        })
    );
}



export default updateCountyGeoData;
