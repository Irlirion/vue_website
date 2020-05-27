<template>
    <header>
        <b-navbar toggleable="sm" type="light" variant="light">
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-navbar-brand to="/vue_website/">Григорьев Ростислав</b-navbar-brand>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item to="/calculator">Калькулятор</b-nav-item>
                    <b-nav-item to="/test">Тест</b-nav-item>
                    <b-nav-item to="/cv">Компьютерное зрение</b-nav-item>
                    <b-nav-item to="/feedback">Отзыв</b-nav-item>
                    <b-nav-item to="/about">О нас</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
    header {
        padding-bottom: 20px;
    }
</style>