import mongoose from 'mongoose';

const mongodb_uri = process.env.Database_URL;

if (!mongodb_uri) {
  throw new Error('Please define the Database_URL environment variable inside .env.local');
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };  
        cached.promise = mongoose.connect(mongodb_uri, opts).then((mongoose) => {
            return mongoose;
        });
    } 
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;  