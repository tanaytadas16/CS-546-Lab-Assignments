const express = require('express');
const router = express.Router();
const userdata = require('../data/users');

router.get('/', async (req, res) => {
    if (req.session.user) {
        return res.redirect('/private');
    } else {
        res.render('login/loginform', { title: 'Login' });
        return;
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        let checkspace = /(\s)/g;
        let checkvaliduser = /[A-Za-z0-9]{4,}/g;
        let checkvalidpass = /[A-Za-z0-9\W]{6,}/g;

        if (!username.trim() || !password.trim()) {
            res.status(400).render('login/loginform', {
                hasErrors: true,
                error: 'You did not provide username and/or password.',
                title: 'Login',
            });
            return;
        }
        if (typeof username !== 'string' || typeof password !== 'string') {
            res.status(400).render('login/loginform', {
                hasErrors: true,
                error: 'Type of inputs should be string',
                title: 'Login',
            });
            return;
        }
        if (!username.match(checkvaliduser)) {
            res.status(400).render('login/loginform', {
                hasErrors: true,
                error: 'You did not provide a valid username and/or password',
                title: 'Login',
            });
            return;
        }
        if (!password.match(checkvalidpass)) {
            res.status(400).render('login/loginform', {
                hasErrors: true,
                error: 'You did not provide a valid username and/or password',
                title: 'Login',
            });
            return;
        }
        if (username.match(checkspace) || password.match(checkspace)) {
            // res.render('login/loginform', {});
            res.status(400).render('login/loginform', {
                hasErrors: true,
                error: 'You cannot provide Spaces in username or password',
                title: 'Login',
            });
            return;
        }

         const checkuser = await userdata.checkUser(username, password);

        if ((checkuser.authenticated = true)) {
            req.session.user = { Username: username };
            res.redirect('/private');
            return;
        } else {
            res.status(400).render('login/loginform', {
                hasErrors: true,
                error: 'You did not provide a valid username and/or password.',
                title: 'Login',
            });
            return;
        }
    } catch (e) {
        if (typeof e == 'object') {
            if (e[1].length > 0) {
                res.status(400).render('login/loginform', {
                    hasErrors: true,
                    error: e[1],
                    title: 'Login',
                });
                return;
            }
        } else {
            res.status(500).render('login/loginform', {
                hasErrors: true,
                error: 'Internal Server Error',
                title: 'Login',
            });
            return;
        }
    }
});

router.get('/signup', async (req, res) => {
    if (req.session.user) {
        return res.redirect('/private');
    } else {
        res.render('login/signup', { title: 'Signup', hasErrors: false });
        return;
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        let checkspace = /(\s)/g;
        let checkvaliduser = /[A-Za-z0-9]{4,}/g;
        let checkvalidpass = /[A-Za-z0-9\W]{6,}/g;

        if (!username.trim() || !password.trim()) {
            res.status(400).render('login/signup', {
                hasErrors: true,
                error: 'You did not provide username and/or password.',
                title: 'Login',
            });
            return;
        }
        if (typeof username !== 'string' || typeof password !== 'string') {
            res.status(400).render('login/signup', {
                hasErrors: true,
                error: 'Type of inputs should be string',
                title: 'Login',
            });
            return;
        }
        if (!username.match(checkvaliduser)) {
            res.status(400).render('login/signup', {
                hasErrors: true,
                error: 'You did not provide a valid username and/or password',
                title: 'Login',
            });
            return;
        }
        if (!password.match(checkvalidpass)) {
            res.status(400).render('login/signup', {
                hasErrors: true,
                error: 'You did not provide a valid username and/or password',
                title: 'Login',
            });
            return;
        }
        if (username.match(checkspace) || password.match(checkspace)) {
            // res.render('login/signup', {});
            res.status(400).render('login/signup', {
                hasErrors: true,
                error: 'You cannot provide Spaces in username or password',
                title: 'Login',
            });
            return;
        }
        const storeuser = await userdata.createUser(username, password);
        if (storeuser.userInserted === true) {
            return res.redirect('/');
        } else {
            res.status(400).render('login/signup', {
                hasErrors: true,
                error: 'User already exist with username',
                title: 'Signup',
            });
            return;
        }
    } catch (e) {
        if (typeof e == 'object') {
            if (e[1]) {
                res.status(400).render('login/signup', {
                    hasErrors: true,
                    error: e[1],
                    title: 'Login',
                });
                return;
            } else {
                res.status(500).render('login/signup', {
                    hasErrors: true,
                    error: 'Internal Server Error',
                    title: 'signup',
                });
                return;
            }
        }
    }
});

//
router.get('/private', async (req, res) => {
    const username = req.session.user.Username;
    let usernameLower = username.toLowerCase();
    res.render('login/private', { title: 'private', username: usernameLower });
});
//
router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.render('login/logout', { title: 'logout' });
});
module.exports = router;
