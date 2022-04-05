const Product = require('../modles/productModel')
const ErrorHandler = require('../utility/errorHandler')
const theCatchHandler = require('../middelware/catchError')
const ApiFeatures = require('../utility/apiFeatures')
const search = require('../utility/apiFeatures')



// create Product
exports.createProduct =theCatchHandler (async(req,res,nxt)=>{
    const product = await Product.create(req.body)

    res.status(201).json({
        success:true,
        product
    })

})
exports.getOneProduct =theCatchHandler (async(req,res,nxt)=>{
    const product = await Product.findById(req.params.id)
    if(!product){
        return nxt (new ErrorHandler("product not found",404))
        
    }
    res.status(200).json({
        success:true,
        product
    })

}
)
exports.updateProduct =theCatchHandler (async(req,res,nxt)=>{
    let product = await Product.findById(req.params.id)
    

    if(!product){
        return nxt (new ErrorHandler("product not found",404))
        
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({success:true,massage:"this is  your Updated Product",product})
})

exports.deleteProduct =theCatchHandler (async(req,res,nxt)=>{
    let product = await Product.findById(req.params.id)

    if(!product){
        
        return nxt (new ErrorHandler("product not found",404))
    }
    product.remove()
    res.status(200).json({success:true,massage:"Product Deleted",product})
})


const resultPage = 5

exports.getAllProduct =theCatchHandler (async(req,res)=>{
    const productCount = Product.countDocuments()

    const apiFeatures=new ApiFeatures(  Product.find(),req.query).searchFeature().filterFeature().pagenation(resultPage)
    

    const product = await apiFeatures.query;
    
    if(!product){
        return nxt (new ErrorHandler("product not found",404))
    }
    res.status(200).json({success:true,massage:"this is your Product",product})
})

