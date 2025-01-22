
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { reactive } from "vue";
import './styles.scss';


export const pages:any = reactive({
  data:[
  {
    name:'Busic',
    link:'/src/busic/index.html',
    image:'/images/music.png',
    descr:'Listen offline, download songs, enjoy',
    type:'Js, Node, Socket',
    multi:'Misc',
    year: '2024',
    hint:''
  },
  {
    name:'Bcars',
    link:'https://bingpong.onrender.com',
    image:'/images/cars.png',
    descr:'The simplest of the racing games',
    type:'Js, Node, Socket',
    multi:'Multiplayer',
    year: '2023',
    hint:'Wait for the server to wakeup'
  },
  {
    name:'The cube',
    link:'https://cube-j4t2.onrender.com',
    image:'/images/cube.png',
    descr:'Solve the cuve',
    type:'Vue',
    multi:'Local',
    year: '2023',
    hint:'Wait for the server to wakeup'
  },
  {
    name:'Slaughter defence',
    link:'https://slaughter.onrender.com/',
    image:'/images/slaughter.png',
    descr:'Protect the center from the incoming waves of enemies as long as possible ',
    type:'Vue, Node, Socket',
    multi:'Singleplayer with global rangink',
    year: '2023',
    hint:'Wait for the server to wakeup'
  },
  {
    name:'Boccie',
    link:'https://boccie.onrender.com/',
    image:'/images/boccie.png',
    descr:'Test game',
    type:'Vue',
    multi:'Local',
    year: '2023',
    hint:'Wait for the server to wakeup'
  },
  {
    name:'Blogging',
    link:'https://blogging-cksq.onrender.com/',
    image:'/images/blog.png',
    descr:'Competitive blogging concept',
    type:'Vue, Node, socket',
    multi:'Online multiaccount',
    year: '2023',
    hint:'Wait for the server to wakeup'
  },{
    name:'Palpa FPS',
    link:'https://palpa.onrender.com/',
    image:'/images/palpa.png',
    descr:'First person shooter game',
    type:'Node + socket',
    multi:'Multiplayer',
    year: '2022',
    hint:'Wait for the server to wakeup'
  },{
    name:'Besay',
    link:'https://besay.onrender.com/',
    image:'/images/besay.png',
    descr:'Youtube scraper',
    type:'Vue, Node, socket, firebase',
    multi:'Online multiaccount',
    year: '2021',
    hint:'Wait for the server to wakeup'
  },{
    name:'Img editor',
    link:'/src/modifypics/index.html',
    image:'/images/modify.png',
    descr:'title speaks for itself',
    type:'JS, canvas',
    multi:'',
    year: '2020'
  },{
    name:'Survivor',
    link:'https://surv.onrender.com/',
    image:'/images/surv.png',
    descr: 'Survivor game',
    type:'Vue, canvas',
    multi:'Local',
    year: '2021',
    hint:'Wait for the server to wakeup'
  },{
    name:'Numbers',
    link:'/src/numbers.html',
    image:'/images/numbers.png',
    descr:'Simple logic grid numbers game',
    type:'Vue',
    multi:'Local',
    year: '2021'
  },{
    name:'Voice controller',
    link:'/src/voice.html',
    image:'/images/voice.png',
    descr:'whisper to walk, scream to jump',
    type:'JS',
    multi:'Local',
    year: '2020'
  },{
    name:'Chat',
    link:'https://sbc.onrender.com/',
    image:'/images/chat.png',
    descr:'Encrypted chat',
    type:'Vue, Node, socket',
    multi:'Multi',
    year: '2021',
    hint:'Wait for the server to wakeup'
  },{
    name:'Briscola',
    link:'https://besachat.onrender.com/',
    image:'/images/briscola.png',
    descr:'Italian card game',
    type:'JS + Node + socket',
    multi:'Multiplayer',
    year: '2020',
    hint:'Wait for the server to wakeup'
  },{
    name:'Bcompose',
    link:'https://bcompose.onrender.com/',
    image:'/images/compose.png',
    descr:'Grid numbers logic game',
    type:'Node + socket',
    multi:'Single player, global ranking',
    year: '2021',
    hint:'Wait for the server to wakeup'
  },{
    name:'Bfind',
    link:'https://bfind.onrender.com/',
    image:'/images/find.png',
    descr:'Find differseces between 2 images, multiplayer only',
    type:'Node + socket',
    multi:'Multiplayer',
    year: '2021',
    hint:'Wait for the server to wakeup'
  },{
    name:'Spider',
    link:'/src/spider.html',
    image:'/images/spider.png',
    descr:'Spider solitaire',
    type:'JS',
    multi:'Local singleplayer',
    year: '2020'
  },{
    name:'100 Balls',
    link:'https://besachat.onrender.com/ng',
    image:'/images/100balls.png',
    descr:'Candy crush style game',
    type:'Node + socket',
    multi:'Online singleplayer, global ranking',
    year: '2020',
    hint:'Wait for the server to wakeup'
  },{
    name:'Wiki',
    link:'https://wikigm.onrender.com/',
    image:'/images/cose.png',
    descr:'Wikipedia random questions',
    type:'Vue, Node, socket, firebase',
    multi:'Online singleplayer, global ranking',
    year: '2020',
    hint:'Wait for the server to wakeup'
  },{
    name:'Wiki2',
    link:'/src/wikigame/index.html',
    image:'/images/wiki.png',
    descr:'Wikipedia random words chain game',
    type:'JS',
    multi:'Local singleplayer',
    year: '2018',
  },{
    name:'Vbdesk',
    link:'https://vbdesk.onrender.com',
    image:'/images/vbdesk.png',
    descr:'Vue js desktop workspace',
    type:'Vue, Node, socket, firebase',
    multi:'Online multiaccount',
    year: '2020',
    hint:'Wait for the server to wakeup'
  },{
    name:'Shift',
    link:'/src/shift.html',
    image:'/images/shift.png',
    descr: 'Game of 15',
    type:'JS',
    multi:'Local singleplayer',
    year: '2018',
  },{
    name:'Fastfinger',
    link:'https://fastfinger.onrender.com',
    image:'/images/fastfinger.png',
    descr:'simple game, avoid the balls',
    type:'Node + socket',
    multi:'Online singleplayer',
    year: '2018',
    hint:'Wait for the server to wakeup'
  },{
    name:'Fastbrain',
    link:'https://fastbrain.onrender.com',
    image:'/images/fastbrain.png',
    descr:'Crosswords',
    type:'Node + socket',
    multi:'Online singleplayer, global rankinng',
    year: '2020',
    hint:'Wait for the server to wakeup'
  },{
    name:'Epiletris',
    link:'/src/realtetris/index.html',
    image:'/images/tetris.png',
    descr: 'Strange tetris',
    type:'JS',
    multi:'Local singleplayer',
    year: '2017',
  },{
    name:'Bchess',
    link:'/src/bchess/index.html',
    image:'/images/chess.png',
    descr:'simple chess game, with stupid AI (elo 500)',
    type:'JS',
    multi:'Local singleplayer',
    year: '2017',
  },{
    name:'Geometry',
    link:'/src/geometria/index.html',
    image:'/images/geo.png',
    descr:'Eucliedeann geometry draw',
    type:'JS, canvas',
    multi:'Local',
    year: '2016',
  },{
    name:'Strategy',
    link:'/src/strategy/index.html',
    image:'/images/strategy.png',
    descr:'Strategy game',
    type:'JS, canvas',
    multi:'Local singleplayer',
    year: '2019',
  },{
    name:'TD',
    link:'/src/td.html',
    image:'/images/td.png',
    descr:'Simple tower defense game',
    type:'JS',
    multi:'Local singleplayer',
    year: '2018',
  },{
    name:'Carpet',
    link:'/src/carpet.html',
    image:'/images/carpet.png',
    descr:'Generate random backgrounds, mobile format',
    type:'JS, canvas',
    multi:'Local',
    year: '2019',
  },]
});



const app = createApp(App)

app.use(createPinia())

app.mount('#app')
