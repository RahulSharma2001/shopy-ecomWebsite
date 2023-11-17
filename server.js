const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const { serializeUser } = require('passport/lib');
const { count } = require('console');



const app = express();

var login = 'Login/Signup';
var sess;
var totalProduct;
const imageStorage = multer.diskStorage({
    // Destination to store image
    destination: 'images',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now()
            + path.extname(file.originalname))
        // file.fieldname is name of the field (image)
        // path.extname get the uploaded file extension
    }
});

const upload = multer({ storage: imageStorage });

/*-----------------------------------------DATABASE---------------------------------------------------------------------------*/


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb+srv://rahul:rahul123@cluster0.hxqdf.mongodb.net/shopify?retryWrites=true&w=majority");
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: Number

});
const womenSchema = new mongoose.Schema({
    productNumber: String,
    file: {
        date: Date,
        contentType: String,
        img: Buffer
    },
    title: String,
    price: String,
    moreinfo: String

})

const productSchema = new mongoose.Schema({
    /* file:
     {
         data: Buffer,
         contentType: String
     },*/

    productNumber: String,
    file: {
        date: Date,
        contentType: String,
        img: Buffer
    },
    title: String,
    price: String,
    moreinfo: String


});

const user = mongoose.model('user', userSchema);
const product = mongoose.model('product', productSchema);
const women = mongoose.model('women', womenSchema);


/*-----------------------------------------DATABASE ENDS---------------------------------------------------------------------------*/
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"))
app.use(express.json());
app.use(session({ secret: 'rahul', saveUninitialized: true, resave: true }));
app.get('/', function (req, res) {

    res.render('userlogin', { username: login });

})

app.get('/signup', function (req, res) {

    res.sendFile(__dirname + "/public" + "/signup.html");

})
app.get('/signin', function (req, res) {

    res.sendFile(__dirname + "/public" + "/signin.html");



})

app.get("/admin", (req, res) => {

    sess = req.session;

    if (sess.admin == "rahul") {
        return res.redirect("/adminDashboard");

    }
    res.sendFile(__dirname + "/public/admin.html");
})


app.get("/allproducts", (req, res) => {

    product.find((err, docs) => {
        if (!err) {

            res.render("allproducts", {
                data: docs
            });
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    });


})

app.get("/add-product", (req, res) => {

    product.countDocuments({}, function (err, c) {
        res.render("add-product", { total: c + 1 })
    });



})



app.post('/signup', async (req, res) => {


    user.exists({ email: req.body.email }, async (err, respond) => {

        if (respond == null) {
            try {

                if (req.body.password == req.body.repeatPassword) {

                    const hashPassword = await bcrypt.hash(req.body.password, 10);


                    const newUser = new user({

                        name: req.body.name,
                        email: req.body.email,
                        password: hashPassword,
                        mobile: req.body.number

                    });
                    newUser.save((err) => {

                        if (err) {
                            console.log(err);

                        } else {

                            res.redirect("/signin");
                        }

                    });






                }


            } catch (e) {

                console.log(e);
                res.redirect('/signup');
            }



        } else {
            console.log("User already Exits");

        }


    })

})

app.post('/signin', (req, resp) => {

    var useremail = req.body.email
    var password1 = req.body.password


    user.exists({ 'email': useremail }, (err, res) => {

        if (res != null) {
            user.findById(res, async (errr, respond) => {

                const hash = respond.password;
                try {
                    var pa = await bcrypt.compare(password1, hash);

                    if (pa) {
                        var login = respond.name;
                        resp.render("userlogin", { username: login, flag: true });

                    }
                }
                catch (E) {
                    console.log(E);
                }

            })

        } else {

            console.log("User not found");
        }


    })



})



app.post("/adminsignedin", (req, res) => {


    sess = req.session;
    let admin = "rahul"
    let password = 123456
    if (req.body.username == admin && req.body.password == password) {

        sess.admin = admin;

        product.find((err, docs) => {
            if (!err) {
                res.render("adminDashboard", {
                    data: docs
                });
            } else {
                console.log('Failed to retrieve the Course List: ' + err);
            }
        });


    }



})





app.get("/adminDashboard", (req, res) => {

    sess = req.session;

    if (sess.admin == "rahul") {

        product.find((err, docs) => {
            if (!err) {
                res.render("adminDashboard", {
                    data: docs
                });
            } else {
                console.log('Failed to retrieve the Course List: ' + err);
            }
        });



    } else {

        return res.redirect("/admin");
    }

})

app.post("/logout", (req, res) => {

    sess = req.session;

    sess.destroy();
    res.redirect("/admin");


})

app.post("/addproduct", upload.single('img'), (req, res) => {


    let title = req.body.title;
    let price = req.body.price;
    let moreinfo = req.body.moreinfo;
    let serial = req.body.itemNo;


    var newImg = fs.readFileSync(req.file.path);
    var encImg = newImg.toString('base64');
    var newItem = {
        date: Date(),
        contentType: req.file.mimetype,
        img: Buffer(encImg)
    };

    const newProduct = new product({
        productNumber: serial,
        file: newItem,
        title: title,
        price: price,
        moreinfo: moreinfo

    });
    newProduct.save((err) => {

        if (err) {
            console.log(err);

        } else {


            res.redirect("/adminDashboard");
        }

    });


})



app.get("/BuyPage", (req, res) => {

    res.sendFile(__dirname + "/public/BuyPage.html")


})
app.get("/women", (req, res) => {


    women.find((err, docs) => {
        if (!err) {

            res.render("women", {
                data: docs
            });
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    });



})

app.post("/payment", (req, res) => {


    res.sendFile(__dirname + "/public/payment.html");

})






app.post("/delete", (req, res) => {

    var productNo = req.body.pNo;


    product.deleteOne({ productNumber: productNo }).then(function () {
        res.redirect("/adminDashboard");
    }).catch(function (error) {
        console.log(error);
    });




})



app.post("/search", (req, res) => {
    var name = req.body.search;
    product.find({ title: name }, (err, result) => {
        if (!err) {
            res.render("search", {
                data: result
            });
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }


    })

})
app.post("/adminSearch", (req, res) => {
    var name = req.body.search;
    product.find({ title: name }, (err, result) => {
        if (!err) {
            res.render("adminSearch", {
                data: result
            });
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }


    })

})



app.get('/404', function (req, res) {

    res.sendFile(__dirname + "/public" + "/404.html");

})

app.use(function (req, res) {

    res.redirect('/404');

})

app.listen(3000, function () {
    console.log("server on 3000");

})
