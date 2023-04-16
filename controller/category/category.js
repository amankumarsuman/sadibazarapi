import Category from "../../model/category.js";





//Post Method
export const addCategory = async (req, res) => {


  const data = new Category({
    name: req.body.name,
    image: req.body.image,
    
  });

  try {
    const dataToSave = await data.save().then((result) => {
      res.status(200).send({ success: true, data: result });
    });

    // sendMail(dataToSave.email);
  } catch (error) {
    // console.log(error);
    if (error.message.match("email_1 dup key")) {
      res.status(400).send({
        success: false,
        message: "Already have an category from this email",
      });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

export const getCategory=async(req,res)=>{
    Category.find()
    .select("name image _id")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        categoryList: docs.map((doc) => {

        
          return {

          
            name: doc.name,
            image: doc.image,
            _id: doc._id,
          
          };
        }),
      };
     
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
}



