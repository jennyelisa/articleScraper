var express = require ("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;

var app = express();

app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/articlescraper", { useNewUrlParser: true });
//need to check hw instruction for mongo deployment to heroku

app.get("/", function(req, res) {
  res.send("No scraped articles yet!");
  console.log("homebase! just sitting pretty ;)")
})

//database app.get?

//when scrape button is clicked.
app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.nytimes.com/section/arts").then(function(response) {
      var $ = cheerio.load(response.data);
  
      // gets every h2 from the articles
      $("article h2").each(function(i, element) {
        // result object
        var result = {};
  
        //this adds the article title and link........need to add summary....if that works then try to add the img😬
        //save them as properties of the result object 
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");
          result.summary = $(this)
          .children("p")
          .text();
  
        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            //should show in the consolelog
            console.log(dbArticle);
          })
          .catch(function(err) {
            console.log(err);
          });
      });
  
      // lets user know the scrape has worked 🤭
      res.send("Scrape Done");
    });
  });

  //this will then show the object of articles to the user
  app.get("/articles", function(req, res) {
    db.Article.find({})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
//dont think this is needed


//i need to grab the articles
//then display (10) articles to the dom. still in the same /scrape
  //these articles should have header, summary and image. header is the link to the actual article
//this displays dynamically


//need a /saved when the saved article button is clicked. 
// from this page i should have a article note button, where user can 
  //save a note. when clicked again they should see their note and can add
  // a new one. 
//next to article note button there is a delete from saved button. when deleted
  //you will stay on the /saved root
