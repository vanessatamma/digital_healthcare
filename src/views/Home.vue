<script setup lang="ts">
import Navbar from "@/components/shared/Navbar.vue";

</script>

<template>
  <main class="home">
    <section class="section site-portfolio">
      <div class="container">
        <Navbar />
        <div id="portfolio-grid" class="row no-gutter" data-aos="fade-up" data-aos-delay="200">
          <div class="item web col-sm-6 col-md-6 col-lg-6 mb-4">
            <a href="work-single.html" class="item-wrap fancybox">
              <div class="work-info">
                <h3>Boxed Water</h3>
                <span>Web</span>
              </div>
              <img class="img-fluid" src="https://images.unsplash.com/photo-1679238757336-a001691abb5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80">
            </a>
          </div>
          <div class="item photography col-sm-6 col-md-6 col-lg-6 mb-4">
            <a href="work-single.html" class="item-wrap fancybox">
              <div class="work-info">
                <h3>Build Indoo</h3>
                <span>Photography</span>
              </div>
              <img class="img-fluid" src="https://images.unsplash.com/photo-1679238757336-a001691abb5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80">
            </a>
          </div>
          <div class="item branding col-sm-6 col-md-6 col-lg-6 mb-4">
            <a href="work-single.html" class="item-wrap fancybox">
              <div class="work-info">
                <h3>Cocooil</h3>
                <span>Branding</span>
              </div>
              <img class="img-fluid" src="https://images.unsplash.com/photo-1679238757336-a001691abb5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80">
            </a>
          </div>
          <div class="item design col-sm-6 col-md-6 col-lg-6 mb-4">
            <a href="work-single.html" class="item-wrap fancybox">
              <div class="work-info">
                <h3>Nike Shoe</h3>
                <span>Design</span>
              </div>
              <img class="img-fluid" src="https://images.unsplash.com/photo-1679238757336-a001691abb5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80">
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
