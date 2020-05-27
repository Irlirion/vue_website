<template>
    <div>
        <BaseModel/>
        <b-row class="back">
            <hr>
            <b-navbar class="back__navbar">
                <b-navbar-nav>
                    <b-nav-item class="back__link" to="/">Домой</b-nav-item>
                </b-navbar-nav>
            </b-navbar>
        </b-row>
    </div>
</template>


<script>
    // @ is an alias to /src
    import BaseModel from "@/components/BaseModel.vue";

    export default {
        name: "CV",
        components: {
            BaseModel,
        }
    }
</script>

<style scoped>
    .back {
        display: block;
    }

    .back__navbar {
        padding: 8px 0;
    }

    .back__link {
        padding: 8px 16px;
        font-weight: bold;
    }
</style>