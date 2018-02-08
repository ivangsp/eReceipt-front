<template>
  <div class="landingPage">
    <nav class="black" role="navigation">
      <div class="nav-wrapper container"><a id="logo-container" href="#" class="brand-logo" >
        <img src="../assets/logo.svg" width="220px" height="125px"></a>
        <ul class="right hide-on-med-and-down">
          <li><a href="#">Sign in</a></li>
          <li><a href="#">Sign up</a></li>
          <li><a href="#">Contact us</a></li>
          <li><a href="#">About us</a></li>
        </ul>

        <ul id="nav-mobile" class="side-nav">
          <li><a href="#">Navbar Link</a></li>
        </ul>
        <a href="#111111" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
      </div>
    </nav>
    <div>
      <div class="section no-pad-bot" id="index-banner">
        <div class="container">
          <br><br>
          <h1 class="header center orange-text"><img src = "../assets/surat.png"></h1>
          <div class="row center">
            <h5 id="yleoba" class="header col s12 light" > Search your receipts digitally</h5>
          </div>
          <div class="row center">
            <a id="download-button"  class="btn-large waves-effect waves-light" >Get Started</a>
          </div>
          <br><br>

        </div>
      </div>

      <div class="container">
        <div class="section">

          <!--   Icon Section   -->
          <div class="row">
            <div class="col s12 m4">
              <div class="icon-block">
                <h2 class="center light-blue-text"><i class="material-icons">flash_on</i></h2>
                <h5 class="center">Save trees, Go green</h5>

                <p class="light">We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
              </div>
            </div>

            <div class="col s12 m4">
              <div class="icon-block">
                <h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
                <h5 class="center">Digitalize Your Receipts</h5>

                <p class="light">By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p>
              </div>
            </div>

            <div class="col s12 m4">
              <div class="icon-block">
                <h2 class="center light-blue-text"><i class="material-icons">settings</i></h2>
                <h5 class="center">Analyze Your Spending</h5>

                <p class="light">lorem ipsum</p>
              </div>
            </div>
          </div>

        </div>
        <br><br>
      </div>
    </div>

    <footer class="page-footer black fixed">
      <div class="container">
        <div class="row">
          <div class="col l6 s12">
            <h5 class="white-text">Company Bio</h5>
            <p class="grey-text text-lighten-4">We are a team of college students working on this project like it's our full time job. Any amount would help support and continue development on this project and is greatly appreciated.</p>


          </div>
          <div class="col l3 s12">
            <h5 class="white-text">Settings</h5>
            <ul>
              <li><a class="white-text" href="#!">Link 1</a></li>
              <li><a class="white-text" href="#!">Link 2</a></li>
              <li><a class="white-text" href="#!">Link 3</a></li>
              <li><a class="white-text" href="#!">Link 4</a></li>
            </ul>
          </div>
          <div class="col l3 s12">
            <h5 class="white-text">Connect</h5>
            <ul>
              <li><a class="white-text" href="#!">Link 1</a></li>
              <li><a class="white-text" href="#!">Link 2</a></li>
              <li><a class="white-text" href="#!">Link 3</a></li>
              <li><a class="white-text" href="#!">Link 4</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-copyright">
        <div class="container">
          Made by <a class="orange-text text-lighten-3" href="http://materializecss.com">eReceipt</a>
          <ul>
            <li>Nikoloz Kalandarishvili</li>
            <li>Mason Michalec</li>
            <li>Carola Kesküla</li>
            <li>Eliisa Ülevain</li>
            <li>on” Zvorovski</li>
            <li>Maksym Melnyk</li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import AuthenticationPage from './Authentication'
  export  default {

    components:{AuthenticationPage},

    data(){
      return{
        visible: true
      }
    },

    methods:{
      displayAuthenticationPage(){
        this.visible = false;
        console.log("visible", this.visible);
      }
    }
  }
</script>

<style>
  .landingPage {
    background: url("../assets/back_gr.jpg");
    background-size: 120%;
    background-repeat: no-repeat;
  }

  .icon-block {
    padding: 0 15px;
  }
  .icon-block .material-icons {
    font-size: inherit;
  }

  .brand-logo{
    position: relative;
    top:-30px;
    left: 0px;
  }

  #download-button{

    background-color: #4891d9;
  }

  #yleoba{

    color: rgb(68, 123, 224);
  }
</style>
