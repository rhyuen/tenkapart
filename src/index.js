function httpGet(url, cb){
  var httpReq = new XMLHttpRequest();
  httpReq.onreadystatechange = function(){
    if(httpReq.readyState === 4 && httpReq.status == 200){
      cb(httpReq.responseText);
    }
  }
  httpReq.open("GET", url, true);
  httpReq.send(null);
}

function formatDate(longDate){
  var datePieces = longDate.split(" ");
  var shortedDate = datePieces[2] + " " + datePieces[1];
  return shortedDate;
}

var globalArticleCount = 0;
var globalCurrentColumnCount = 0;

function determineCardColumn(){
  globalArticleCount++;
  if(globalCurrentColumnCount < 3){
    return globalCurrentColumnCount++;
  }else{
    globalCurrentColumnCount = 0;
    return globalCurrentColumnCount;
  }
}


function createCardElement(scopedArticle){
  var cardEl = document.createElement("div");
  cardEl.className = "card";
  var cardHeaderEl = document.createElement("div");
  cardHeaderEl.className = "card_header";
  var cardSourceEl = document.createElement("div");
  cardSourceEl.className = "card_source"
  cardSourceEl.textContent = scopedArticle.title[0];
  var cardTimeEl = document.createElement("div");
  cardTimeEl.className = "card_time";
  cardTimeEl.textContent = formatDate(scopedArticle.pubDate[0]);
  cardHeaderEl.appendChild(cardSourceEl);
  cardHeaderEl.appendChild(cardTimeEl);

  var cardFocusEl = document.createElement("div");
  cardFocusEl.className = "card_focus";
  var cardContentEl = document.createElement("p");
  cardContentEl.className = "card_content";
  cardContentEl.innerHTML = scopedArticle.description[0];
  cardFocusEl.appendChild(cardContentEl);

  var cardMetaEl = document.createElement("div");
  cardMetaEl.className = "card_meta";
  var spanEl = document.createElement("span");
  spanEl.textContent = scopedArticle.category[0]._;
  cardMetaEl.appendChild(spanEl);

  cardEl.appendChild(cardHeaderEl);
  cardEl.appendChild(cardFocusEl);
  cardEl.appendChild(cardMetaEl);

  document.getElementsByClassName("column")[determineCardColumn()].appendChild(cardEl);
}

httpGet("/guardian", function(content){
  var guardianObj = JSON.parse(content);
  var guardianArticles = guardianObj.rss.channel[0].item;
  guardianArticles.map(function(currArticle){
    createCardElement(currArticle);
  });
});

httpGet("/economist", function(content){
  var economistObj = JSON.parse(content);
  var econArticles = economistObj.rss.channel[0].item;
  econArticles.map(function(currArticle){
    createCardElement(currArticle);
  });
});
