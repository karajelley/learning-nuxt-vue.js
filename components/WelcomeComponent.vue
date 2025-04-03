<template>
  <div class="welcome-container">
  <!-- Brand Logo -->
    <div class="logo">
      <img src="~/assets/logo_title.svg" alt="Auxicare Logo" class="logo-img" />
    </div>

    <!-- Description Section -->
    <div class="description">
      <h1>Home help as we imagine it!</h1>
      <p>
       At Auxicare, our experienced and fulfilled assistants adapt to your desires and needs.
      </p>
    </div>

    <!-- Make a request Button -->
    <div class="make-request">
      <button  class="primary-button" @click="goToMakeRequest">Make a request</button>
      <h3>Free and without obligation</h3>
    </div>
    <div class="buttons">
        <NuxtLink to="/about-us">
            <button class="secondary-button">About Us</button>
        </NuxtLink>
        <NuxtLink to="/contact">
            <button class="secondary-button">Contact</button>
        </NuxtLink>
                <NuxtLink to="/find-address">
            <button class="secondary-button">Find 🔍</button>
        </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomeComponent',
  methods: {
    goToMakeRequest() {
      window.location.href = 'https://www.auxicare.fr';
    }
  }
}
</script>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f9f9f9;
  text-align: center;
}

.logo-img {
  width: 150px;
  height: auto;
}

.description {
  margin-top: 20px;
}

h1 {
  font-size: 32px;
  font-weight: bold;
  color: var(--accent-primary-1);
  margin-bottom: 10px;
}

h3 {
  font-size: 20px;
  font-weight: bold;
  color: #8d8d9b;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  color: #555;
  line-height: 1.5;
}

.learn-more {
  margin-top: 20px;
}

</style>
