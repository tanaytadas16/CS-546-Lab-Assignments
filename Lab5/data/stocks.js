const axios = require('axios');
async function getStocks() {
    const { data } = await axios.get(
        'https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json'
    );
    return data;
}
async function getStockById(id) {
    id = id.trim();
    let bool = false;
    data = await getStocks();
    for (let u of data) {
        if (id === u.id) {
            bool = true;
            return u;
        }
    }
    if (bool === false) throw 'Person not found';
}
module.exports = { getStocks, getStockById };
