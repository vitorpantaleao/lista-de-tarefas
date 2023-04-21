<template>
    <main class="app">
        <section class="greeting">
            <h2 class="title">
                Olá, {{ userStore.name ? userStore.name : nameEdit }}
            </h2>
        </section>

        <section class="create-todo">
            <h3>EDITANDO TAREFA: <strong> {{ $route.params.id }} </strong></h3>

            <form @submit.prevent="editTodo">
                <h4>Nome da tarefa:</h4>
                <input type="text" placeholder="ex: criar um App de Tarefas em VueJS" v-model="input_name" />
                <h4>Descrição:</h4>
                <input type="text" placeholder="ex: Criar um app de tarefas usando o VueJS 3 e Pinia, usando boas ..." v-model="input_description" />
                <h4>Escolha uma categoria</h4>
                <div class="options">
                    <label>
                        <input type="radio" name="category" value="business" v-model="input_category" />
                        <span class="bubble business"></span>
                        <div>Trabalho</div>
                    </label>
                    <label>
                        <input type="radio" name="category" value="personal" v-model="input_category" />
                        <span class="bubble personal"></span>
                        <div>Pessoal</div>
                    </label>
                    <label>
                        <input type="radio" name="category" value="other" v-model="input_category" />
                        <span class="bubble other"></span>
                        <div>Outros</div>
                    </label>
                </div>
                <input type="submit" value="Salvar Tarefa" />
            </form>
            <router-link to="/" class="cancel">Voltar</router-link>
        </section>
    </main>
</template>

<script>
    import { useUserStore } from '../store/UserStore'

    export default {
        name: 'Editar',
        data() {
            return {
                userStore: useUserStore(),
                nameEdit: localStorage.getItem('name'),
                input_name: '',
                input_description: '',
                input_category: null,
                todos: [],
                paramsId: null,
            }
        },

        created() {
            this.todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
            this.paramsId = this.$route.params.id

            // obtem o todo pelo id
            const todo = this.todos.find(todo => todo.id == this.paramsId)
            this.input_name = todo.name
            this.input_description = todo.description
            this.input_category = todo.category
        },

        methods: {
            editTodo() {
                const todo = {
                    id: this.paramsId,
                    name: this.input_name,
                    description: this.input_description,
                    category: this.input_category,
                }

                // obtem o index do todo pelo id
                const index = this.todos.findIndex(todo => todo.id == this.paramsId)

                // atualiza o todo
                this.todos.splice(index, 1, todo)

                // salva no localStorage
                localStorage.setItem('todos', JSON.stringify(this.todos))

                // redireciona para a página de listagem
                this.$router.push('/')
            },
        },
    }
</script>

<style scoped>
    .app {
        margin-top: 2rem;
    }
</style>