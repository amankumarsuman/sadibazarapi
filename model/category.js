import mongoose from "mongoose";
const {Schema} = mongoose;

const categorySchema = new Schema({
    
    name: String,
    
    image:
    {
        type: String,
        default: 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/lqcm8z8qwhi42efm2lue'
    },
  
});

const CategoryList = mongoose.model('CategoryList',categorySchema);
export default CategoryList;
