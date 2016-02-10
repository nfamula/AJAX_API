$(document).ready(function() {
var API_KEY = "MDpmMjJjMGJmYS1kMDNjLTExZTUtOWEyMC1kZmEwYmEyYjRjZDc6YkRuTEZpQmplM0VJaVZ0c0FDdFRVZWRRZWtqVmxnODN1V09v"

var drinkTemplate = _.template($('#drink-template').html());

  function getDrinkList(name){
    $.ajax({
      url:'https://lcboapi.com/products',
      data:{q: name},
      method:'GET',
      headers:{'Authorization':"TOKEN "+API_KEY}
    }).then(function(data) {
      // Parse result into the webpage
      for(var i = 0; i < data.result.length; i++){
        var drink = data.result[i];
        var output = drinkTemplate({
          name: drink.name,
          origin: drink.origin,
          style: drink.style,
          image: drink.image_thumb_url
        });

        $('#drink-table-results tbody').append(output);
      }

    });
  }

    // Form subsmission event
  $('#nameInput').on('keyup', _.debounce(function(event) {
    var input = $(event.target).val();
    console.log(input)
    if (input.length < 3) return;
    $('#drink-table-results tbody').html('');
    getDrinkList(input);
  }, 1000));
    // Get results
});

//form validations 