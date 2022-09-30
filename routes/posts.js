const express = require("express")
const Post = require('../schemas/post')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router()

router.post('/', async (req, res)=> {
    const users_post = new Post(req.body)
    try{
        await users_post.save();
        res.status(201).send({message: "게시글을 생성하였습니다."})
    } catch(err){
        res.status(400).send(err)
    }
})

router.get('/', async (req, res) => {
    const allPosts = await Post.find({})
    const doc = allPosts.map((v) => {
        return {
            postid: v._id,
            user: v.user,
            title: v.title,
            createdAt: v.createdAt
        }
    })
    try{
        res.json({data: doc})
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/:_postid', async (req, res) => {
    const postId = ObjectId(req.params._postid.slice(1));
    try{
        const [ targetPost ] = await Post.find({"_id": postId})
        const doc = {
            postid: targetPost._id,
            user: targetPost.user,
            title: targetPost.title,
            content: targetPost.content,
            createdAt: targetPost.createdAt
        }
        res.status(201).json(doc)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.put('/:_postid', async (req, res) => {
    const postId = ObjectId(req.params._postid.slice(1));
    const newData = req.body;
    const [ oldData ] = await Post.find({"_id": postId})
    try{
        if(oldData.password === newData.password.toString()){
            await Post.updateOne({"_id" : postId}, {$set: {"title": newData.title, "content": newData.content}})
            res.status(201).send({"message" : "게시글을 수정하였습니다."})
        } else {
            res.send("비밀번호가 틀렸습니다.")
        }
    } catch(e){
        res.status(400).send(e)
    }
})

router.delete('/:_postid', async (req, res) => {
    const postId = ObjectId(req.params._postid.slice(1));
    const { password } = req.body;
    console.log(password.toString)
    const [ oldData ] = await Post.find({"_id": postId})
    console.log(oldData)
    try{
        if(password.toString() === oldData.password){
            await Post.deleteOne({"_id" : postId})
            res.status(200).json({"message": "게시글이 삭제되었습니다."})
        }else{
            res.send("비밀번호가 틀렸습니다.")
        }
    } catch(e){
        res.status(400).send(e)
    }
})

module.exports = router