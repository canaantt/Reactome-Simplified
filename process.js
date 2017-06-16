// Remove the first 9 lines from the original txt files, the output from MySQL json objects
// $sed 1,9d PhysicalEntity.json.txt > PhysicalEntity.json
// $sed 1,9d ReactionLikeEvent_To_PhysicalEntity.json.txt > ReactionLikeEvent_To_PhysicalEntity.json
const _ = require("underscore");
var PhysicalEntity = require("./data/PhysicalEntity.json");
var PhysicalEntityHierarchy = require("./data/PhysicalEntityHierarchy.json");
var ReactionLikeEvent_To_PhysicalEntity = require("./data/ReactionLikeEvent_To_PhysicalEntity.json");
var Pathway_To_ReactionLikeEvent = require("./data/Pathway_To_ReactionLikeEvent.json");
var Pathways = require("./data/Pathway.json");
var PathwayHierarchy = require("./data/PathwayHierarchy.json");
var ReactionLikeEvent = require("./data/ReactionLikeEvent");
// var data = {
//     "PhysicalEntity": PhysicalEntity,
//     "PhysicalEntityHierarchy": PhysicalEntityHierarchy,
//     "ReactionLikeEvent_To_PhysicalEntity": ReactionLikeEvent_To_PhysicalEntity,
//     "Pathway_To_ReactionLikeEvent": Pathway_To_ReactionLikeEvent,
//     "Pathways": Pathways,
//     "PathwayHierarchy": PathwayHierarchy,
//     "ReactionLikeEvent": ReactionLikeEvent,
// };

const asyncLoop = require('node-async-loop');
const mongoose = require('mongoose');
const jsonfile = require("jsonfile");
// mongoose.connect("mongodb://localhost:27017/reactome-simple");
// var db = mongoose.connection;
// db.once("open", function(callback){
//     console.log("Connection succeeded.");
//     asyncLoop(Object.keys(data), function(c, next){
//         console.log('Current Collection: ' + c);
//         db.collection(c).insertMany(data[c], function(err, result){
//             if (err) console.log(err);
//             next();
//         })
//     }, function(err){
//         if (err){
//             console.log('Error: ' + err.message);
//             return;
//         } else {
//             console.log("Finished!");
//             db.close();
//         }
//     });
// });

// Queries
// EGFR
_.uniq(PhysicalEntity.map(function(m){return m.species;})); // 58 items
// [ null,
//   'Homo sapiens',
//   'Rattus norvegicus',
//   'Mus musculus', ..., 'Oryza sativa' ]

PhysicalEntity.filter(function(m){return m.species === "Homo sapiens"}).length; // 39793 human physical entities
var humanPhysicalEntities = PhysicalEntity.filter(function(m){return m.species === "Homo sapiens"})
                                          .map(function(m){return m.displayName;});
// delimiters include ":", "[]"
var humanPhysicalEntities_annots = _.uniq(humanPhysicalEntities.map(function(m){ return m.split("[")[1].replace("]","");})); // 117 annotation types
//[ 'ER to Golgi transport vesicle',
//   'ER to Golgi transport vesicle membrane',
//   'Golgi lumen',
//   'Golgi membrane',
//   'Golgi-associated vesicle lumen',...,'pre-autophagosomal structure membrane','proteinaceous extracellular matrix',...];
var humanPhysicalEntities = _.uniq(humanPhysicalEntities.map(function(m){ return m.split(" ")[0];})); // 32830 potential GENES(?)

// Human, EGFR clean entry yield one record from PhysicalEntity Collection
PhysicalEntity.filter(function(m){return m.species === "Homo sapiens" && m.displayName.split(" [")[0] === "EGFR";})
[ { id: '179837',
    displayName: 'EGFR [plasma membrane]',
    species: 'Homo sapiens',
    class: 'EntityWithAccessionedSequence',
    stableId: 'R-HSA-179837' } ]

ReactionLikeEvent_To_PhysicalEntity.filter(function(m){return m.physicalEntityId === "179837";})
[ { reactionLikeEventId: '177922', physicalEntityId: '179837' },
  { reactionLikeEventId: '177934', physicalEntityId: '179837' },
  { reactionLikeEventId: '177937', physicalEntityId: '179837' },
  { reactionLikeEventId: '177942', physicalEntityId: '179837' },
  { reactionLikeEventId: '445069', physicalEntityId: '179837' },
  { reactionLikeEventId: '1225978', physicalEntityId: '179837' },
  { reactionLikeEventId: '1248677', physicalEntityId: '179837' },
  { reactionLikeEventId: '1963581', physicalEntityId: '179837' },
  { reactionLikeEventId: '1963582', physicalEntityId: '179837' },
  { reactionLikeEventId: '1963586', physicalEntityId: '179837' },
  { reactionLikeEventId: '1963589', physicalEntityId: '179837' },
  { reactionLikeEventId: '1977959', physicalEntityId: '179837' },
  { reactionLikeEventId: '2179387', physicalEntityId: '179837' },
  { reactionLikeEventId: '8857549', physicalEntityId: '179837' },
  { reactionLikeEventId: '8857555', physicalEntityId: '179837' },
  { reactionLikeEventId: '8857565', physicalEntityId: '179837' },
  { reactionLikeEventId: '8857577', physicalEntityId: '179837' },
  { reactionLikeEventId: '8857583', physicalEntityId: '179837' },
  { reactionLikeEventId: '8874797', physicalEntityId: '179837' } ]

 ReactionLikeEvent.filter(function(m){return m.id === "177922";})
[ { id: '177922',
    displayName: 'EGFR dimerization',
    species: 'Homo sapiens',
    class: 'Reaction',
    stableId: 'R-HSA-177922' } ]

Pathway_To_ReactionLikeEvent.filter(function(m){return m.reactionLikeEventId === "177922";})
[ { pathwayId: '177929', reactionLikeEventId: '177922' } ]

Pathways.filter(function(m){return m.id === '177929';})
[ { id: '177929',
    displayName: 'Signaling by EGFR',
    species: 'Homo sapiens',
    stableId: 'R-HSA-177929' } ];

 PathwayHierarchy.filter(function(m){return m.pathwayId === '177929';})
[ { pathwayId: '177929', childPathwayId: '179812' },
  { pathwayId: '177929', childPathwayId: '180292' },
  { pathwayId: '177929', childPathwayId: '180336' },
  { pathwayId: '177929', childPathwayId: '182971' },
  { pathwayId: '177929', childPathwayId: '212718' } ]
  
 PathwayHierarchy.filter(function(m){return m.childPathwayId === '177929';})
[ { pathwayId: '162582', childPathwayId: '177929' } ]

var findPhysicalEntity = function(id){
    return PhysicalEntity.filter(function(m){return m.id === id})[0].displayName;
}


var reaction_to_physicalEntity = function(reactionID){
    var arr = ReactionLikeEvent_To_PhysicalEntity.filter(function(m){
                    //console.log(m);
                    return m.reactionLikeEventId === reactionID;
                });
        if(arr.length !==0 ){
            return arr.map(function(n){
                    //console.log(n);
                    if('physicalEntityId' in n)
                    return findPhysicalEntity(n.physicalEntityId);
                    return null;
                });
        } else {
            return;
        }
        
    };
var gene_to_pathways = function(gene){
   var obj = {};
   var geneIDs = PhysicalEntity.filter(function(m){
        return m.species === "Homo sapiens" && m.displayName.split(" ")[0] === gene;
    }).map(function(m){return m.id});
   console.log("geneIDs: ", geneIDs);
   if(geneIDs.length === 0) {
       console.log("This gene is not found.");
       return;
   } 
   var child = {};
   geneIDs.forEach(function(id){
                    console.log(id);  
                    child[findPhysicalEntity(id)] = PhysicalEntityHierarchy.filter(function(m){
                              return m.physicalEntityId === id;
                            }).map(function(m){ return findPhysicalEntity(m.childPhysicalEntityId); });
                });
   obj.child = child;
   var reactionEventIDs = geneIDs.map(function(id){
                            return ReactionLikeEvent_To_PhysicalEntity.filter(function(m){return m.physicalEntityId === id;})
                                                            .map(function(m){return m.reactionLikeEventId});
                          }).reduce(function(a, b){ return a.concat(b)});  
   console.log("reactionEventIDs: ", reactionEventIDs);
   if(reactionEventIDs.elngth === 0){
       console.log("This gene is not linked to any reaction Event, thus pathways cannot be found.");
       return;
   }

   var pathwayIDs = reactionEventIDs.map(function(id){
                        return Pathway_To_ReactionLikeEvent.filter(function(m){return m.reactionLikeEventId === id;})
                                                           .map(function(m){return m.pathwayId});
                    }).reduce(function(a, b){
                        return a = _.uniq(a.concat(b));
                    });
   console.log("pathwayIDs: ", pathwayIDs);    
   if(pathwayIDs.length === 0 ){
       console.log("No pathway is found.");
       return;
   }            
   
   obj.pathways = pathwayIDs.map(function(id){
       return Pathways.filter(function(m){ return m.id === id});
   });
   obj.childPathways = pathwayIDs.map(function(id){
       var o = {};
       o[id] = _.uniq(PathwayHierarchy.filter(function(m){return m.pathwayId === id;})
                               .map(function(m){return m.childPathwayId;}));
                    
       return o;
   });

   obj.parentPathways =  pathwayIDs.map(function(id){
       var o = {};
       o[id] = _.uniq(PathwayHierarchy.filter(function(m){return m.childPathwayId === id;})
                               .map(function(m){return m.pathwayId;}));
       return o;
   });
   return obj;
                      
};


// Test the stableID from two tables overlapping, the physicalEntity_STIDs is very long 520840
// var physicalEntity_STIDs = PhysicalEntity.map(function(m){return m.stableId;});
// var pathway_STIDs = Pathways.map(function(m){return m.stableId;});
var HumanPathways = Pathways.filter(function(m){
    return m.species === 'Homo sapiens';
});

var HumanPathways_ReactionEventIDs = HumanPathways.map(function(pathway){
                                        var o = {};
                                        o = pathway;
                                        o.reactionEventIDs = Pathway_To_ReactionLikeEvent.filter(function(m){
                                            return m.pathwayId === pathway.id;
                                        }).map(function(m){
                                            return m.reactionLikeEventId;
                                            // return reaction_to_physicalEntity(m.reactionLikeEventId);
                                        });
                                        return o;
                                     });
var index = 0;
HumanPathways_ReactionEventIDs.forEach(function(m){
    if(m.reactionEventIDs.length !== 0){
       m.reactionEventIDs = _.uniq(m.reactionEventIDs);
       m.physicalEntities = m.reactionEventIDs.map(function(id){
                                return reaction_to_physicalEntity(id);
                            });
    }
    if (index === HumanPathways_ReactionEventIDs.length-1){
        jsonfile.writeFile("HumanPathways_ReactionEventIDs.json", HumanPathways_ReactionEventIDs, {spaces: 2}, function(err){ console.error(err);});  
    }
    console.log(index++);
});

