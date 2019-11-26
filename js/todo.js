var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

var todos = document.querySelectorAll("input[type=checkbox]");

dataCont = 1

function loadTodos() {
  $.ajax({
    //url: 'http://localhost:3000/todos',
    // url: 'https://tuapp.herokuapp.com/todos',
    url: 'https://examenfinalmio.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)

      let $list = $('#todo-list')

      $list.empty();
      for( let i = 0; i < data.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        
        
        console.log(data[i].completed)
        console.log(data[i].description)


        var algo = '<li><input type="checkbox" name="todo" value="' + i + '"><span>' + data[i].description + '</span></li>'

        $list.append($(algo))
        
                
        // algo asi:
        // addTodo(data[i]._id, data[i].description, data[i].completed)
        // no tienen que usar la funcion de addTodo, es un ejemplo
        dataCont = i
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadTodos()


// o con jquery
// $('input[name=newitem]').keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         $.ajax({})
//     }
// });

var input = document.querySelector("input[name=newitem]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description" : input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      //url: 'http://localhost:3000/todos',
      //url: 'https://tuapp.herokuapp.com/todos',
      url: 'https://examenfinalmio.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log(data)
        dataCont = dataCont + 1
        
        let $list = $('#todo-list')
        // agregar código aqui para poner los datos del todolist en el el html
        var algo = '<li><input type="checkbox" name="todo" value="' + dataCont + '"><span>' + input.value + '</span></li>'

        $list.append($(algo))
        
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }
})


function addTodo(id, todoText, completed) {
  
}