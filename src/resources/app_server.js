export default class Server{
    /**
     * Funcion que hace una consulta al servidor general ,
     * requiere el nombre de la funcion un objeto de datos (data) 
     * y una funcion de respuesta "done" 'nombFuncion(result)'
     */
     consulta( url,  data,  done){

            var me=this;
             fetch(url, {
                      method: 'POST',
                      body: JSON.stringify(data), 
                      /*headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'X-Requested-With': 'XMLHttpRequest'
                    }*/
                      })
              .then(function(result) {
                        return result.json()
                      })
              .then(function(result) {
                      if(result) {  

                        var obj=result;
                        console.log(obj);
                        if(done)done(obj);

                      } else {

                          throw "Error en la llamada Ajax";
                      }
                  
                  })
                
            .catch(function(err) {
                    console.log(err);
                  });

        };

      post(url, data, done) {

          var me = this;

          /*var formBody = [];
          for (var property in data) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");*/

          fetch(url, {
            method: 'POST',
            body:  JSON.stringify(data),
            headers: {
              //"Content-Type": "application/x-www-form-urlencoded",
              'Content-type': 'application/json; charset=UTF-8',
            }
             
          })
            .then(function (result) {
              return result.json()
            })
            .then(function (result) {
              if (result) {

                var obj = result;
                console.log(obj);
                if (done) done(obj);

              } else {

                throw "Error en la llamada Ajax";
              }

            })

            .catch(function (err) {
              console.log(err);
            });

        };

        update(url, data, done) {

          var me = this;

          fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data) ,
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            
            }
          })
            .then(function (result) {
              return result.json()
            })
            .then(function (result) {
              if (result) {

                var obj = result;
                console.log(obj);
                if (done) done(obj);

              } else {

                throw "Error en la llamada Ajax";
              }

            })

            .catch(function (err) {
              console.log(err);
            });

        };


        get( url,  data,  done){

          var me=this;
           fetch(url, {
                    method: 'GET',
                    /* body: JSON.stringify(data), 
                   headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                  }*/
                    })
            .then(function(result) {
                      return result.json()
                    })
            .then(function(result) {
                    if(result) {  

                      var obj=result;
                      console.log(obj);
                      if(done)done(obj);

                    } else {

                        throw "Error en la llamada Ajax";
                    }
                
                })
              
          .catch(function(err) {
                  console.log(err);
                });

      };
 
  
   
    }
    

    /*
    Ejemplo de uso------------------------
    get('http://fipo.equisd.com/api/products.json').then(function(response) {
      console.log("Success!", response);
      var datadiv = document.getElementById("data");
      datadiv.innerHTML = response;
    }, function(error) {

    });

    get('http://fipo.equisd.com/api/productsx.json').then(function(response) {

    }, function(error) {
      console.error("Failed!", error);
      var errordiv = document.getElementById("error");
      errordiv.innerHTML = error;  
    })
    */
