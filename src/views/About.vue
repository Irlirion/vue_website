<template>
    <div>
        <b-row class="about">
            <b-col>
                <h3>О нас</h3>
                <p class="about__text">
                    Нзвание проекта: Игра "Что нарисовано?"<br>
                    Автор: Григорьев Ростислав Александрович<br>
                    Версия: alpha 0.0.1<br>
                    Год: 2020<br>
                </p>
            </b-col>
        </b-row>
        <b-row class="back">
            <b-col>
                <hr>
                <b-navbar class="back__navbar">
                    <b-navbar-nav>
                        <b-nav-item class="back__link" to="/">Домой</b-nav-item>
                    </b-navbar-nav>
                </b-navbar>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: "About",
    }
</script>

<style scoped>
    .about {
        margin-left: 5px;
    }

    .about__text {
        font-weight: bold;
    }

    .back {
        display: block;
    }

    .back__navbar {
        padding: 8px 0;
    }

    .back__link {
        padding: 8px 16px;
    }
</style>