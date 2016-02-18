var request = require("request");
var cheerio = require("cheerio");
var scraper = {};

var providers = {
  "onliner": {
      url: "http://tech.onliner.by/",
      parser: function(query, body) {
          var $ = cheerio.load(body);
          var content = [];
          $(".g-middle .b-posts-1-item").each(function(elem) {
              var title = $(this).find("h3").text().trim();
              var link = $(this).find("a").attr("href");
              var image = $(this).find("img").attr("src");
              var textBlock = $(this).find("p");
              textBlock.find("a").remove();
              var text = textBlock.text().trim();
              var time = $(this).find("time").attr("datetime");

              content.push({
                  title: title,
                  link: link,
                  image: image,
                  text: text,
                  time: time
              })
          });
          return {
              title: "",
              content: content,
              totalCount: content.length
          };
      }
  }
};

/*
* @param {String} provider
* @param {Object} query
* @param {Function} callback [err, data]
* */
scraper.get = function(provider, query, callback) {
    var providerParams = providers[provider];
    if(!providerParams) {
        return callback("No such provider.", null);
    }
    var data = {};

    request({
        uri: providerParams.url
    }, function(error, response, body) {
        data[provider] = providerParams.parser(query, body);

        callback(null, data);
    });
};

module.exports = function(app) {
    app.post("/api/scraper", function(req, res, next) {
        var data = req.body;

        //todo: make promise chain to get array of providers
        scraper.get(data.providers[0], data.query, function(err, content) {
            if(err) {
                res.statusCode = 404;
                res.statusMessage = 'Not found';
                return res.send();
            }

            res.send(JSON.stringify(content));
        });
    });
};