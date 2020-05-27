<template>
    <b-container>
        <b-row class="justify-content-center">
            <b-col lg="8">
                <h2 class="mb-4">Помоги стать лучше</h2>
                <b-alert
                        :show="dismissCountDown"
                        @dismiss-count-down="countDownChanged"
                        @dismissed="dismissCountDown=0"
                        dismissible
                        variant="success"
                >Форма отправлена!
                </b-alert>
                <b-form-input class="mb-3" placeholder="Имя" type="text" v-model="user_name"/>
                <b-form-input class="mb-3" placeholder="Почта" type="email" v-model="user_email"/>
                <b-form-textarea
                        class="mb-3"
                        id="textarea"
                        max-rows="6"
                        placeholder="Ваше сообщение..."
                        rows="3"
                        v-model="user_message"
                />
                <b-form-radio name="Feedback" v-model="form_type" value="feedback">Обратная связь</b-form-radio>
                <b-form-radio
                        class="mb-3"
                        name="Feature request"
                        v-model="form_type"
                        value="feature_request"
                >Новая фича
                </b-form-radio>
                <b-button @click="submitForm()" variant="primary">Отправить</b-button>
            </b-col>
        </b-row>
        <b-row class="back">
            <hr>
            <b-navbar class="back__navbar">
                <b-navbar-nav>
                    <b-nav-item class="back__link" to="/">Домой</b-nav-item>
                </b-navbar-nav>
            </b-navbar>
        </b-row>
    </b-container>
</template>

<script>
    import webhook from "@/mixins/webhook";

    export default {
        name: "Feedback",
        data() {
            return {
                user_name: "",
                user_email: "",
                user_message: "",
                form_type: "",
                dismissSecs: 5,
                dismissCountDown: 0
            };
        },
        methods: {
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown;
            },
            showAlert() {
                this.dismissCountDown = this.dismissSecs;
            },
            submitForm() {
                var browserURL = window.location;
                var data = {
                    embeds: [
                        {
                            description: this.user_message,
                            timestamp: new Date().toISOString(),
                            fields: [
                                {
                                    name: "Name",
                                    value: this.user_name,
                                    inline: true
                                },
                                {
                                    name: "E-Mail",
                                    value: this.user_email,
                                    inline: true
                                }
                            ],
                            footer: {
                                text: browserURL.origin
                            }
                        }
                    ]
                };
                webhook("", data);
                this.showAlert();
                this.user_name = "";
                this.user_email = "";
                this.user_message = "";
                this.form_type = "";
            }
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