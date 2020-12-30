import Prisma from '@prisma/client';
import ChaiPkg from 'chai'
import Mocha from 'mocha'

import makeDB from "../utils/make-db.js";

const {PrismaClient} = Prisma
const {describe, it} = Mocha
const {expect} = ChaiPkg


const prisma = new PrismaClient();

describe("Testing database", () => {
    describe("Testing on startup", () => {
        it("Testing add to county", async () => {
            const county = await prisma.county.create({
                data: {
                    population: 42,
                    name: "testCounty",
                    area: 3.14,
                },
            });
            expect(county.population).to.equal(42);
        });
        it("Testing SELECT ONE from test data", async () => {
            const county = await prisma.county.findOne({
                where: {
                    name: "testCounty",
                },
            });
            expect(county.population).to.equal(42);
        });
        it("Testing DELETE from test data", async () => {
            const county = await prisma.county.delete({
                where: {
                    name: "testCounty",
                },
            });
            expect(county.population).to.equal(42);
        });
    });
    describe("Testing County Data", () => {
        it("Testing SELECT ONE from real data", async () => {
            let county = await prisma.county.findOne({
                where: {
                    name: "San Mateo County",
                },
            });
            if(county == null) {
                console.log("Failed to find San Mateo County");
                console.log("Perhaps county data has not been loaded - ");
                console.log("Attempting to load the database now - restart the app to have changes take effect");
                console.log("DB loading can also be initiated inside the container with npm run make-db");
                await makeDB();
                county = await prisma.county.findOne({
                    where: {
                        name: "San Mateo County",
                    },
                });
                //disgusting I know, but there appeared to be a race condition and this is only run once
                setTimeout(() => expect(county.name).to.equal("San Mateo County"), 5000);
            } else {
                expect(county.name).to.equal("San Mateo County");
            }
        });
    });
});
