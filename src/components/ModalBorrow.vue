<template>
  <div class="borrow-form">
    <Overlay class="form-overlay" @click.native="$emit('close')" />
    <div class="container">
      <header class="escape">
        <button class="button" @click="$emit('close')">x</button>
      </header>
      <div class="action">Borrowing the Book:</div>
      <div class="book-title">
        <i>{{ title }}</i>
      </div>
      <section class="form" v-if="!isSendingRequest && !isRequestSent">
        <div class="instructions">Enter your Telegram Username</div>
        <div
          class="input-box"
          :class="{
            'is-registered': isRegistered && !isLoading,
            'is-error':
              !isRegistered && !isLoading && username.trim().length != 0,
          }"
        >
          <span class="prefix">@</span>
          <input
            @keydown="
              isLoading = true
              verifyUser()
            "
            v-model="username"
            type="text"
            placeholder="username"
          />
          <span class="suffix">
            <img
              src="@/assets/Verified - unknown.svg"
              alt="No input detected"
              :class="{ 'is-visible': username.trim().length == 0 }"
            />
            <img
              src="@/assets/loading.svg"
              alt="Verifying user"
              :class="{
                'is-visible': isLoading && username.trim().length > 0,
              }"
              class="loader"
            />
            <img
              src="@/assets/Verified - false.svg"
              alt="User is not registered"
              :class="{
                'is-visible':
                  username.trim().length != 0 && !isRegistered && !isLoading,
              }"
            />
            <img
              src="@/assets/Verified - true.svg"
              alt="User is registered"
              :class="{ 'is-visible': isRegistered && !isLoading }"
            />
          </span>
        </div>
        <button
          @click="requestToBorrow"
          class="borrow-btn"
          :disabled="!isRegistered || isLoading"
        >
          Request
        </button>
        <div class="footer">
          Haven't registered?
          <a
            href="https://telegram.me/getbooked_bot"
            target="_blank"
            rel="noopener"
            >Register Now!</a
          >
        </div>
      </section>
      <section class="sending-in-progress" v-else-if="!isRequestSent">
        <div>Beaming you the secret code via Telegram @getbooked_bot</div>
        <div class="sending-container">
          <div class="box">
            <div class="border one"></div>
            <div class="border two"></div>
            <div class="border three"></div>
            <div class="border four"></div>

            <div class="line one"></div>
            <div class="line two"></div>
            <div class="line three"></div>
          </div>
        </div>
      </section>
      <section class="sending-complete" v-else>
        <div class="confirmation-text">Code sent via Telegram!</div>
        <div>Do reply @getbooked_bot to confirm your loan</div>
        <div>
          <img
            class="confirmation-svg"
            src="@/assets/Verified - true.svg"
            alt=""
          />
        </div>
        <div class="footer">You may now close this prompt</div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Overlay from './Overlay.vue'
import debounce from 'lodash.debounce'
import BorrowForm from './ModalBorrow.vue'
import { mapActions } from 'vuex'
import { ActionType } from '@/store/types'
import { BorrowParams } from 'functions/lib/types'
export default Vue.extend({
  name: 'ModalBorrow',
  components: {
    Overlay,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    bookListingId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      username: '',
      isRegistered: false,
      isLoading: false,
      isRequestSent: false,
      isSendingRequest: false,
    }
  },
  methods: {
    ...mapActions({
      isUserValid: ActionType.VERIFY_USER,
      borrowBook: ActionType.BORROW_BOOK,
    }),
    verifyUser: debounce(async function (
      this: InstanceType<typeof BorrowForm>,
    ) {
      this.isRegistered = await this.isUserValid(this.username)
      this.isLoading = false
    },
    1000),
    async requestToBorrow() {
      this.isSendingRequest = true
      const borrowParams: BorrowParams = {
        username: this.username,
        bookListingId: this.bookListingId,
        bookTitle: this.title,
      }
      this.isRequestSent = await this.borrowBook(borrowParams)
      this.isSendingRequest = false
    },
  },
})
</script>

<style scoped>
.borrow-form {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100vw;
  top: 0;
}
.escape {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  justify-content: flex-end;
  margin: 0.4rem 0.5rem 0 0;
}

.escape .button {
  display: block;
  background-color: whitesmoke;
  border: none;
  font-size: 1rem;
  color: rgb(105, 105, 105);
  transition: 0.2ms ease-in-out;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  cursor: pointer;
}
.escape .button:hover,
.escape .button:active {
  color: black;
}

.container {
  position: relative;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  width: 65%;
  padding: 30px 40px 70px 40px;
  padding-bottom: 70px;

  border-radius: 6px;
  box-shadow: 3px 4px 6px 3px rgba(0, 0, 0, 0.1225);
  letter-spacing: 0.085em;
  z-index: 10;
}

.container .action {
  margin-bottom: 8px;
}
.container .book-title {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 32px;
}

.container .footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: 14px;
  font-size: 0.8rem;
  font-weight: 300;
}

.container .footer a {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 38%,
    var(--highlight-yellow) 38%
  );
  font-weight: bold;
  text-decoration: none;
  color: black;
}

.container .form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.container .form .instructions {
  font-size: 0.8rem;
  margin-bottom: 8px;
}

/* Input Box prefix: https://www.30secondsofcode.org/css/s/input-with-prefix */
.input-box {
  display: flex;
  align-items: center;
  align-self: center;
  background: #fff;
  border: 1px solid #a0a0a0;
  border-radius: 6px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  overflow: hidden;
}
.input-box .prefix {
  font-weight: 300;
  color: #999;
  line-height: 1rem;
}
.input-box input {
  flex-grow: 1;
  background: #fff;
  border: none;
  outline: none;
  padding: 0.5rem;
}
.input-box:focus-within {
  border-color: var(--info-light);
  border-width: 2px;
}
.input-box.is-registered:focus-within {
  border-color: var(--success-light);
}
.input-box.is-error:focus-within {
  border-color: var(--error-light);
}

.input-box .suffix {
  display: flex;
  align-items: center;
  width: 1rem;
}
.input-box .suffix img {
  position: absolute;
  width: 1rem;
  opacity: 0;
  transition: 1s;
}

.input-box .suffix img.is-visible {
  opacity: 1;
}
.input-box .suffix img.loader {
  animation: rotateLoader 1.6s linear infinite;
}

@keyframes rotateLoader {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}

.borrow-form .container .borrow-btn {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: var(--highlight-blue);
  align-self: center;
  border: 2px solid #000000;
  border-radius: 8px;
  font-weight: 900;
  line-height: 26px;
  font-size: 1.3rem;
  text-align: center;
  letter-spacing: 0.05em;
  color: var(--primary-orange);
  -webkit-text-stroke: 1px black;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  position: relative;
}
.borrow-form .container .borrow-btn:disabled {
  cursor: default;
  background-color: lightgray;
  color: lightgray;
  border-color: rgb(175, 175, 175);
  -webkit-text-stroke: 1px grey;
}

.sending-complete div {
  padding: 6px 0;
  font-size: 0.9rem;
  font-weight: 500;
}
.sending-complete div img {
  margin: 10px 0;
  width: 80px;
  margin: 25px 0 0;
}

.sending-complete div.footnote {
  font-weight: 300;
}

/* Desktop Styles */
@media screen and (min-width: 999px) {
  .escape .button {
    font-size: 1.5rem;
  }
  .container {
    width: 33%;
    padding: 35px 30px 80px 30px;
    border-radius: 12px;
  }
  .container .action {
    font-size: 1.5rem;
  }
  .container .book-title {
    font-size: 1.75rem;
    margin-bottom: 32px;
  }

  .form-overlay {
    margin-top: 24px;
  }
  .input-box {
    padding-left: 1rem;
    font-size: 1.5rem;
  }
  .input-box input {
    font-size: 1.5rem;
  }
  .borrow-form .container .borrow-btn {
    font-size: 1.5rem;
    padding: 0.5rem 1.25rem;
  }
  .container .form .instructions {
    font-size: 1.1rem;
    margin-bottom: 8px;
  }
  .container .footer {
    font-size: 1rem;
    margin-bottom: 16px;
  }
  .sending-in-progress {
    font-size: 1.125rem;
  }
  .sending-complete div.confirmation-text {
    font-size: 1.5rem;
  }
  .sending-complete div img.confirmation-svg {
    width: 150px;
    margin: 30px 0 0;
  }
}

/* Codepen Sending Animations */
/* https://codepen.io/mly-zju/pen/vOaYjz */
.sending-container {
  height: 50px;
  width: 40px;
  position: relative;
  margin: 45px auto 0;
}

.sending-container .box {
  position: relative;
  height: 50px;
  width: 40px;
  animation: box 3s infinite linear;
}

.sending-container .border {
  background: var(--info-light);
  position: absolute;
}

.sending-container .border.one {
  height: 4px;
  top: 0;
  left: 0;
  animation: border-one 3s infinite linear;
}

.sending-container .border.two {
  top: 0;
  right: 0;
  height: 100%;
  width: 4px;
  animation: border-two 3s infinite linear;
}

.sending-container .border.three {
  bottom: 0;
  right: 0;
  height: 4px;
  width: 100%;
  animation: border-three 3s infinite linear;
}

.sending-container .border.four {
  bottom: 0;
  left: 0;
  height: 100%;
  width: 4px;
  animation: border-four 3s infinite linear;
}

.sending-container .line {
  height: 4px;
  position: absolute;
  width: 0%;
  left: 25%;
}

.sending-container .line.one {
  top: 25%;
  width: 0%;
  animation: line-one 3s infinite linear;
  background: var(--error-light);
}

.sending-container .line.two {
  top: 45%;
  animation: line-two 3s infinite linear;
  background: var(--pending-light);
}

.sending-container .line.three {
  top: 65%;
  animation: line-three 3s infinite linear;
  background: var(--success-light);
}

@keyframes border-one {
  0% {
    width: 0;
  }
  10% {
    width: 100%;
  }
  100% {
    width: 100%;
  }
}

@keyframes border-two {
  0% {
    height: 0;
  }
  10% {
    height: 0%;
  }
  20% {
    height: 100%;
  }
  100% {
    height: 100%;
  }
}

@keyframes border-three {
  0% {
    width: 0;
  }
  20% {
    width: 0%;
  }
  30% {
    width: 100%;
  }
  100% {
    width: 100%;
  }
}

@keyframes border-four {
  0% {
    height: 0;
  }
  30% {
    height: 0%;
  }
  40% {
    height: 100%;
  }
  100% {
    height: 100%;
  }
}

@keyframes line-one {
  0% {
    left: 25%;
    width: 0;
  }
  40% {
    left: 25%;
    width: 0%;
  }
  43% {
    left: 25%;
    width: 50%;
  }
  52% {
    left: 25%;
    width: 50%;
  }
  54% {
    left: 25%;
    width: 0%;
  }
  55% {
    right: 25%;
    left: auto;
  }
  63% {
    width: 10%;
    right: 25%;
    left: auto;
  }
  100% {
    width: 10%;
    right: 25%;
    left: auto;
  }
}

@keyframes line-two {
  0% {
    width: 0;
  }
  42% {
    width: 0%;
  }
  45% {
    width: 50%;
  }
  53% {
    width: 50%;
  }
  54% {
    width: 0%;
  }
  60% {
    width: 50%;
  }
  100% {
    width: 50%;
  }
}

@keyframes line-three {
  0% {
    width: 0;
  }
  45% {
    width: 0%;
  }
  48% {
    width: 50%;
  }
  51% {
    width: 50%;
  }
  52% {
    width: 0%;
  }
  100% {
    width: 0%;
  }
}

@keyframes box {
  0% {
    opacity: 1;
    margin-left: 0px;
    height: 50px;
    width: 40px;
  }
  55% {
    margin-left: 0px;
    height: 50px;
    width: 40px;
  }
  60% {
    margin-left: 0px;
    height: 35px;
    width: 50px;
  }
  74% {
    msthin-left: 0;
  }
  80% {
    margin-left: -50px;
    opacity: 1;
  }
  90% {
    height: 35px;
    width: 50px;
    margin-left: 50px;
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
