Vue.component('myf', {
    data() {
        return {
            userSearch: ""
        }
    },
    template: `
    <div class="search-form">
    <input class="search-field" v-model="userSearch">
    <button @click="$parent.filter(userSearch)" class="btn-search">найти</button>
    </div>
    `
});
/*
<form action="#" class="search-form" @submit.prevent="filter">
    <input type="text" class="search-field" v-model="{{$data.userSearch}}">
    <button type="submit" class="btn-search">
        <i class="fas fa-search"></i>
    </button>
    </form> */


