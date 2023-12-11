import { connect } from 'mongoose'

connect('mongodb://127.0.0.1:27017/ecommere').then(() => {
    console.log('Connected')
}).catch((err) => {
    console.log(err)
})