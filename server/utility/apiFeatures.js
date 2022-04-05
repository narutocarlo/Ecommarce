class ApiFeatures{
    constructor(query,queryStr){
        this.query = query
        this.queryStr = queryStr
    }
    searchFeature(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex : this.queryStr.keyword,
                $options:"i"
            }
        }:{ };
        
        this.query = this.query.find({...keyword})
        return this;
    }

    filterFeature(){
        const queryCopy = {...this.queryStr}
        // console.log(queryCopy);
        const removFeild = ['keyword','page','limit']
        removFeild.forEach(key=> delete queryCopy[key])
        // console.log(queryCopy);
        
        this.query = this.query.find(queryCopy)

        
        // // price filter
        // console.log(queryCopy);
        // let queryStr = JSON.stringify(queryCopy)
        // console.log(queryStr); 
        // // queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=>`$${key}`)
        // console.log(JSON.parse(queryStr));

        this.query= this.query.find(queryCopy)
        

        return this

    }

    pagenation(resultPage){
        const currentPage = Number(this.queryStr) || 1
        const skip = resultPage *(currentPage - 1 )

        this.query = this.query.limit(resultPage).skip(skip)
        
        return this
    }
}

module.exports = ApiFeatures