class ApiFeatures {
    constructor(query,queryStr){
        this.query = query
        this.queryStr = queryStr
    }
    //this.query => Poduct query object
    search(){
        const keyword = this.queryStr.keyword ? {
            name : {
                $regex : this.queryStr.keyword,
                $options : "i"
            }
        } : {}
        this.query = this.query.find(keyword)
        return this
    }
    filter(){
        const queryCopy = {...this.queryStr}
        // remove some fields for category
        const removeFields = ["keyword","page","limit"]
        removeFields.forEach( val => delete queryCopy[val])
        //filter for price and rating
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)
        this.query = this.query.find(JSON.parse(queryStr))
        return this

    }

    pagination(resultperPage){
        if(this.queryStr.page === undefined)
            return this
        let currentPage = Number(this.queryStr.page) || 1
        //current page -> [1-5], [6-11] etc
        let skip = resultperPage*(currentPage - 1 )
        this.query = this.query.limit(resultperPage).skip(skip)
        return this

    }
}

module.exports = ApiFeatures