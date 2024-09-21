
const Firm = require('../models/Firm');
const vendor = require('../models/vendor');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Set destination directory for uploads
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      // Set the file name with original extension
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  // Initialize multer with the configured storage
  const upload = multer({ storage: storage });


const addFirm = async(req, res)=>{
    try{
        const {firmName, area, category, region,offer} = req.body;

    // const image = req.file? req.file.filename: undefined;

        const vendors = await vendor.findById(req.vendorId);
        if(!vendors){
            return res.status(404).json({message: "vendor not found"})

        }

        const firms = new Firm({
            firmName, area, category, region, offer, vendor: vendor._id
        })
    
         const savedFirm = await firms.save();

         vendors.firm.push(savedFirm)


         await vendors.save()

        return res.status(200).json({message:"Firm added Successfully"})
     
   

    }catch(error){
       console.log(error)
        return res.status(500).json("Internal server error")
    }
} 
 const deleteFirmById  = async(req, res)=>{
  try {
          const firmId = req.params.firmId;


          const deletedProduct = await Firm.findByIdAndDelete(firmId);

          if(!deletedProduct){
              return res.status(404).json({error: "No product Found"})
          }
  } catch (error) {
    console.error(error);
      res.status(500).json({error: "Internal server error"})
      
  }
}
      
module.exports = {addFirm: [upload.single('image'),addFirm], deleteFirmById}
