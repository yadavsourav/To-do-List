const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js");   // As this module is local thatswhy requiring it differently
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

// const items = ["Buy Food","Cook Food", "Eat Food"];
const workItems = [];

app.set("view engine", "ejs"); // It should be below of app = express();

app.use(bodyParser.urlencoded({extended: true}));

/* By default express can access only main directory i.e TODOLIST so to access style.css in css creat public*/

app.use(express.static("public"));

main().catch(err => console.log(err));
 
async function main() {
    
  mongoose.connect(URL);
  mongoose.set('strictQuery', false);
  console.log("Connected");

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const Item1 = new Item({
    name: "Welcome to your todolist"
});

const Item2 = new Item({
    name: "Press + to add "
});

const Item3 = new Item({
    name: "<-- To delete"
});

const defaultItems = [Item1, Item2, Item3];

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res){
 //  const day = date;
 
   Item.find({}, function(err, foundItems){

   if(foundItems.length === 0){

    Item.insertMany(defaultItems, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Success");
            
        }
    });
    res.redirect("/");

   } else{
   res.render("lists", {listTitle: "Today", newListItem: foundItems});    // This command is such due to ejs
}
});

   // res.send();
});

app.get("/:ListName", function(req, res){
    const ListName = _.capitalize(req.params.ListName);

    List.findOne({name: ListName}, function(err, foundList){
        if(!err){
            if(!foundList){
            const list = new List({
                name: ListName,
                items: defaultItems
            });
                 list.save();
                 res.redirect("/" + ListName);

        } else {

            res.render("lists", {listTitle: foundList.name, newListItem: foundList.items});
        }

        }
        
    })
   
})

app.post("/", function(req, res){
     const listName = req.body.list;
     
     const item = new Item({
        name: req.body.newItem
    });


    if(listName === "Today"){

        item.save();
        res.redirect("/");

    }

    else{

        List.findOne({name: listName}, function(err, foundList){
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        })

       
        
    }

    

    

    
    
});

app.post("/delete", function(req, res){
    const checkedItemId = req.body.checkbox;

    if(req.body.listName === "Today"){

    Item.findByIdAndRemove(checkedItemId, function(err){
        if(!err){
            console.log("Successfully deleted");
            res.redirect("/");
        }
    });
} else{

    List.findOneAndUpdate({name: req.body.listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundItem){

        if(!err){
            console.log("Successfully deleted");
            res.redirect("/" + req.body.listName);
        }

    })

}
});

}

app.get("/work", function(req, res){
    res.render("lists", {listTitle: "workList", newListItem: workItems});
})

app.post("/work", function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.get("/about", function(req, res){
    res.render("about");
});


app.listen(3000, function(){
    console.log("Server started on port 3000");
});