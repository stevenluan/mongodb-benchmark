var d = db.getSisterDB("bucket_test");

var total = 10000;
var f = function(usecase , col, bucketSize) {
    col.drop();
    col.ensureIndex({'activities.type':1});
    var count = total/bucketSize;
    var start = Date.now();
    for (var i=0; i < count; i++) {
        // Document created with only the _id field
        col.insert({_id:i});
        for(var j=0;j<bucketSize;j++){
            col.update({_id:i}, {$push : {"activities": {type:'post',objectid:'515bc88a8ce3b4718e6a1099',time:new Date}}}, true);
        }


    }
    var t = (Date.now() - start)/1000;
    print(usecase +" size runtime: " + t);
    print("storageSize with " + usecase +" size  : " + col.stats().storageSize);
    print("paddingFactor with " + usecase+"  size: " + col.stats().paddingFactor);

    return t;
}

var insrt = function(usecase , col, count){
    col.drop();
    col.ensureIndex({'activity.type':1});
    var start = Date.now();
    for (var i=0; i < count; i++) {
        // Document created with only the _id field
        col.insert({_id:i,activity:{type:'post',objectid:'515bc88a8ce3b4718e6a1099',time:new Date}});


    }
    var t = (Date.now() - start)/1000;
    print(usecase +" size runtime: " + t);
    print("storageSize with " + usecase +" size  : " + col.stats().storageSize);
    print("paddingFactor with " + usecase+"  size: " + col.stats().paddingFactor);

    return t;
}
f('big bucket',d.big,500);
f('small bucket',d.small,5);
insrt('no bucket', d.no_bucket, total);

var bigDoc = d.big.findOne();
print('1 big doc size '+(Object.bsonsize(bigDoc)/1000));

var smallDoc = d.small.findOne();
print('100 small doc size '+(Object.bsonsize(smallDoc)*100/1000));


var rawDoc = d.no_bucket.findOne();
print('500 raw doc size '+(Object.bsonsize(rawDoc) * 500 / 1000));
