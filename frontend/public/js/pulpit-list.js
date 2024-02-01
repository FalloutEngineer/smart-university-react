const App = {
    data(){
        return{
            items: []
        }
    },
    async mounted(){
        fetch('/pulpits/', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
        }).then(res =>{
            return res.json();
        }).then(data=>{
            this.items = data;
        });
    }
}

Vue.createApp(App).mount('#dash-body');