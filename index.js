//  lib
const express = require("express");
const cors = require("cors");
const app = express();
const multer = require('multer')
const path = require('path')
// secret
const SECRET = require("./config");
//db
const mongoose = require("mongoose");
////middleWare for files
const upload = multer({ dest: path.join(__dirname, '.') })
const filesControler = require("./controlers/filesControler")
//routers
const logInRouter = require("./routers/authRouters/logInRouter")
const signUpRouter = require("./routers/authRouters/signUpRouter")
const adminRouter = require("./routers/adminRouter/adminRouter")

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin:'https://hydra-machtech.herokuapp.com', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
  maxHttpBufferSize: 1e8
}));
// jsons max size
app.use(express.json({limit: "100mb",extended:true}));
//ping
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Headers, *, Access-Control-Allow-Origin', 'Origin, X-Requested-with, Content_Type,Accept,Authorization',"https://chatpx.herokuapp.com","http://localhost:3000");
  if(req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
      return res.status(200).json({});
  }
  next();
});

////////////////////////////////ROUTERING/////////////////////////////////////////
app.use("/auth",logInRouter)
app.use("/create",signUpRouter)
app.post('/hydra/filefromuser', upload.any(), filesControler.uploadFile)
app.get('/hydra/files/:id/:name', filesControler.getFile)
///ADMIN
app.use('/admin',adminRouter)
////////////////////////////////////////////////////////////////////////////////

async function startAPP() {
  try {
    mongoose.set('strictQuery', true);
    mongoose
      .connect(SECRET.SECRET.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => console.log("DB is conected... "))
      .catch(() => console.log("DB is not conected see your Node"));

    app.listen(PORT, () => {
      console.log(`HttpServer is started on ${PORT} port... `);
    });
  } catch (e) {
    console.log(e);
  }
}

startAPP();
