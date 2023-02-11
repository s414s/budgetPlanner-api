var fetch = require('node-fetch')

module.exports = {
    endpoint: 'http://127.0.0.1:3000/',
    token: 'beaf4541e0476835b89fa789e4abd14b6e86eeeb',
    get: async function(uri, obj = {}){

        // Query : String
            const query = 
                Object.keys(obj)
                .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]) )
                .join('&');
        
        //Endpoint
            const url = this.endpoint+uri+"?"+query;

        //Request
            const response = await fetch(url, {
                method: 'GET',
                headers : {
                    'Content-Type': 'application/json',
                    'token': this.token
                },
                redirect: 'follow'
            });

        return response.json();
    },

    post: async function(uri, obj = {}, method="POST"){

        // Endpoint
            const url = this.endpoint + uri;

        // Request
            const response = await fetch(url, {
                method: method,
                headers : {
                    'Content-Type': 'application/json',
                    'token': this.token
                },
                redirect: 'follow',
                body: JSON.stringify(obj)
            });

            console.log(obj);

        return response.json();
    },

    put: async function(uri, obj = {}){
        return this.post(uri, obj, "PUT");
    },

    del: async function(uri, obj = {}){
        return this.post(uri, obj, "DELETE");
    },
};