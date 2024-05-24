"use server"

import { FilterQuery, SortOrder } from "mongoose";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from 'next/cache'

interface Params {
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string,
}

export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path,
}: Params): Promise<void> {
    connectToDB();

    try {
        await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            { upsert: true } // Update if data exists, insert if not
        );

        if (path === 'profile/edit') {
            revalidatePath(path);
        };
    } catch (error: any) {
        throw new Error(`Failed to  create/update user: ${error.message}`);
    }
}

export async function fetchUser(userId: string) {
    try {
        connectToDB();

        return await User
            .findOne({ id: userId })
        // .populate({
        //     path: 'communities',
        //     model: Community
        // })
    } catch (error: any) {
        new Error(`Failed to fetch user: ${error.message}`);
    }
}

export async function fetchUserThreads(userId: string) {
    try {
        connectToDB();

        // Find all threads authored by the user with the given userId
        // TODO: Populate community
        const threads = await User.findOne({ id: userId })
            .populate({
                path: "threads",
                model: Thread,
                populate: [
                    {
                        path: "children",
                        model: Thread,
                        populate: {
                            path: "author",
                            model: User,
                            select: "name image id", // Select the "name" and "_id" fields from the "User" model
                        },
                    },
                ],
            });
        return threads;
    } catch (error: any) {
        throw new Error(`Failed to fetch user threads: ${error.message}`);
    }
}

export async function fetchUsers({ 
    userId,
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc"
}: {
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder;
}) {
    try {
        connectToDB();

        const skipAmount = (pageNumber - 1) * pageSize;

        // Case insensitive
        const regex = new RegExp(searchString, "i");

        const query: FilterQuery<typeof User> = {
            // Not equal to userId (Filter out current user)
            id: { $ne: userId }
        }

        // Add query if searchString is non empty
        if (searchString.trim() !== '') {
            query.$or = [
                { username: { $regex: regex } },
                { name: { $regex: regex } }
            ]
        }

        // Sorting
        const sortOptions = { createdAt: sortBy };

        // Find user based on queries
        const usersQuery = User.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize);

        const totalUsersCount = await User.countDocuments(query);

        const users = await usersQuery.exec();

        const isNext = totalUsersCount > skipAmount + users.length;

        return { users, isNext };
    } catch (error: any) {
        throw new Error(`Failed to fetch users: ${error.message}`);
    }
}

export async function getActivity(userId: string) {
    try {
        connectToDB();

        // Find all threads created by the user
        const userThreads = await Thread.find({ author: userId });

        
    } catch (error: any) {
        throw new Error(`Failed to fetch user activity: ${error.message}`)
    }
}