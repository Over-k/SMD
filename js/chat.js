// show the chat  if u have multiple friends in chat 
var chat = document.querySelectorAll(".chats .content");
chat.forEach(item => {
  item.addEventListener("click", event => {       item.parentElement.querySelector(".chatbox").classList.toggle("hidden");
     item.querySelector(".switch i").classList.toggle("fa-times");
     setTimeout(() => {
    document.querySelector("#botStarterMessage span").innerHTML ="Start chat with me.";
    },500);
   });
 });
//only chat bot 
//....
//send text 
var btnsend = document.querySelectorAll(".input button");
btnsend.forEach(item => {
  item.addEventListener("click", event => {
    texthere = item.parentElement.parentElement.parentElement;
    var userText = texthere.querySelector("#textInput").value;
    if (userText == "") {
      userText = "I love Code Palace!";
    }
    let p1 = document.createElement("p");
    p1.setAttribute("class", "userText");
    let span1 = document.createElement("span");
    span1.innerHTML = userText;
    p1.appendChild(span1);
    texthere.querySelector("#chatbox").appendChild(p1);
    texthere.querySelector("#textInput").value = '';
    let p = document.createElement("p");
    p.setAttribute("class", "botText");
    let span = document.createElement("span");
    span.innerHTML = botResponse(userText.toLowerCase());
    p.appendChild(span);
    texthere.querySelector("#chatbox").appendChild(p);
    var scroll = texthere.querySelector("#chatbox");
    scroll.scrollTop = scroll.scrollTop + 80;
  });
});
//simple answers
var options = "I am a general purpose chatbot. My capabilities are : I can chat with you. Try asking me for jokes   . Thank you!! ",
  no = "ok",
  song = "....",
  suggest = "Please mail your suggestions to suggestions@gmail.com. Thank you for helping me improve!",
  chatinfo = "I was made by 'Khalid ait miloud' in 2020, if that's what you are asking!",
  whatsup = "All good..What about you?",
  jokes = ["A perfectionist walked into a bar...apparently, the bar wasn't set high enough", "I ate a clock yesterday, it was very time-consuming", "Never criticize someone until you've walked a mile in their shoes. That way, when you criticize them, they won't be able to hear you from that far away. Plus, you'll have their shoes.", "The world tongue-twister champion just got arrested. I hear they're gonna give him a really tough sentence.", "I own the world's worst thesaurus. Not only is it awful, it's awful.", "What did the traffic light say to the car? \"Don't look now, I'm changing.\"", "What do you call a snowman with a suntan? A puddle.", "How does a penguin build a house? Igloos it together", "I went to see the doctor about my short-term memory problems – the first thing he did was make me pay in advance", "As I get older and I remember all the people I’ve lost along the way, I think to myself, maybe a career as a tour guide wasn’t for me.", "o what if I don't know what 'Armageddon' means? It's not the end of the world."];
const Responses = {
  hi: "Hello",
  hello: "Hi there, how can I help?",
  bye: "Have a nice day.",
  goodbye: "see you later.",
  howyoucouldhelpme: options,
  whatyoucando: options,
  whathelpyouprovide: options,
  howyoucanbehelpful: options,
  whatsupportisoffered: options,
  no: no,
  nope: no,
  topsongs: song,
  bestsongs: song,
  hotsongs: song,
  top10songs: song,
  toptensongs: song,
  youareuseless: suggest,
  useless: suggest,
  suggest: suggest,
  suggestions: suggest,
  youarebad: suggest,
  howoldareyou: chatinfo,
  whenwereyoumade: chatinfo,
  whatisyourage: chatinfo,
  whomadeyou: chatinfo,
  whodesignedyou: chatinfo,
  whoprogrammedyou: chatinfo,
  whatsup: whatsup,
  wazzup: whatsup,
  howareyou: whatsup,
  sup: whatsup,
  howyoudoing: whatsup,
  khalid: "Hi!! I am here.",
  qatari: "Hi my brother Mohammed ."
};
const botResponse = (msg) => {
  if (msg.match(/thank/gi)) {
    return 'My pleasure.';
  }
  if (msg.match(/fuck/gi)) {
    wait();
    return 'Sorry,<br> your account was deactivated (5s).';
  }
  if (msg.match(/jock/gi)) {
    return jokes[Math.floor(Math.random() * jokes.length)];
  }
  if (msg.match(/hack/gi)) {
    hacked();
    return "All account....";
  }
  noanswer = ["Sorry, can't understand you.", "Please give me more info.", "Not sure I understand.", "Talk to you later!"];
  return Responses[msg.replaceAll(' ', '')] || noanswer[Math.floor(Math.random() * noanswer.length)];
};
//im just kidding
function wait() {
  posts = JSON.parse(localStorage.getItem("posts"));
  posts.forEach(data => {
    if (data.author == formData[len].fullname) {
      posts.splice(data.id, 1);
    }
  });
  localStorage.removeItem('i');
  formData.splice(len, 1);
  localStorage.setItem('formData', JSON.stringify(formData));
  localStorage.setItem("posts", JSON.stringify(posts));
  setTimeout(() => {
    location.reload();
  }, 5000);
}

function hacked() {
  formData.forEach(data => {
    reponsacc = `<div class="header">
                <div class="profile-pic" style="background-image:url(${data.img});"></div>
                <div class="detail">
                  <p class="name"><i class="fas fa-user"></i> :  ${data.fullname}</p>
                  <p class="posted"><i class="fas fa-lock"></i> :  ${data.pwd}</p>
                </div>
              </div>`;
    let p = document.createElement("p");
    p.setAttribute('class', "botText");
    let span = document.createElement("span");
    span.innerHTML = reponsacc;
    p.appendChild(span);
    document.querySelectorAll("#chatbox")[0].appendChild(p);
  });
}
