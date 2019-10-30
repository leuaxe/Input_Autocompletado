/*creamo 2 clases */
class Search {
    static get(url) {
        let xhr = new XMLHttpRequest();

        xhr.open(url);

        xhr.send();

        return new Promise((resolve, reject) => {
            xhr.onreadystatechange = () => {
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



class Autocomplete { }

/*closure*/
(function () {
    const GOOGLEBOOKSAPIURL = "https://www.googleapis.com/books/v1/volumes?q="; 

    /** aqui ponemos la direccion de donde queremos que se
 * genere la peticion ajax
 */
    Search.get(GOOGLEBOOKSAPIURL+"harry").then(results => Console.log(results));
})();