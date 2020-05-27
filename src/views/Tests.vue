<template>
    <div>
        <b-nav tabs>
            <b-nav-item disabled><b>Тест на программиста</b></b-nav-item>
            <b-nav-item disabled><b>{{index + 1}} из {{numtotal}}</b></b-nav-item>
        </b-nav>
        <b-container class="bv-example-row">
            <b-row class="justify-content-md-center text-center">
                <b-col sm="6">
                    <Quizebox
                            :currentquestion="questions[index]"
                            :increment="increment"
                            :next="next"
                            v-if="index < questions.length"
                    />
                    <div class="final" v-else>
                        <div class="big">{{numcorrect}}/{{numtotal}}</div>
                        <p v-if="numcorrect <= 1">
                            <span class="final__bold">Гуманитарий</span><br>
                            Вы почти ничего не знаете о программировании.
                        </p>
                        <p v-else-if="numcorrect <= 3">
                            <span class="final__bold">Подисчик пабликов о программировании</span><br>
                            Что-то о жизни программиста вы слышали, но вам ещё расти и расти.
                        </p>
                        <p v-else-if="numcorrect <= 9">
                            <span class="final__bold">Джун</span><br>
                            Да, вы программист, но пока что только начинающий.
                        </p>
                        <p v-else-if="numcorrect <= 11">
                            <span class="final__bold">Программист</span><br>
                            Всего одна ошибка. По другому и быть не могло.
                        </p>
                        <p v-else>
                            <span class="final__bold">Настоящий программист!</span><br>
                            У вас точно есть опыт в разработке.
                        </p>

                    </div>

                </b-col>
            </b-row>
        </b-container>
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
    import Quizebox from '../components/Quizebox.vue'

    export default {
        name: 'app',
        components: {
            Quizebox
        },
        data() {
            return {
                questions: [
                    {
                        correct_answer: "Hello world",
                        incorrect_answers: ["Сортировку «пузырьком»", "Для взлома аккаунта «ВКонтакте». Такая " +
                        "программа есть у каждого программиста", "Это вопрос с подвохом. Начинают они с " +
                        "починки утюгов, программы тут не при чём."],
                        question: "Начнём с простого. Какую первую программу обычно пишут программисты?"
                    },
                    {
                        correct_answer: "Нет, это фантастика",
                        incorrect_answers: ["Да, конечно"],
                        question: "Бывает ли так, что программа скомпилировалась с первого раза и без ошибок?"
                    },
                    {
                        correct_answer: "Буду искать ошибку в компиляторе, где-то она должна быть",
                        incorrect_answers: ["Выключу комп и спокойно пойду спать — дело сделано",
                            "Порадуюсь за себя и продолжу писать код"],
                        question: "Представим гипотетическую ситуацию, в которой программа всё-таки скомпилировалась " +
                            "с первого раза. Как вы поступите?"
                    },
                    {
                        correct_answer: "Изменятся, конечно",
                        incorrect_answers: ["Не изменятся. Вы же сами сказали, что всё чётко зафиксировано"],
                        question: "Движемся дальше. Вопрос на проверку логического мышления. Допустим, вы пишете " +
                            "проект, и заказчик утвердил документ, в котором чётко написано, что он хочет получить " +
                            "в результате. Назовём его ТЗ. Изменятся ли требования в процессе работы над проектом?"
                    },
                    {
                        correct_answer: "Какой правильный ответ на вопрос про рекурсию?",
                        incorrect_answers: ["Да", "42"],
                        question: "Какой правильный ответ на вопрос про рекурсию?"
                    },
                    {
                        correct_answer: "Неизвестно",
                        incorrect_answers: ["Была одна, теперь ошибок не будет"],
                        question: "Представьте, что вы пишете программу и при попытке её сборки компилятор " +
                            "выдал вам одну ошибку. Вы исправили её и пробуете собрать проект ещё раз. " +
                            "Сколько теперь будет ошибок?"
                    },
                    {
                        correct_answer: "Его код просто ужасен, ну кто так пишет!",
                        incorrect_answers: ["Надо сначала детально изучить проект, чтобы понять это"],
                        question: "Вы пришли на проект, над которым раньше работал другой программист. " +
                            "Что можно сказать о его коде?"
                    },
                    {
                        correct_answer: "1",
                        incorrect_answers: ["0", "2"],
                        question: "Перед вами три дерева. На том, что посередине, сидит кот. " +
                            "На дереве с каким индексом сидит кот?"
                    },
                    {
                        correct_answer: "Феномен о том, что при определённой концентрации алкоголя в " +
                            "крови программистские способности резко возрастают",
                        incorrect_answers: ["Гора в Северной Америке", "\tЯхта Стива Балмера — бывшего генерального" +
                        " директора Microsoft"],
                        question: "Теперь чуть сложнее. Что такое Пик Балмера?"
                    },
                    {
                        correct_answer: "Несколько переменных типа «строка»",
                        incorrect_answers: ["«Верёвки» на английском", "Разновидность мини-трусиков"],
                        question: "Что такое стринги?"
                    },
                    {
                        correct_answer: "31",
                        incorrect_answers: ["5", "4", "32"],
                        question: "Какое максимальное число из перечисленных можно показать пальцами одной руки?"
                    },
                    {
                        correct_answer: "Никто не знает наверняка",
                        incorrect_answers: ["Одно", "У него не осталось яблок"],
                        question: "Буратино дали три яблока. Два он съел. Сколько яблок осталось у Буратино?"
                    },
                ],
                index: 0,
                numcorrect: 0,
                numtotal: 12,
            }
        },
        methods: {
            next() {
                this.index++
            },
            increment(iscorrect) {
                if (iscorrect) {
                    this.numcorrect++
                }
            }
        },

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

    .big {
        font-weight: 600;
        font-size: 40pt;
    }

    .final {
        margin-top: 30px;
        margin-bottom: 20px;
    }
</style>