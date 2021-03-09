import AppSys from "../models/app_sys";

export default class ImageFile {

    static downloadImg(file, nombre, done) {

        const data = new FormData();
        data.append('imageFile', file);
        data.append('name', nombre);
        data.append('tipo', 'image');
        fetch(AppSys.urlBase + "/upload/upload", {
            method: 'POST',
            //headers: {
            //'Accept': 'application/json',
            //'Content-Type': 'application/x-www-form-urlencoded'
            //'Content-Type': 'multipart/form-data'
            //'enctype': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA'
            // },
            body: data
        }).then(function (result) {
            return result.json()
        })
            .then(function (rst) {
                if (rst) {
                    if (done) done(rst)// devuelve el url sino un texto vacio
                }
            })

    }
}