const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const articleSchema = new mongoose.Schema({

    userId:{
        type:ObjectId,
        required:true,
        ref:"User",
        trim:true
    },

    title: {
        type: String,
        required: true,
        trim: true,
      },
  
      description: {
        type: String,
        required:true,
        trim: true,
      },

      isDeleted: {
        type: Boolean,
        default: false,
      },
},
    { timestamps: true }

      
  
)

module.exports = mongoose.model("Article", articleSchema);