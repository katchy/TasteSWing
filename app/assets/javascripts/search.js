// var search = $('search')[0].value;


// var xmlhttp = new XMLHttpRequest();
// var url = "http://services.wine.com/api/beta2/service.svc/JSON/catalog?apikey=b1af7f1d65f1e1ebdb2faf060ad8fadd";

// xmlhttp.onreadystatechange = function() {
//   if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//     var myArr = JSON.parse(xmlhttp.responseText);
//   }
// }
// xmlhttp.open("GET", url, true);
// xmlhttp.send();


// console.log(xmlhttp);


var displayBottle = function(data) {
  debugger
  console.log(data);
}

$(function(){
  // when the form is submitted

  // grab the keyword from the input field

  // perform ajax search


  function getWineInfo(query) {
  // var search = "ghost block"  // TODO: Url encode the search keywords
  var req = new XMLHttpRequest();
  var link = "http://services.wine.com/api/beta2/service.svc/JSON/catalog?search="+ query +"&apikey=b1af7f1d65f1e1ebdb2faf060ad8fadd"

  req.onreadystatechange = function() {
    console.log('state changed', req.readyState, req.status);
    if (req.readyState == 4 && req.status == 200) {

      console.log('received success response', req.responseText);
      var data = JSON.parse(req.responseText);

      displayBottle(data);
      $('.cards').empty();

       for (i = 0; data.Products.List.length; i++) {
        var imgSrc;
        if(data.Products.List[i] && data.Products.List[i].Labels && data.Products.List[i].Labels.length > 0) {
          imgSrc = data.Products.List[i].Labels[0].Url;
        } else {
          imgSrc = "";
        }
        $('.bottle').append(
          $('<div class="card">').append(
            $('<img>').attr('src', imgSrc)
          ).append(
            $('<p>').text(data.Products.List[i].Name)
              .append(
                $('<span>').text('Price: ').css('weight', 'bold')
              ).append(
                $('<p>').text('$' + data.Products.List[i].PriceRetail)
              )
          ).append(
            $('<button>')
          )
        )



        // $('.bottle').append(
        //   $('button').text("Iam button")
        // )

          // + " " + data.Products.List[i].Name + '<strong> Price:</strong> ' 
          // + '$'+ data.Products.List[i].PriceRetail + '  '  + '<br>' 
          // + '<button type="button">Add This To Your Library!</button>' + '<br>');
      }

    }
  }
  req.open("GET", link, true);
  req.send();
}
  



  $("form.search").on('submit', function(e){
    e.preventDefault(); // don't submit the form
    // debugger
    var query = $(this.search).val();
    getWineInfo(query);
  });





  // var wine = req.response;
  // console.log('wine is', wine);

});

