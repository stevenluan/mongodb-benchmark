var d = db.getSisterDB("concur_test");
var SAMPLE_RATE = 10000;
var q = function(){
    d.col.drop();
    var i = 0;
    var start = new Date();
    while(true){
        var doc = d.col.insert({_id:i, name:'conc'+i, age: i + 10, address:{state:'ca',county:'santa clara'}});
        i++;
        if(i>0 && i%SAMPLE_RATE==0){
            var now = new Date();
            print(SAMPLE_RATE + ' queries spent in '+(now-start) +'ms');
            start = new Date();
        }
    }
}
q();
