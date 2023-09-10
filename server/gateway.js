import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware'; // Import createProxyMiddleware
import httpProxy from 'http-proxy';
import bodyParser from 'body-parser';

const app = express();
const proxy = httpProxy.createProxyServer({});

app.use(bodyParser.json());
process.setMaxListeners(0);

app.use(cors());
// app.use(express.json());

const AuthURL = 'http://localhost:8080';
const ItemsURL = 'http://localhost:8081';
const NewsURL = 'http://localhost:8082';
const PaymentURL = 'http://localhost:8083';

const authProxy = createProxyMiddleware({
  target: AuthURL,
  changeOrigin: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  },
});

const itemsProxy = createProxyMiddleware({
  target: ItemsURL,
  changeOrigin: true,
  pathRewrite: {
    '^/items': '',
  },
});

const newsProxy = createProxyMiddleware({
  target: NewsURL,
  changeOrigin: true,
  pathRewrite: {
    '^/news': '',
  },
});

const paymentProxy = createProxyMiddleware({
  target: PaymentURL,
  changeOrigin: true,
  pathRewrite: {
    '^/payment': '',
  },
});

app.use('/auth', (req, res) => {
  proxy.web(req, res, { target: AuthURL });
});
app.use('/items', itemsProxy);
app.use('/news', newsProxy);
app.use('/payments', paymentProxy);

const start = async () => {
  try {
    app.listen(3333, () => {
      console.log(`app started on port 3333`);
    });
  } catch (e) {
    console.log(e);
  }
};
start();
