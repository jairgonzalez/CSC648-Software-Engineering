import Prisma from '@prisma/client';

const {PrismaClient} = Prisma
const prisma = new PrismaClient();

// Generates random values between these dates:
const startDate = new Date(2020,0,1);
const endDate = new Date();
const minAqi = 50;
const maxAqi = 250;
const evacLevel = 2;
const minArea = 5.0;
const maxArea = 2000.0;
const active = false;

const minCases = 0;
const maxCases = 300;
const minDeaths = 0;
const maxDeaths = 40;
const minIcu = 0;
const maxIcu = 40;

function makeRandomFireRecord(name) {
    const newRecord = {
        start_date: new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())),
        aqi: Math.round(minAqi + Math.random() * (maxAqi - minAqi)),
        EvacuationLevel: evacLevel,
        area: minArea + Math.random() * (maxArea - minArea),
        active: active,
        name: name
    };
    return newRecord;
}

function makeRandomCovidRecord() {
    let icu = Math.round(minIcu + Math.random() * (maxIcu - minIcu));
    const newRecord = {
        cases: Math.round(minCases + Math.random() * (maxCases - minCases)),
        icu: icu,
        hosp: Math.round(icu + Math.random() * (5)),
        deaths: Math.round(minDeaths + Math.random() * (maxDeaths - minDeaths)),
        date: new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()))
    };
    return newRecord;
}

// creates numRecords random COVID and Fire records in each county
async function populateRecords(numRecords, creatorEmail) {
    const counties = await prisma.county.findMany();
    for(let county of counties) {
        console.log(`Populating ${county.name}...`);
        for(let i=0; i<numRecords; i++){
            const newCovidRecord = makeRandomCovidRecord()
            const covidRecord = await prisma.covidRecord.create({
                data: {
                    ...newCovidRecord,
                    county: {
                        connect: {
                            id: county.id
                        }
                    },
                    submitter: {
                        connect: {
                            email: creatorEmail,
                        }
                    }
                }
            });
            const newFireRecord = makeRandomFireRecord();
            const fireRecord = await prisma.fireRecord.create({
                data: {
                    ...newFireRecord,
                    county: {
                        connect: {
                            id: county.id
                        }
                    },
                    submitter: {
                        connect: {
                            email: creatorEmail,
                        }
                    }
                }
            });
        }
    }
}

export default populateRecords;

const args = process.argv.slice(2);
const numRecords = args.length > 1 ? parseInt(args[1]) : 25;
const creatorEmail = args[0];
if(numRecords == undefined) {
    console.log(`Number of records ${args[0]} could not be parsed as an integer - exiting`);
    process.exit(0);
}
console.log(`Creating ${numRecords} random records per county...`);
try{
    await populateRecords(numRecords, creatorEmail);
} catch(err) {
    console.log("There was an error: ");
    console.log(err);
    console.log("Usage: [creatorEmail] [numRecords]?");
    console.log("To pass args using npm script, remember that args come after --");
}
console.log(`...done`);

setTimeout(process.exit(0),3000);
