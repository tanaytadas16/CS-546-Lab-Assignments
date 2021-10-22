const restaurants = require('./data/restaurants');
const connection = require('./config/mongoConnection');

const main = async () => {
    let Myfirstrestaurant;
    let Mysecondrestaurant;
    let Mythirdrestaurant;
    //1)
    try {
        Myfirstrestaurant = await restaurants.create(
            'Curry on',
            'jersey city, New Jersey',
            '456-786-0133',
            'http://www.curryon.com',
            '$$$',
            ['Indian', 'American'],
            4,
            { dineIn: true, takeOut: true, delivery: true }
        );
        console.log(Myfirstrestaurant);
    } catch (e) {
        console.log(e);
    }
    //2)

    try {
        Mysecondrestaurant = await restaurants.create(
            'Karma Kafe',
            'Hoboken, New Jersey',
            '456-786-0133',
            'http://www.karmakafe.com',
            '$$$',
            ['Indian', 'American'],
            4,
            { dineIn: true, takeOut: true, delivery: true }
        );
    } catch (e) {
        console.log(e);
    }

    // //4)
    try {
        const getlist = await restaurants.getAll();
        console.log(getlist);
    } catch (e) {
        console.log(e);
    }
    // //5)
    try {
        Mythirdrestaurant = await restaurants.create(
            'Chipotle',
            'Hoboken, New Jersey',
            '456-786-0133',
            'http://www.chipotlehoboken.com',
            '$$$',
            ['Mexican', 'American'],
            4,
            { dineIn: true, takeOut: true, delivery: true }
        );
        //6)
        console.log(Mythirdrestaurant);
    } catch (e) {
        console.log(e);
    }

    //7)
    try {
        const updated = await restaurants.rename(
            Myfirstrestaurant._id,
            'http://www.CurryOnHoboken.com'
        );
        //8)
        console.log(updated);
    } catch (e) {
        console.log(e);
    }
    //9)
    try {
        const deleterest = await restaurants.remove(Mysecondrestaurant._id);
        console.log(deleterest);
    } catch (e) {
        console.log(e);
    }
    //10)
    try {
        const getlist = await restaurants.getAll();
        console.log(getlist);
    } catch (e) {
        console.log(e);
    }
    //->11)
    try {
        Mywrongrestaurant = await restaurants.create(
            'Curry on',
            'jersey city, New Jersey',
            '456-76-0133',
            'http://www.curry.com',
            '$$$',
            ['Indian', 'American'],
            4,
            { dineIn: true, takeOut: true, delivery: true }
        );
        console.log(Mywrongrestaurant);
    } catch (e) {
        console.log(e);
    }
    //12)
    try {
        const deleterest = await restaurants.remove(Mysecondrestaurant._id);
        console.log(deleterest);
    } catch (e) {
        console.log(e);
    }
    //13)
    try {
        const updated = await restaurants.rename(
            Mysecondrestaurant._id,
            'http://www.CurryOnHoboken.com'
        );
        console.log(updated); //8)
    } catch (e) {
        console.log(e);
    }
    //14)
    try {
        const updated = await restaurants.rename(
            Mythirdrestaurant._id,
            'http://ww.ThechipotleHoboken.com'
        );
        console.log(updated);
    } catch (e) {
        console.log(e);
    }
    //15)
    try {
        const getbyid = await restaurants.get(Mysecondrestaurant._id);
        console.log(getbyid);
    } catch (e) {
        console.log(e);
    }

    const db = await connection();
    await db.serverConfig.close();
};
main().catch((error) => {
    console.log(error);
});
//'615b667233d16b2971d1e530'
