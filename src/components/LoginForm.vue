<script>
export default {
  name: "Login-Form",

  data() {
    return {
      name: "",
      email: "",
    };
  },
  validations: {
    name: {
      validate:'required',
      customValidation:{
      fun: (value) => value.length >= 5,
      message: (key, value) =>
        `${key} should have a min length of 5, but got ${value.length}`,
      }
    },
    email: {
      customValidation:{
      fun: (value) => value.length >= 5,
      message: (key) => `${key} must be a valid email`,
      }
    },
  },
  methods: {
    validate(e) {
        this.$v()    
      if (!this.valid) {
        e.preventDefault();
      }
    },
  },
};
</script>
<template>
  <div id="login">
    <form @submit.prevent="validate">
      <div class="m-b-12">
        <label for="name" class="m-r-12">Name:</label>
        <input v-model="name" type="text" id="name" name="name" @input="$onChange('name')"/>
        <div v-if="!valid" class="text-red"> {{errors.name}}</div>
      </div>
      <div class="m-b-12">
        <label for="email" class="m-r-12">Email:</label>
        <input v-model="email" type="email" id="email" name="email" @input="$onChange('email')"/>
        <div v-if="!valid" class="text-red"> {{errors.email}}</div>
      </div>
      <button type="submit" :disabled="!valid">Submit</button>
    </form>
  </div>
</template>
<style scoped>
.m-b-12 {
  margin-bottom: 12px;
}
.m-r-12 {
  margin-right: 12px;
}
.text-red
{
    color: red;
}
</style>
