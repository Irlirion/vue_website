<template>
    <div id="app">
        <b-container>
            <Header/>
            <router-view/>
        </b-container>
    </div>
</template>

<script>
    import Header from "@/components/Header";

    export default {
        name: "App",
        components: {
            Header,
        }
    }
</script>

<style>
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
