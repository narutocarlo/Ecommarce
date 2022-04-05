module.exports= (theCatch)=>(req,res,nxt)=>{
    Promise.resolve(theCatch(req,res,nxt)).catch(nxt)
}
module.exports