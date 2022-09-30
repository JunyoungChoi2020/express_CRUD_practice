const express = require("express");
const Comment = require('../schemas/comment');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
// const Post = require('../schemas/post')
const router = express.Router();

router.post('/:_postId', async (req, res)=> {
    try{
        const body = req.body;
        if(!body.content.length){
            res.send("댓글 내용을 입력해주세요.")
        }

        const users_comment = new Comment({
            postId: ObjectId(req.params._postId.slice(1)),
            user: body.user,
            password: body.password,
            content: body.content
        })

        await users_comment.save();
        res.json({message: "게시글을 생성하였습니다."})
    } catch(err){
        res.status(400).send(err)
    }
})

router.get('/:_postid', async (req, res) => {
    try{
        const postId = ObjectId(req.params._postid.slice(1));
        const allPosts = await Comment.find({"postId": postId})
        const doc = allPosts.map((v) => {
            return {
                commentId: v._id,
                user: v.user,
                content: v.content,
                createdAt: v.createdAt
            }
        })
        res.json({data: doc})
    }catch(e){
        res.status(400).send(e)
    }
})

router.put('/:_commentid', async (req, res) => {
    try{
        const commentId = ObjectId(req.params._commentid.slice(1));
        const newData = req.body;
        if(!newData.content.length){
            res.send("댓글 내용을 입력해주세요.")
        }
        const [ oldData ] = await Comment.find({"_id": commentId})
        if(oldData.password === newData.password.toString()){
            await Comment.updateOne({"_id" : commentId}, {$set: {"content": newData.content}})
            res.status(201).send({"message" : "댓글을 수정하였습니다."})
        } else {
            res.send("비밀번호가 틀렸습니다.")
        }
    } catch(e){
        res.status(400).send(e)
    }
})

router.delete('/:_commentid', async (req, res) => {
    try{
        const commentId = ObjectId(req.params._commentid.slice(1));
        const { password } = req.body;
        const [ oldData ] = await Comment.find({"_id": commentId})
        if(password.toString() === oldData.password){
            await Comment.deleteOne({"_id" : commentId})
            res.status(200).json({"message": "댓글이 삭제되었습니다."})
        }else{
            res.send("비밀번호가 틀렸습니다.")
        }
    } catch(e){
        res.status(400).send(e)
    }
})

module.exports = router