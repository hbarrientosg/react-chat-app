import path from "path";
import express from "express";
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpack from "webpack";
import config from "../webpack.config";
import api from "./router/rest";
import createListeners from "./router/socket";
import bodyParser from "body-parser";
import socketIO from "socket.io";

const isDev = process.env.NODE_ENV !== "production";
const port = 8555;
const app = express();
app.use(bodyParser.json());
app.use("/api", api);

if (isDev) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: "src",
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get("/", function response(req, res) {
    console.log(req, res);
    res.write(
      middleware.fileSystem.readFileSync(path.join(__dirname, "/index.html"))
    );
    res.end();
  });
} else {
  app.use(express.static(path.join(__dirname, "../static")));
  app.get("*", function response(req, res) {
    res.sendFile(path.join(__dirname, "../static/index.html"));
  });
}

const server = app.listen(port, err => {
  if (err) {
    console.warn(err);
  }
  console.info(
    `==> 🌎 Listening on port ${port}. Open up http://0.0.0.0:${port}/ in your browser.`
  );
});

const io = socketIO(server, {
  pingInterval: 10000,
  pingTimeout: 5000,
});
io.on('connection', createListeners);
