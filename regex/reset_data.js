load("../lib/word-generator.js");
var d = db.getSisterDB("local");
d.ds.drop();
d.ds.ensureIndex({name:1});
var wg = new WordsGenerator(64, 'abcdefghigklmnopqrstuvwxyz12345678?. ');
for(var i=0;i<3000000;i++){
    d.ds.insert({name:wg.generateWord(), url: 'http://www.ebay.com', stats:[]});
}

