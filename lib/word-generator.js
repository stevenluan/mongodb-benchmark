//todo:with order without order

var WordsGenerator = function (width,letters){

    if(width){
        this.width = width;
    }
    else{
        this.width = 10;
    }

    if(letters){

        function _zipLetters(letters){
            // 'ddbc'->['d','b','c'];
            var ret = [];
            var _o={};
            letters.split('').forEach(function(e){
                _o[e]=null;
            });

            for(var ue in _o){
                ret.push(ue);
            }
            return ret;
        }

        this.letters = _zipLetters(letters);
    }
    else{

        function _makeLetters(from,to){
            var c = from;
            var ret = [];
            while(c<=to){
                ret.push(c);
                c = String.fromCharCode(c.charCodeAt(0)+1);
            }
            return ret;
        }
        this.letters = [];
        this.letters=this.letters.concat(_makeLetters('0','9'));
        this.letters=this.letters.concat(_makeLetters('a','z'));
        this.letters=this.letters.concat(_makeLetters('A','Z'));
    }

}

WordsGenerator.prototype.generateWord = function (){

    var word = [];
    var lettersLen = this.letters.length;
    while(word.length<this.width){
        word.push(this.letters[Math.floor(Math.random()*lettersLen)]);
    }
    return word.join('');
}

WordsGenerator.prototype.getMaxCountCanBeGenerate =  function (){
    return Math.pow(this.letters.length,this.width);
}

WordsGenerator.prototype.generateAllWordsToObject = function (eachWordCallback){
    return this.generateWordsToObject(this.getMaxCountCanBeGenerate(),eachWordCallback);
}

WordsGenerator.prototype.generateWordsToObject =  function (count,eachWordCallback){
    // max count on my notebook 8G memory  FATAL ERROR: CALL_AND_RETRY_0 Allocation failed - process out of memory
    var max = this.getMaxCountCanBeGenerate();
    if(max<count){
        throw new Error("I can't generate "+ count +" words! I can only generate "+ max + " words." );
    }

    var rets={};
    var _count=0;
    while(_count<count){

        var word = this.generateWord();
        if(rets[word]){
            continue;
        }
        else{
            rets[word] = true;
            if(eachWordCallback){
                eachWordCallback(word,_count+1);
            }
            _count++;
        }
    }
    return rets;
}

WordsGenerator.prototype.generateAllWordsToFile = function (path,eachWordCallback){
    return this.generateWordsToFile(this.getMaxCountCanBeGenerate(),path,eachWordCallback);
}


WordsGenerator.prototype.generateWordsToFile = function (count,path,eachWordCallback){
    //todo :use memory db for huge count gen

    var out = this.generateWordsToObject(count,eachWordCallback);
    var fs = require('fs');
    var _out=[];
    for (var word in out){
        _out.push(word);
    }

    path = path? path : 'yourWords.txt';
    console.log('write to ',path);
    fs.writeFile(path, _out.join('\n'));
}
