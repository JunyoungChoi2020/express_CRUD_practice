const express = require("express")
const app = express()
const port = 5000
// const cookieParser = require('cookie-parser')

const connect = require('./schemas')
connect();

app.use(express.urlencoded({extended : true}));
app.use(express.json());
// app.use(cookieParser());

// const indexRouter = require('./routes')
const postRouter = require('./routes/posts')
const commentRouter = require('./routes/comments')

// app.use('/index', indexRouter)
app.use('/posts', postRouter)
app.use('/comments', commentRouter)

app.listen(port, () => console.log(`app listening on port ${port}!`))
