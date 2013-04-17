var d = db.getSisterDB("concur_test");
var SAMPLE_RATE = 10000;
var q = function(){
    var col = d.col;

    var i = 0;
    var start = new Date();
    while(true){
       var doc = d.col.findOne({_id:100},{_id:1});
       i++;
       if(i>0 && i%SAMPLE_RATE==0){
          var now = new Date();
          print(SAMPLE_RATE + ' queries spent in '+(now-start) +'ms');
          start = new Date();
       }
    }
}
q();
