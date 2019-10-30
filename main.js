/*creamo 2 clases */
class Search{
    static get(url){
        let xhr = new XMLHttpRequest();

        xhr.open(url);

        xhr.send();

        return new Promise((resolve, reject)=>{
            xhr.onreadystatechange = () =>{
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        //todo salio bien
                        return resolve(JSON.parse(xhr.responseText));
                    }
                    reject(xhr.status);
                }
            }
        })

        
    }
}

/** aqui ponemos la direccion de donde queremos que se
 * genere la peticion ajax
 */
Search.get("").then(data => { })

class Autocomplete{}

/*closure*/ 
(function(){})();