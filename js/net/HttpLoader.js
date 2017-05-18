

export default class HttpLoader{
    static load(url,callBackFun){
        
        fetch(url).then(res =>{
            return res.json();
        }).then(data =>{
            callBackFun(data);
        }).catch(reason => {
            console.warn(reason);
        })
    }

    static debug(obj){
        let str = '';
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                
                var element = obj[key];
                str += key + ':' + element + '\n';
                
            }
        }
        console.warn(str);
    }
}