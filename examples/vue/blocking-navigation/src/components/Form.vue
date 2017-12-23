<template>
  <p v-if="submitted">Thanks for contacting us!</p>
  <form v-else>
    <curi-block :active="dirty" :confirm="confirm" />
    <p>
      <label>
        Email <input type='text' v-model="email" />
      </label>
    </p>
    <p>
      <label>
        Message <input type='text' v-model="message"  />
      </label>
    </p>
    <button type='button' v-on:click="submitForm">Submit</button>
  </form>
</template>

<script>
  function confirm(info, success, failure) {
    const resp = window.confirm('Are you sure you want to navigate? The form has not been submitted');
    if (resp) {
      success();
    } else {
      failure();
    }
  }

  export default {
    name: 'form',
    data: function() {
      return {
        email: '',
        message: '',
        submitted: false
      };
    },
    computed: {
      dirty: function() {
        return this.email !== '' || this.message !== '';
      }
    },
    methods: {
      submitForm($event) {
        if (this.email === '' || this.message === '' ) {
          return;
        }
        this.submitted = true;
      },
      confirm
    }
  }
</script>