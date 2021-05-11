<template>
  <div class="about">
    <section class="card about-card">
      <img
        v-if="!isMobile"
        src="@/assets/getbooked_logo.png"
        alt="logo"
        class="logo"
      />

      <div class="card-title">About Us</div>
      <section
        class="subsection"
        v-for="(section, index) of aboutSections"
        :key="index"
      >
        <h3 class="section-title">
          <i>{{ section.title }}</i>
        </h3>
        <p>
          <i>{{ section.text }}</i>
        </p>
      </section>
    </section>
    <section class="card team-card">
      <h2 class="card-title">The Team</h2>
      <section class="subsection">
        <div
          class="team-member"
          v-for="(section, index) of teamMembers"
          :key="index"
        >
          <img :src="section.img" :alt="`${section.name} photo`" class="img" />
          <div class="name">
            {{ section.name }}
          </div>
          <div class="title">
            <i>{{ section.title }}</i>
          </div>
        </div>
      </section>
    </section>
    <section class="card thanks-card">
      <h2 class="card-title">Special thanks</h2>
      <section class="subsection">
        <div
          class="team-member"
          v-for="(section, index) of oldMembers"
          :key="index"
        >
          <img :src="section.img" :alt="`${section.name} photo`" class="img" />
          <div class="name">
            {{ section.name }}
          </div>
          <div class="title">
            <i>{{ section.title }}</i>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { isMobileDevice } from '@/utilities'
export default Vue.extend({
  name: 'About',
  data() {
    return {
      aboutSections: [
        {
          title: 'Inception',
          text:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum totam quo repudiandae possimus dicta eveniet, numquam placeat deleniti assumenda, quod facere eos quaerat voluptatem officiis accusamus sint. Et, suscipit at.',
        },
        {
          title: 'Vision',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
        },
        {
          title: 'Mission',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
        },
      ],
      teamMembers: [
        {
          name: 'Adilah Hassan',
          title: 'Head',
          img: require('@/assets/getbooked_logo.png'),
        },
        {
          name: 'Sarah Yusman',
          title: 'Vice-Head',
          img: require('@/assets/getbooked_logo.png'),
        },
        {
          name: 'Adilah Hassan',
          title: 'Head',
          img: require('@/assets/getbooked_logo.png'),
        },
        {
          name: 'Sarah Yusman',
          title: 'Vice-Head',
          img: require('@/assets/getbooked_logo.png'),
        },
        {
          name: 'Adilah Hassan',
          title: 'Head',
          img: require('@/assets/getbooked_logo.png'),
        },
        {
          name: 'Sarah Yusman',
          title: 'Vice-Head',
          img: require('@/assets/getbooked_logo.png'),
        },
        {
          name: 'Adilah Hassan',
          title: 'Head',
          img: require('@/assets/getbooked_logo.png'),
        },
        {
          name: 'Sarah Yusman',
          title: 'Vice-Head',
          img: require('@/assets/getbooked_logo.png'),
        },
      ],
      oldMembers: [
        {
          name: 'Adilah Hassan',
          title: '27th NUSMS, 2021',
          img: require('@/assets/getbooked_logo.png'),
        },
        {
          name: 'Sarah Yusman',
          title: 'Coder, 2021',
          img: require('@/assets/getbooked_logo.png'),
        },
        {
          name: 'Sarah Yusman',
          title: 'Coder, 2021',
          img: require('@/assets/getbooked_logo.png'),
        },
      ],
    }
  },
  computed: {
    isMobile() {
      return isMobileDevice()
    },
  },
})
</script>

<style scoped>
.about {
  background-color: white;
  height: 100%;
  padding: 16px;
}
.about .card {
  /* color: black; */
  padding: 16px 27px;
  background-color: #fff9f9;
  box-shadow: 4px 4px 34px -2px rgba(0, 0, 0, 0.25);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-bottom: 20px;
}
.about .card-title {
  margin-top: 10px;
  margin-bottom: 24px;
  padding-right: 0.5rem;
  width: fit-content;
  font-family: Pacifico, 'Open Sans', 'Courier New', Courier, monospace;
  font-size: 2.5rem;
  font-weight: 400;
  color: black;
  line-height: 2.8125rem;
  /* https://stackoverflow.com/questions/43683187/how-can-i-create-custom-underline-or-highlight-for-text-in-html-or-css */
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 50%,
    var(--highlight-yellow) 50%
  );
}
.about .card .logo {
  float: right;
  width: 30%;
  height: 30%;
  display: none;
  margin-top: 20px;
}
.about .card .subsection {
  text-align: start;
  display: block;
}
.about .card .subsection:not(:last-child) {
  margin-bottom: 8px;
}
.about .card .subsection .section-title {
  color: black;
  font-size: 1rem;
  margin: 0;
}

.about .card .subsection p {
  font-size: 0.875rem;
  padding-left: 17px;
  margin-top: 8px;
  line-height: 1.2rem;
}

.about .card .img {
  width: 115px;
  height: 115px;
  border-radius: 999px;
  object-fit: cover;
  object-position: center center;
}

.about .card .team-member .name {
  font-family: Pacifico, 'Open Sans', 'Courier New', Courier, monospace;
  color: black;
  font-size: 1.125rem;
  text-transform: lowercase;
}
.about .card .team-member .title {
  font-size: 0.75rem;
  color: #656565;
}

.about .card.team-card .subsection,
.about .card.thanks-card .subsection {
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
  padding-left: 6px;
}
.about .card.team-card .subsection .team-member,
.about .card.thanks-card .subsection .team-member {
  text-align: center;
  justify-content: center;
  margin: 7px 15px 12px 5px;
}

/* Dekstop Styles */
@media screen and (min-width: 999px) {
  .about .card {
    padding: 24px 40px;
    display: inline-block;
    width: 92%;
  }
  .about .card:first-child {
    margin-top: 12px;
  }
  .about .card-title {
    font-size: 4rem;
    margin-left: 12px;
    line-height: 4.25rem;
    display: block;
  }
  .about .card.about-card .subsection {
    padding-left: 48px;
  }

  .about .card .subsection:not(:last-child) {
    margin-bottom: 24px;
  }

  .about .card .subsection .section-title {
    font-size: 1.5rem;
  }
  .about .card .subsection p {
    font-size: 1.5rem;
    line-height: 1.825rem;
  }
  .about .card .logo {
    display: inline-block;
  }
  .about .card .img {
    width: 225px;
    height: 225px;
  }
  .about .card .team-member .name {
    font-size: 1.8rem;
  }
  .about .card .team-member .title {
    font-size: 1.25rem;
  }

  .about .card.team-card .subsection .team-member,
  .about .card.thanks-card .subsection .team-member {
    margin: 20px 30px 50px 30px;
  }
}
</style>
