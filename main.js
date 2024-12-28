<<<<<<< HEAD
const express = require("express")
const path = require('path');
const SwaggerConfig = require("./src/config/swagger.config")
const cookieParser = require("cookie-parser")
const mainRouter = require("./src/app.routes")
const { NotFoundHandler } = require("./src/common/exception/not-found.handler")
const { AllExceptionHandler } = require("./src/common/exception/all-exception.handler")
const dotenv = require("dotenv").config()
const cors = require("cors")
async function main() {
    const port = process.env.PORT 
    const app = express()
    require("./src/config/mongoose.config")
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cookieParser(process.env.COOKIE_SECRET_KEY))
    app.use(cors({
        origin: ['http://localhost:5173',
             "https://panel.kavenegar.com",
             'https://nex-codes.ir',
             'http://nex-codes.ir'
        ],
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'withCredentials'],
        credentials: true // اجازه ارسال کوکی‌ها
    }));
    
    app.use('/upload', express.static('public/upload'));
    app.use(express.static(path.join(__dirname, 'assets')));

    SwaggerConfig(app) 
    app.use(mainRouter)

    // هندل مسیرهای React
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'assets', 'index-suuedG3f.js'));
    });
    AllExceptionHandler(app)
    NotFoundHandler(app)
    app.listen(port, ()=>{
        console.log(`https://nex-codes.ir:${port}`);
        
    })

    
}
=======
const express = require("express")
const SwaggerConfig = require("./src/config/swagger.config")
const cookieParser = require("cookie-parser")
const mainRouter = require("./src/app.routes")
const { NotFoundHandler } = require("./src/common/exception/not-found.handler")
const { AllExceptionHandler } = require("./src/common/exception/all-exception.handler")
const dotenv = require("dotenv").config()
const cors = require("cors")
async function main() {
    const port = process.env.PORT
    const app = express()
    require("./src/config/mongoose.config")
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cookieParser(process.env.COOKIE_SECRET_KEY))
    app.use(cors({
        origin: ['http://localhost:5173', "https://panel.kavenegar.com"],
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'withCredentials'],
        credentials: true // اجازه ارسال کوکی‌ها
    }));
   /*  app.options('*', cors({
        origin: ['http://localhost:5173', 'https://panel.kavenegar.com'],
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'withCredentials'],
        credentials: true
    })); */
    
    app.use('/upload', express.static('public/upload'));

    SwaggerConfig(app) 
    app.use(mainRouter)
    AllExceptionHandler(app)
    NotFoundHandler(app)
    app.listen(port, ()=>{
        console.log(`http://localhost:${port}`);
        
    })

    
}
>>>>>>> 6e66e7e62361d68b85a92a198b6383443d420000
main()