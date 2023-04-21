<template>
    <main class="app">
        <section class="greeting">
            <h2 class="title">
                Olá, <input type="text" placeholder="Digite seu nome aqui" v-model="name" />
            </h2>
        </section>

        <section class="create-todo">
            <h3>CRIAR TAREFA</h3>

            <form @submit.prevent="addTodo">
                <h4>Nome da tarefa:</h4>
                <input type="text" placeholder="ex: criar um App de Tarefas em VueJS" v-model="input_content" />
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
                <input type="submit" value="Criar Tarefa" />
            </form>
        </section>

        <section class="todo-list">
            <h3>Tarefas Criadas</h3>
            <div class="list">
                <div :class="`todo-item ${todo.done && 'done'}`" v-for="todo in todos_asc" :key="todo">
                    <label>
                        <input type="checkbox" v-model="todo.done" />
                        <span :class="`bubble ${todo.category}`"></span>
                    </label>

                    <div class="todo-content">
                        <input type="text" v-model="todo.content" />
                    </div>

                    <div class="actions">
                        <router-link :to="'/editar/' + todo.content" class="edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                            Editar
                        </router-link>
                        <button class="delete" @click="removeTodo(todo)">Remover</button>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
    import { ref, onMounted, computed, watch } from 'vue'

    const todos = ref([])
    const name = ref('')

    const input_content = ref('')
    const input_description = ref('')
    const input_category = ref(null)

    // obtendo os todos em ordem decrescente
    const todos_asc = computed(() => todos.value.sort((a, b) => {
        return b.created_at - a.created_at
    }))

    // adicionando um todo
    const addTodo = () => {
        if (input_content.value.trim() === '' || input_description.value.trim() === '' || input_category.value === null) {
            return
        }
        
        todos.value.push({
            content: input_content.value,
            description: input_description.value,
            category: input_category.value,
            done: false,
            created_at: new Date().getTime()
        })

        input_content.value = ''
        input_description.value = ''
        input_category.value = null
    }

    const removeTodo = todo => {
        todos.value = todos.value.filter(t => t !== todo)
    }

    watch(todos, newVal => {
        localStorage.setItem('todos', JSON.stringify(newVal))
    }, { deep: true })

    watch(name, (newVal) => {
        localStorage.setItem('name', newVal)
    })

    onMounted(() => {
        name.value = localStorage.getItem('name') || ''
        todos.value = JSON.parse(localStorage.getItem('todos')) || []
    })
</script>