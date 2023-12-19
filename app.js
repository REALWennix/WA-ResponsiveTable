Vue.component('timetable', {
    props: ['days', 'periods', 'timetable'],
    template: `
         <div class="timetable">
    <table cellspacing="2" summary="">
      <thead>
        <tr>
          <th></th>
          <th v-for="period in periods" :key="period.number" class="period">
            {{ period.number }}
            <span class="time">{{ period.time }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="day in days" :key="day">
          <th class="day">{{ day }}</th>
          <td v-for="period in periods" :key="period.number">
            <div v-if="timetable[day] && timetable[day][period.number]" v-for="lesson in timetable[day][period.number]" :key="lesson.subject" class="lesson1" :class="{'lessonFirst': lesson.lessonFirst}">
              {{ console.log('timetable:', timetable, 'day:', day, 'period.number:', period.number) }}
              <div class="lesson-info">
                <a class="room" :href="'/ucebna/' + lesson.room" :title="'Učebna '+ lesson.room" @click.prevent="handleLinkClick(lesson, 'room')">
                  {{ lesson.room }}
                </a>
                <a class="employee" :href="'/ucitel/' + lesson.teacher" :title="lesson.teacherName" @click.prevent="handleLinkClick(lesson)">
                  {{ lesson.teacher }}
                </a>
              </div>
              <span class="subject" :title="lesson.subjectName">{{ lesson.subject }}</span>
              <div class="class-group">
                <span class="class" v-if="lesson.class" :title="'Třída ' + lesson.class">{{ lesson.class }}</span>
                <span class="group" v-if="lesson.group" :title="'Pouze pro část třídy označenou jako ' + lesson.group">{{ lesson.group }}</span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
    `

});


new Vue({
    el: "#app",
    data: {
        days: ["Po", "Út", "St", "Čt", "Pa"],
        periods: [{
            number: "1",
            time: "7:30 - 8:15",
        }, {
            number: "2",
            time: "8:25 - 9:10",
        }, {
            number: "3",
            time: "9:20 - 10:05",
        }, {
            number: "4",
            time: "10:20 - 11:05",
        }, {
            number: "5",
            time: "11:15 - 12:00",
        }, {
            number: "6",
            time: "12:10 - 12:55",
        }, {
            number: "7",
            time: "13:05 - 13:50",
        }, {
            number: "8",
            time: "14:00 - 14:45",
        }, {
            number: "9",
            time: "14:55 - 15:40",
        }, {
            number: "10",
            time: "15:50 - 16:35",
        }],
        timetable: {},
    },
    mounted() {
        console.log("Vue app mounted");
        this.loadTimetableData();
    },
    methods: {
        async loadTimetableData() {
            try {
                const response = await fetch("timetable-data.json");

                if (!response.ok) {
                    throw new Error(`Failed to load timetable data: ${response.status}`);
                }

                const data = await response.json();
                this.timetable = data;
            } catch (error) {
                console.error("Error loading timetable data:", error.message);
            }
        },

        handleLinkClick(lesson) {
            const error = new Error(`Not Found: ${lesson.subject}`);
            error.status = 404;
            throw error;
        },
    },
});
