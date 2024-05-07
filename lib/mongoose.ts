import mongoose from 'mongoose';

let isConnected = false; // variable to check if mongoose is connected

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    
}