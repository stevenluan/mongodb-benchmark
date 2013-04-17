load("./lib/word-generator.js");
var d = db.getSisterDB("etalk");
var topic_gen = new WordsGenerator(16, 'abcdefghigklmnopqrstuvwxyz12345678?. ');
var post_gen = new WordsGenerator(64, 'abcdefghigklmnopqrstuvwxyz12345678?. ');
var post_desc_gen = new WordsGenerator(256, 'abcdefghigklmnopqrstuvwxyz12345678?. ');
var tag_gen = new WordsGenerator(16, 'abcdefghigklmnopqrstuvwxyz12345678?. ');
var init_seq = 100000;
function getSeq(){
    return (init_seq++).toString(32);
}
d.topic.drop();
d.topic.ensureIndex({vanity_title:1, state:1});
d.topic.ensureIndex({searchable:1,state:1});
d.post.drop();
d.post.ensureIndex({topicId:1, state:1});
d.post.ensureIndex({'discussion.seoTitle':1,state:1});
d.post.ensureIndex({'token':1,state:1});
d.reply.drop();
d.reply.ensureIndex({postId:1,state:1})
var TOPIC_COUNT =  1000;
var MAX_POST_COUNT = 10000;
var MAX_REPLY_COUNT = 5;
function create_topic(){
    for(var i=0;i<TOPIC_COUNT;i++){
        var name = topic_gen.generateWord();
        d.topic.insert({title:name, searchable:name.toLowerCase(),vanity_title:name, cover_img: 'http://www.ebay.com', stats:[], state:1, created: new Date, updated: new Date});
        var topic = d.topic.findOne({vanity_title:name});

        create_post(topic, getRandomInt(5,MAX_POST_COUNT));
    }
}


function create_post(topic,num){
    for(var i=0;i<num;i++){
        var title = post_gen.generateWord();
        var seq = getSeq();
        d.post.insert({ topicId:topic._id,state:1, token:seq, discussion:[{title:title, description:post_desc_gen.generateWord() ,seoTitle:title.toLowerCase(), tags:getTags(),itemTags:[],userId:getRandomInt(10000233,30000111),replyCount:getRandomInt(0,100),helpCount:getRandomInt(0,100), notHelpCount:getRandomInt(0,100)}]});
        var post = d.post.findOne({token:seq});

        create_reply(post,topic, getRandomInt(0,MAX_REPLY_COUNT));
    }

}

function create_reply(post,topic,num){
    for(var i=0;i<num;i++){
        var content = post_desc_gen.generateWord();
        d.reply.insert({ topicId:topic._id,postId:post._id, type:'reply',state:1, reply:[{content:post_desc_gen.generateWord() ,tags:getTags(), userId:getUserId(),voteCount:getRandomInt(0,100),upUser:getVoteUsers(), downUser:getVoteUsers()}]});

    }

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getUserId(){
    return getRandomInt(10000233,30000111);
}
function getTags(){
    var count = getRandomInt(0,5);
    var tags = [];
    for(var i=0;i<count;i++){
        tags.push({
            name: tag_gen.generateWord(),
            id:getRandomInt(0,10000),
            type:'brand'
        })
    }
    return tags;
}

function getVoteUsers(){
    var count = getRandomInt(0,5);
    var users = [];
    for(var i=0;i<count;i++){
        users.push(getUserId());
    }
    return users;
}

create_topic();


