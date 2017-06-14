// Remove the first 9 lines from the original txt files, the output from MySQL json objects
// $sed 1,9d PhysicalEntity.json.txt > PhysicalEntity.json
// $sed 1,9d ReactionLikeEvent_To_PhysicalEntity.json.txt > ReactionLikeEvent_To_PhysicalEntity.json

var PhysicalEntity = require("./data/PhysicalEntity.json");
var PhysicalEntityHierarchy = require("./data/PhysicalEntityHierarchy.json");
var ReactionLikeEvent_To_PhysicalEntity = require("./data/ReactionLikeEvent_To_PhysicalEntity.json");
var Pathway_To_ReactionLikeEvent = require("./data/Pathway_To_ReactionLikeEvent.json");
var Pathways = require("./data/Pathway.json");
var PathwayHierarchy = require("./data/PathwayHierarchy.json");
var ReactionLikeEvent = require("./data/ReactionLikeEvent");
var data = {
    "PhysicalEntity": PhysicalEntity,
    "PhysicalEntityHierarchy": PhysicalEntityHierarchy,
    "ReactionLikeEvent_To_PhysicalEntity": ReactionLikeEvent_To_PhysicalEntity,
    "Pathway_To_ReactionLikeEvent": Pathway_To_ReactionLikeEvent,
    "Pathways": Pathways,
    "PathwayHierarchy": PathwayHierarchy,
    "ReactionLikeEvent": ReactionLikeEvent,
};

const asyncLoop = require('node-async-loop');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/reactome-simple");
var db = mongoose.connection;
db.once("open", function(callback){
    console.log("Connection succeeded.");
    asyncLoop(Object.keys(data), function(c, next){
        console.log('Current Collection: ' + c);
        db.collection(c).insertMany(data[c], function(err, result){
            if (err) console.log(err);
            next();
        })
    }, function(err){
        if (err){
            console.log('Error: ' + err.message);
            return;
        } else {
            console.log("Finished!");
            db.close();
        }
    });
});

// Queries
// EGFR

