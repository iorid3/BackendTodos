import express from "express";
const app: express.Express = express();
import todoRoutes from "./routes/todoRoutes";


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const cors = require('cors')
app.use(cors({
  origin: "https://front-todos-5bcjx6nlv-iorid3.vercel.app",
}));

app.listen(3000, () => {
  console.log("Start on port 3000.");
});

app.use("/todo", todoRoutes);

app.get("/test", (req: express.Request, res: express.Response) => {
  res.send("OK");
});
