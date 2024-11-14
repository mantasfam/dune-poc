import express from 'express';
import router from './app';

const testApp = express();
testApp.use(router);

export default testApp;
