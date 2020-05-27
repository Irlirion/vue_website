<template>
    <div>
        <b-row class="text-center">
            <b-col>
                <h2>
                    Добро пожаловать
                </h2>
            </b-col>
        </b-row>
        <b-row class="text-center">
            <b-col>
                <img :src="image"/>
            </b-col>
        </b-row>

    </div>
</template>

<script>
    import image from "@/assets/pikachu.png"

    export default {
        name: "Home",
        data() {
            return {
                image
            }
        }
    }
</script>

<style scoped>

</style>