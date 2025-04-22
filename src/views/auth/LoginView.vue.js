"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
var auth_1 = require("@/stores/auth");

exports.default = (0, vue_1.defineComponent)({
    name: 'LoginView',
    setup: function () {
        var route = (0, vue_router_1.useRoute)();
        var router = (0, vue_router_1.useRouter)();
        var authStore = (0, auth_1.useAuthStore)();

        var email = (0, vue_1.ref)('');
        var password = (0, vue_1.ref)('');
        var rememberMe = (0, vue_1.ref)(false);
        var loading = (0, vue_1.ref)(false);
        var errorMessage = (0, vue_1.ref)('');

        var handleSubmit = function () {
            if (!email.value || !password.value) {
                errorMessage.value = 'Please enter both email and password';
                return;
            }

            loading.value = true;
            errorMessage.value = '';

            authStore.login(email.value, password.value)
                .then(function (success) {
                    if (success) {
                        var redirectPath = route.query.redirect || '/admin';
                        router.push(redirectPath);
                    } else {
                        errorMessage.value = authStore.error || 'Login failed';
                    }
                })
                .catch(function (error) {
                    console.error('Login error:', error);
                    errorMessage.value = 'An unexpected error occurred';
                })
                .finally(function () {
                    loading.value = false;
                });
        };

        return {
            email: email,
            password: password,
            rememberMe: rememberMe,
            loading: loading,
            errorMessage: errorMessage,
            handleSubmit: handleSubmit
        };
    }
});
