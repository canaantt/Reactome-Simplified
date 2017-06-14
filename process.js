// Remove the first 9 lines from the original txt files, the output from MySQL json objects
// $sed 1,9d PhysicalEntity.json.txt > PhysicalEntity.json
// $sed 1,9d ReactionLikeEvent_To_PhysicalEntity.json.txt > ReactionLikeEvent_To_PhysicalEntity.json

var PhysicalEntity = require("../data/PhysicalEntity.json");
var ReactionLikeEvent_To_PhysicalEntity = require("../data/ReactionLikeEvent_To_PhysicalEntity.json");
var Pathway_To_ReactionLikeEvent = require("../data/Pathway_To_ReactionLikeEvent");
var Pathways = require("../data/Pathway.json");
var PathwayHierarchy = require("../data/PathwayHierarchy.json");
var ReactionLikeEvent = require("../data/ReactionLikeEvent");


const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/reactome-simple");
var db = mongoose.connection;
db.once("open", function(callback){
    console.log("Connection succeeded.");
    db.collection("PhysicalEntity").insertMany(PhysicalEntity, function(err, result){
                                                if (err) console.log(err);
                                            });
    db.collection("ReactionLikeEvent_To_PhysicalEntity").insertMany(ReactionLikeEvent_To_PhysicalEntity, function(err, result){
                                                if (err) console.log(err);
                                            }); 
    db.collection("Pathway_To_ReactionLikeEvent").insertMany(Pathway_To_ReactionLikeEvent, function(err, result){
                                                if (err) console.log(err);
                                            }); 
    db.collection("Pathways").insertMany(Pathways, function(err, result){
                                                if (err) console.log(err);
                                            }); 
    db.collection("PathwayHierarchy").insertMany(PathwayHierarchy, function(err, result){
                                                if (err) console.log(err);
                                            }); 
    db.collection("ReactionLikeEvent").insertMany(ReactionLikeEvent, function(err, result){
                                                if (err) console.log(err);
                                            });                                                                                                                                                                                                         
});


