import Blog from '../models/blogModel'
import asyncHandler from 'express-async-handler'
import { validateMongoDbId } from '../utils/validateMongoDbId'
import { cloudinaryUploadImg } from '../utils/cloudinary'
import fs from 'fs'


// Blog creation
export const createBlog = asyncHandler(async (req, res) => {

    try {
        const newBlog = await Blog.create(req.body)
        res.status(200).json(newBlog)
    } catch (err) {
        throw new Error(err)
    }
})

// Blog update by id only admin can delete
export const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        let updateBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updateBlog)
    } catch (err) {
        throw new Error(err)
    }
})

// Get BLog by id and update view by one
export const getBlog = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        let getBlog = await Blog.findById(id).populate('disLikes')
        const updateViews = await Blog.findByIdAndUpdate(
            id,
            {
                $inc: { numViews: 1 }
            },
            {
                new: true
            }
        )
        res.status(200).json(getBlog)
    } catch (err) {
        throw new Error(err)
    }
})

// Get all blog from database
export const getAllBlogs = asyncHandler(async (req, res) => {
    try {
        let blogs = await Blog.find()

        res.status(200).json(blogs)
    } catch (err) {
        throw new Error(err)
    }
})

// Delete Blog by ID
export const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        let deletedBlog = await Blog.findByIdAndDelete(id)
        res.status(200).json(deletedBlog)
    } catch (err) {
        throw new Error(err)
    }
})

// blog likes
export const likeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoDbId(blogId);
    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    // find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isLiked = blog?.isLiked;
    // find if the user has disliked the blog
    const alreadyDisliked = blog?.disLikes?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyDisliked) {
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull: { disLikes: loginUserId },
                isDisLiked: false,
            },
            { new: true }
        );
        res.json(blog);
    }
    if (isLiked) {
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull: { likes: loginUserId },
                isLiked: false,
            },
            { new: true }
        );
        res.json(blog);
    } else {
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $push: { likes: loginUserId },
                isLiked: true,
            },
            { new: true }
        );
        res.json(blog);
    }
});

// blog Dislikes
export const disLikeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoDbId(blogId);
    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    // find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isDisLiked = blog?.isDisLiked;
    // find if the user has disliked the blog
    const alreadyLiked = blog?.likes?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyLiked) {
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull: { likes: loginUserId },
                isLiked: false,
            },
            { new: true }
        );
        res.json(blog);
    }

    if (isDisLiked) {
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull: { disLikes: loginUserId },
                isDisLiked: false,
            },
            { new: true }
        );
        res.json(blog);
    } else {
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $push: { disLikes: loginUserId },
                isDisLiked: true,
            },
            { new: true }
        );
        res.json(blog);
    }
});


// Blog Images Upload 
export const uploadBlogImages = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images")
        const urls = []
        const files = req.files

        for (const file of files) {
            const { path } = file
            const newPath = await uploader(path)
            urls.push(newPath)
            fs.unlinkSync(path)
        }
        const findBlog = await Blog.findByIdAndUpdate(id, { images: urls.map(file => { return file }) }, { new: true })
        res.json(findBlog)
    } catch (err) {
        throw new Error(err)
    }
})
