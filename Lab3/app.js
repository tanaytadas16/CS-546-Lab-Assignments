const people = require('./people');
const stock = require('./stocks');

async function main() {
    try {
        const personbyid = await people.getPersonById(
            '7989fa5e-8f3f-458d-ad58-23c8d9ef5a10'
        );
        console.log(personbyid);
    } catch (e) {
        console.log(e);
    }
    try {
        const personbyid = await people.sameStreet('Sutherland', 'Point');
        console.dir(personbyid, { depth: null });
    } catch (e) {
        console.log(e);
    }
    try {
        const ssn = await people.manipulateSsn();
        console.log(ssn);
    } catch (e) {
        console.log(e);
    }
    try {
        const bday = await people.sameBirthday(4, 25);
        console.dir(bday, { depth: null });
    } catch (e) {
        console.log(e);
    }
    try {
        const list = await stock.listShareholders();
        console.dir(list, { depth: null });
    } catch (e) {
        console.log(e);
    }
    try {
        const topshare = await stock.topShareholder(
            'Capital Southwest Corporation'
        );
        console.log(topshare);
    } catch (e) {
        console.log(e);
    }
    try {
        const listStock = await stock.listStocks('Grenville', 'Pawelke');
        console.dir(listStock, { depth: null });
    } catch (e) {
        console.log(e);
    }
    try {
        const stockid = await stock.getStockById(
            'f652f797-7ca0-4382-befb-2ab8be914ff0'
        );
        console.dir(stockid, { depth: null });
    } catch (e) {
        console.log(e);
    }
}

main();
