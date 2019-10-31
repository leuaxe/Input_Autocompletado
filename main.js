/*creamo 2 clases */
class Search {
    static get(url) {
        let xhr = new XMLHttpRequest();

        xhr.open("GET", url);

        xhr.send();

        return new Promise((resolve, reject) => {
            xhr.onreadystatechange = ()=> {
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



class Autocomplete {
    //generamos un DataList y lo enlazamos con el input para 
    //mostrar a lista de libros obtenidos
    constructor(input_selector, base_url){
        this.input = document.querySelector(input_selector);
        this.url = base_url;
        this.buildDataList();   
    }

    buildDataList(){
        //creamos el elemento dataList
        this.dataList = document.createElement("datalist");
        //se asigna un id que servira para enlazar con el input
        this.dataList.id = "datalist-autocomplete";
        //insertamos un nuevo elemento
        document.querySelector("body").appendChild(this.dataList);
        this.input.setAttribute("list", "datalist-autocomplete");
    }

    //metodo que realizara la busqueda
    search(){
        Search.get(this.url+"harry")
        .then(results => this.build(results));
    }

    //metodo que construira todos los option de nuestra lista
    build(response){
        //vaciamos el elemento datalist por si tenia opciones anteriores
        this.dataList.innerHTML = "";
        response.items.forEach(item => {
            let optionEl = document.createElement("option");
            optionEl.value = item.volumeInfo.title;
            //si el libro tiene un subtitulo lo agrega en el titulo
            if (item.volumeInfo.subtitle) {
                optionEl.innerHTML = item.volumeInfo.title;
            }

            //llena con el contenido el elemento datalist
            this.dataList.appendChild(optionEl);
        });
    }
 }

/*closure*/
(function () {
    const GOOGLEBOOKSAPIURL = "https://www.googleapis.com/books/v1/volumes?q=";
    let autocomplete = new Autocomplete("#searcher", GOOGLEBOOKSAPIURL);
    autocomplete.search();
})();