
var d = db.getSisterDB("local");
var SAMPLE_RATE = 10000;
var q = function(){

    var i = 0;
    var start = new Date();
    while(true){
       var date = new Date();
       var cursor = d.ds.find({name:/^a/}).limit(10);
       while(cursor.hasNext()){
           var doc = cursor.next();
       }
       i++;
       if(i>0 && i%SAMPLE_RATE==0){
          var now = new Date();
          print(SAMPLE_RATE + ' queries spent in '+(now-start) +'ms');
          start = new Date();
       }
    }
}
q();
