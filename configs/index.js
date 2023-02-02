import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import * as dotenv from 'dotenv'
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();


const PORT = process.env.PORT || 3000;
const dbSecretFields = ["__v","password"];
const DATABASE_CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING;
const SESSION_SECRET = process.env.SESSION_SECRET || 'secret';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export default {PORT, dbSecretFields, DATABASE_CONNECTION_STRING, SESSION_SECRET, IS_PRODUCTION}