import csv from 'csv-parser';
import fs from 'fs';
import Prisma from '@prisma/client';

const {PrismaClient} = Prisma;



async function loadCounties() {
    const prisma = new PrismaClient();
    const filePath = 'utils/CAcountyDataWiki.csv'

    const filter = /\[.*]|\s?\(.*\)/g;

    console.log("Loading county data from " + filePath + " ... ");

    fs.createReadStream(filePath).pipe(
        csv({
            mapHeaders: ({header, index}) => header.replace(filter,''),
            mapValues: ({header, index, value}) => value.replace(filter,''),
        }).on('data', async (county) => {
            await prisma.county.create({
                data: {
                    name: county.County,
                    population: parseInt(county.Population.replace(/,/g,'')),
                    area: parseFloat(county.Area.replace(/,/g,'')),
                }
            });
        })
    );
}

export default loadCounties;
