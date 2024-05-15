"use server"

import { revalidatePath } from 'next/cache';
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

export async function createThread({ text, author, communityId, path }: Params) {
    try {
        connectToDB();

        const createdThread = await Thread.create({
            text,
            author,
            community: null,
        });

        // Update user model
        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id }
        });

        revalidatePath(path);
    } catch (error:any) {
        throw new Error(`Error creating thread: ${error.message}`)
    }
};

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
    connectToDB();

    // Calculate the number of posts to skip
    const skipAmount = (pageNumber - 1) * pageSize;

    // Fetch the threads that have no parents (top-level threads...)
    const threadsQuery = Thread.find({ parendId: { $in: [null, undefined] }})
        .sort({createdAt: 'desc'})
        .skip(skipAmount)
        .limit(pageSize)
        .populate({ path: 'author', model: User, options: {strictPopulate: false} })
        .populate({ 
            path: 'chlidren',
            populate: {
                path: 'author',
                model: User,
                select: "_id name parentId image"
            },
            options: {strictPopulate: false}
        })

    const totalThreadsCount = await Thread.countDocuments({ parendId: { $in: [null, undefined] }});

    const threads = await threadsQuery.exec();

    const isNext = totalThreadsCount > skipAmount + threads.length;

    return { threads, isNext };
}

export async function fetchThreadById(id: string) {
    connectToDB();

    try {
        // TODO: Populate Community
        
        const thread = await Thread.findById(id)
        .populate({
            path: 'author',
            model: User,
            select: "_id id name image"
        })
    } catch (error: any) {

    }
}