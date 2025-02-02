/**
 * Created by Komal on 26/04/15.
 */

var express=require('express');
var app=express();
var mongojs=require('mongojs');
var db = mongojs('contactlist',['contactlist']);
var bodyParser=require('body-parser');

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());

app.get('/contactlist',function(req,res){
    console.log("I get Contactlist request");
    db.contactlist.find(function (err,docs) {
        console.log(docs);
        res.json(docs);

    });
});

app.post('/contactlist',function(req,res){
    console.log(req.body);
    db.contactlist.insert(req.body, function (err, doc) {
        res.json(doc);
    });
});

app.delete('/contactlist/:id', function (req,res) {
    var id= req.params.id;
    console.log(id);
    db.contactlist.remove({_id:mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.get('/contactlist/:id',function(req,res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({_id:mongojs.ObjectId(id)}, function(err,doc){
       res.json(doc);
    });
});

app.put('/contactlist/:id',function(req,res){
    var id=req.params.id;
    console.log(req.body.name);
    console.log(req.body.Email);
    console.log(req.body.phone);
    db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)},
    update:{$set:{name:req.body.name,Email:req.body.Email,phone:req.body.phone}},
    new:true}, function (err,doc) {
        res.json(doc);
    });
    });


app.listen(3000);
console.log("server is listening on port 3000");