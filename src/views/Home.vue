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
    </main>
</template>

<script setup>
    import { ref, onMounted, computed, watch } from 'vue'

    const todos = ref([])
    const name = ref('')

    const input_content = ref('')
    const input_description = ref('')
    const input_category = ref(null)

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
</script>