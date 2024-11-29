import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config()

const MONGO_URI = process.env.MONGO_URL as string;

mongoose.connect(MONGO_URI);

const userSchema = new mongoose.Schema ({
    username : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

const tagSchema = new mongoose.Schema ({
    title: {
        type: String,
        require: true,
        unique: true
    }
})

const contentTypes = ['image', 'video', 'article', 'audio'];

const contentSchema = new mongoose.Schema({
    link: {
        type: String,
        require: true
    },
    type: {
        type: String,
        enum: contentTypes,
        require: true 
    },
    title: {
        type: String,
        require: true
    },
    tags: [{
        type : mongoose.Types.ObjectId, 
        ref: 'Tag',
        require: true
    }],
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    }
})

const linkSchema = new mongoose.Schema({
    hash: {
        type: String
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    }
})

export const Users = mongoose.model('Users', userSchema);
export const Contents = mongoose.model('Contents', contentSchema);
export const Tags = mongoose.model('Tags', tagSchema);
export const Links = mongoose.model('Links', linkSchema);