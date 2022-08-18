function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form__message");
  messageElement.textContent = message;
  messageElement.classList.remove("form__message--success", "form__message--error");
  messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
  inputElement.classList.add("form__input--error");
  inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
  inputElement.parentElement.parentElement.querySelector("button").style.opacity = '0.5';
  inputElement.parentElement.parentElement.querySelector("button").type = 'button';
}

function clearInputError(inputElement) {
  inputElement.classList.remove("form__input--error");
  inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
  inputElement.parentElement.parentElement.querySelector("button").style.opacity = '1';
  inputElement.parentElement.parentElement.querySelector("button").type = 'submit';
}
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const createAccountForm = document.querySelector("#createAccount");
  document.querySelector("#linkCreateAccount").addEventListener("click", e => {
    e.preventDefault();
    loginForm.classList.add("hidden");
    createAccountForm.classList.remove("hidden");
    log();
  });
  createAccountForm.addEventListener("submit", e => {
    e.preventDefault();
    signUp();
  });
  document.querySelector("#linkLogin").addEventListener("click", e => {
    e.preventDefault();
    loginForm.classList.remove("hidden");
    createAccountForm.classList.add("hidden");
  });
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    // Perform your AJAX/Fetch login
    signIn();
  });
  document.querySelectorAll("form .form__input").forEach(inputElement => {
    inputElement.addEventListener("blur", e => {
      lenght = e.target.value.length < 20 && e.target.value.length > 4;
      type = "email" !== e.target.type && "button" !== e.target.type;
      if (!lenght && type) {
        id = e.target.id;
        error = e.target.value.length > 4 ? id + " must be less than  20 characters in length." : id + " must be at least 4 characters in length.";
        setInputError(inputElement, error);
      }
      e.target.value = e.target.value.replaceAll(" ", "");
    });
    inputElement.addEventListener("input", e => {
      clearInputError(inputElement);
    });
  });
});
//nav
var icon = document.querySelectorAll('.nav div'),
  section = document.querySelectorAll('section');
const hide = () => {
  document.querySelector('.nav .active').setAttribute('class', "icon");
  document.querySelector('.newsfeed').setAttribute('class', "section hidden");
};
icon.forEach(item => {
  item.addEventListener('click', event => {
    hide();
    item.setAttribute('class', "icon active");
    for (i = 0; i < icon.length; i++) {
      var active = icon[i].getAttribute('class');
      if (active == 'icon active') {
        section[i + 1].setAttribute('class', "section newsfeed");
        if (i == 1) {
          fctStars();
        }
        if (i == 2) {
          fctChat();
        }
        if (i == 3) {
          fctNotification();
        }
        if (i == 4) {
          inf();
        }
      }
    }
  })
});

function fctStars() {
  section[i + 1].innerHTML = '';
  JSON.parse(localStorage.getItem('formData')).map(items => {
    var {
      fullname,
      followed,
      img
    } = items;
    active = 'switch';
    if (items.followed.includes(formData[len].fullname)) {
      active = 'switch active';
    }
    section[i + 1].innerHTML += `
  <div class="card start">
    <div class="content">
      <div class="header">
        <div class="profile-pic" style="background-image:url('${img}');"></div>
        <div class="detail">
          <p class="name">${fullname}</p>
          <p class="posted active">
            <i class="fas fa-star"  id="${fullname}"> ${followed.length} </i>
          </p> 
        </div>
        <div class="${active}" id="${fullname}">
         <i class="fas fa-star"></i>
        </div>
      </div>
    </div>
  </div>
`;
  });
  var switching = document.querySelectorAll('.start .switch');
  switching.forEach(item => {
    item.addEventListener('click', switched => {
      item.classList.toggle("active");
      getId = item.id;
      getstars(getId);
      showStars = document.querySelector('.detail #' + getId);
      showStars.innerHTML = ' ' + getstars(getId);
      localStorage.setItem('formData', JSON.stringify(formData));
    });
  });
};

function getstars(params) {
  i = 0;
  formData = JSON.parse(localStorage.getItem('formData'));
  formData.map(item => {
    if (item.fullname == params) {
      x = i;
    }
    i++;
  });
  if (formData[x].followed.includes(formData[len].fullname)) {
    formData[x].followed = formData[x].followed.filter(item => !formData[x].followed.includes(formData[len].fullname));
  } else {
    formData[x].followed.push(formData[len].fullname);
  }
  return formData[x].followed.length;
};

function fctChat() {
  var chatbox = document.querySelector(".chatbox");
  chatbox.querySelector('.pic').setAttribute('style', 'background-image:url(' + formData[len].img + ')');
};
//Notification
function fctNotification() {
  var Notification = document.querySelector(".notification"),
    Fname = formData[len].fullname;
  formData.forEach(item => {
    var valid = item.click.includes(Fname) && item.fullname !== Fname;
    if (valid) {
      console.log(item.fullname + ' viset :' + Fname);
      Notification.innerHTML += `
        <div class="card">
            <div class="content">
              <div class="header">
                <i class="fas fa-user-secret"></i>
                <div class="detail">
                  <p class="name">${item.fullname}</p>
                  <p class="posted">"${item.fullname}" visited your personal account.</p>
                </div>
              </div>
            </div>
          </div>`;
    }
  });
};
const profile = document.querySelector(".profile"),
  h1 = profile.querySelector(".main-heading");
pl = profile.querySelectorAll(".stat-module span");
fl = profile.querySelectorAll(".body-stats span");
image = profile.querySelector(".body-image");
pbio = profile.querySelector(".body-info");
var a = 0,
  p = 0,
  l = 0;
//profile information
function inf() {
  const {
    fullname,
    follow,
    img,
    bio,
    click,
    act
  } = formData[len];
  JSON.parse(localStorage.getItem('formData')).forEach(d => {
    a = d.follow.includes(fullname) ? a + 1 : a;
  });
  posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.forEach(d => {
    if (d.author == fullname) {
      p++;
      l = l + d.likes.length;
    }
  });
  h1.innerText = fullname;
  fl[0].innerText = a;
  fl[1].innerText = follow.length;
  pl[0].innerText = p;
  pl[1].innerText = l;
  image.setAttribute('style', 'background-image:url(' + img + ')');
  pbio.innerText = bio;
};
//modal 1
var modal = document.querySelector(".modal");
var closemodal = document.querySelector(".modal-close");
closemodal.addEventListener('click', event => {
  modal.classList.add('hidden');
});
window.onclick = function(event) {
  if (event.target == modal) {
    modal.classList.add('hidden');
  }
}
//add img in sign up "stack overflow"
document.querySelector('#createAccount .form__logo').addEventListener('click', event => {
  document.querySelector('.addfile').click();
});
profileimge = 'img/download.jpg';
profileimge;

function handleFileSelect(evt) {
  var files = evt.target.files;
  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {
    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = function(e) {
      profileimge = e.target.result;
      try {
        localStorage.setItem("images", JSON.stringify(profileimge));
        profileimge;
      } catch {
        profileimge = 'img/download.jpg';
        profileimge;
      }
      if (len == null) {
        document.querySelector('#createAccount .form__logo').setAttribute('style', 'background-image:url(' + profileimge + ')');
      } else {
        document.querySelector('.user .body-image').setAttribute('style', 'background-image:url(' + profileimge + ')');
        formData[len].img = profileimge;
        localStorage.setItem('formData', JSON.stringify(formData));
      }
      return e.target.result;
    };
    reader.readAsDataURL(f);
  }
}
document.querySelector('.addfile').addEventListener('change', handleFileSelect, false);
//show form edit
document.querySelector('.user .body-action-button').addEventListener('click', event => {
  c = document.querySelector('#edit').getAttribute('class');
  if (c == "form") {
    document.querySelector('#edit').classList = 'form hidden';
    document.querySelector('.body-action-button i').classList = 'fas fa-fingerprint';
  } else {
    document.querySelector('#edit').classList = 'form';
    document.querySelector('.user .body-action-button i').classList = 'fas fa-times';
    upDate();
  }
});
//get time 
function re(ms) {
  // Format an amount of time.
  var t = Number(ms);
  var tn = Date.now();
  t = tn - t;
  if (t !== t) return "meep";
  if (t < 1000) return Math.ceil(t) + " millisecond";
  if ((t = Math.ceil(t / 1000)) < 60) return t + " second";
  if ((t = Math.ceil(t / 60)) < 60) return t + " minute";
  if ((t = Math.ceil(t / 60)) < 24) return t + " hour";
  if ((t = Math.ceil(t / 24)) < 7) return t + " day";
  return Math.ceil(t / 7) + " week";
};
//modal 2
posts = JSON.parse(localStorage.getItem("posts"));
var messageBox = document.querySelector('.modal-msg');
var btn = document.querySelectorAll('.modal-btn .tag')[0];
var card = document.querySelector('.modal');
var closeBtn = document.querySelectorAll('.msg-btn');
btn.addEventListener('click', function(e) {
  e.preventDefault();
  card.classList.add('active');
});
closeBtn.forEach(function(element, index) {
  element.addEventListener('click', function(e) {
    e.preventDefault();
    card.classList.remove('active');
  });
});
//creat post "twitter box clone" 
const creatPostbtn = document.querySelector(".add-more"),
  creatPost = document.querySelector(".creatpost"),
  wrapper = document.querySelector(".wrapper"),
  editableInput = wrapper.querySelector(".editable"),
  readonlyInput = wrapper.querySelector(".readonly"),
  placeholder = wrapper.querySelector(".placeholder"),
  counter = wrapper.querySelector(".counter"),
  button = wrapper.querySelector("button"),
  input = wrapper.querySelectorAll("input"),
  buttonIcon = wrapper.querySelectorAll('li');
buttonIcon[1].addEventListener('click', event => {
  input[1].click();
});
input[1].addEventListener('change', handleImges, false);
button.addEventListener("click", e => {
  let userTask = editableInput.innerText.trim(),
    pstimg = document.querySelector(".creatpost li img").src,
    validimg = pstimg.length > 500;
  tag = document.querySelector('.creatpost input').value.replaceAll(/\s{2,}/g, ' '),
    tags = '#' + tag.replaceAll(' ', ' #');
  time = Date.now();
  if (!validimg) {
    document.querySelectorAll(".creatpost li i")[1].classList = 'loader';
    setTimeout(() => {
      document.querySelectorAll(".creatpost li i")[1].classList = 'fas fa-camera';
    }, 2000);
  }
  if (userTask && validimg) {
    posts = !posts ? [] : posts;
    let taskInfo = {
      author: formData[len].fullname,
      img: formData[len].img,
      id: posts.length,
      text: userTask,
      postimg: pstimg,
      tags: tags,
      data: time,
      likes: [],
      commenters: [],
      eye: 0
    };
    posts.push(taskInfo);
    editableInput.inneText = "";
    localStorage.setItem("posts", JSON.stringify(posts));
    //showPost(taskInfo); creat post in profile
    clspst();
    validated(editableInput);
  }
});
creatPostbtn.addEventListener('click', () => {
  creatPost.classList.remove('hidden');
});
buttonIcon[0].addEventListener('click', () => {
  creatPost.classList.add('hidden');
});
editableInput.onfocus = () => {
  placeholder.style.color = "#c5ccd3";
}
editableInput.onblur = () => {
  placeholder.style.color = "#98a5b1";
}
editableInput.onkeyup = (e) => {
  let element = e.target;
  validated(element);
}
editableInput.onkeypress = (e) => {
  let element = e.target;
  validated(element);
  placeholder.style.display = "none";
}

function validated(element) {
  let text;
  let maxLength = 100;
  let currentlength = element.innerText.length;
  if (currentlength <= 0) {
    placeholder.style.display = "block";
    counter.style.display = "none";
    button.classList.remove("active");
  } else {
    placeholder.style.display = "none";
    counter.style.display = "block";
    button.classList.add("active");
  }
  counter.innerText = maxLength - currentlength;
  if (currentlength > maxLength) {
    let overText = element.innerText.substr(maxLength); //extracting over texts
    overText = `<span class="highlight">${ overText }</span>`; //creating new span and passing over texts
    text = element.innerText.substr(0, maxLength) + overText; //passing overText value in textTag variable
    readonlyInput.style.zIndex = "1";
    counter.style.color = "#FFDF3B";
    button.classList.remove("active");
  } else {
    readonlyInput.style.zIndex = "-1";
    counter.style.color = "#FFDF3B";
  }
  readonlyInput.innerHTML = text; //replacing innerHTML of readonly div with textTag value
}
const clspst = () => {
  editableInput.innerText = '';
  input[0].value = "";
  pstimg = '';
  buttonIcon[1].innerHTML = '<i class="fas fa-camera"></i><img src="" class="hidden"><input type="file" data="" class="hidden">';
  creatPost.classList.add('hidden');
}

function handleImges(evt) {
  var files = evt.target.files;
  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {
    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = function(e) {
      fileimge = e.target.result;
      buttonIcon[1].querySelector("i").setAttribute('class', 'hidden');
      buttonIcon[1].querySelector("img").src = fileimge;
      buttonIcon[1].querySelector("img").classList.remove("hidden");
    };
    reader.readAsDataURL(f);
  }
}
// getting all required elements "modal 2"
const modl = document.querySelector(".modl");
const profil = modl.querySelector(".profile");
const search = modl.querySelector(".search-input");
const inputBox = modl.querySelector("input");
const suggBox = modl.querySelector(".search-output");
const toggle = modl.querySelector('.toggle');
// if user press any key and release
inputBox.onkeyup = (e) => {
  contacts = [];
  JSON.parse(localStorage.getItem('formData')).map(data => contacts.push(data.fullname));
  toggle.classList.remove('hidden');
  profil.remove();
  let userData = e.target.value; //user enetered data
  let emptyArray = [];
  if (userData) {
    emptyArray = contacts.filter((data) => {
      //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data) => {
      // passing return data inside li tag
      return data = ` <div class="card">
             <div class="content">
                <div class="header">
                  <div class="profile-pic" style="background-image:url(${getData(data).img});"></div>
                  <div class="detail">
                    <p class="name">${ data }</p>
                    <p class="posted">${getData(data).id} </p> 
                  </div>
                  <div class="switch">
                   <i class="fas fa-times"></i>
                  </div>
                </div>
              </div>
            </div>`;
    });
    suggBox.classList.remove("hidden"); //show autocomplete box
    showcontacts(emptyArray);
  } else {
    suggBox.classList.add("hidden"); //hide autocomplete box
  }
}

function select(element) {
  let selectData = element.textContent;
  inputBox.value = selectData;
}

function showcontacts(list) {
  let listData;
  if (!list.length) {
    userValue = inputBox.value;
    listData = ` <div class="card">
              <div class="content">
                <div class="header">
                  <div class="profile-pic"></div>
                  <div class="detail">
                    <p class="name">No results found for '${userValue}'.</p>
                  </div>
                  <div class="switch">
                   <i class="fas fa-question"></i>
                  </div>
                </div>
              </div>
              </div>`;
  } else {
    listData = list.join('');
  }
  suggBox.innerHTML = listData;
  toggle.classList.remove("hidden");
}
//TOGGLE in modal 2
const ball = document.querySelector(".toggle-ball");
ball.addEventListener("click", () => {
  ball.classList.toggle("active");
  search.classList.toggle("active");
});
const mdl = document.querySelector(".modl"),
  showprofil = document.querySelector(".modal-cnt strong"),
  listimg = document.querySelectorAll(".card-list img"),
  mdlname = mdl.querySelector(".main-heading"),
  mdlbio = mdl.querySelector(".body-info");
showprofil.addEventListener("click", () => {
  modl.classList.remove("hidden");
  modl.classList.remove("hide");
  const {
    fullname,
    img,
    id,
    pwd,
    phone,
    regional,
    school,
    bio,
    fulladd
  } = getData(showprofil.innerText);
  mdlname.innerHTML = fullname;
  mdlbio.innerHTML = bio;
  mdl.querySelector('.body-image').setAttribute('style', 'background-image:url(' + img + ')');
});
const header = mdl.querySelector(".header");
const bty = modl.querySelector(".body-action-button");
bty.addEventListener("click", () => {
  var usern = showprofil.innerText;
  const {
    fullname,
    id,
    pwd,
    phone,
    regional,
    school,
    bio,
    fulladd
  } = getData(usern);
  let user = {
    username: fullname,
    password: pwd,
    id,
    phone,
    regional,
    school,
    fulladd,
    bio
  };
  var text = '\n' + JSON.stringify(user, '\t', 1);
  var i = 0;
  header.classList.add("active");
  header.innerHTML = '<textarea cols="30" rows="20"></textarea>';
  setInterval(() => {
    if (i <= text.length) {
      header.firstChild.value = text.slice(0, i++);
    }
  }, 100);
});
//close modal 2
const back = document.querySelector(".back");
back.addEventListener("click", () => {
  modl.classList.add("hide");
});
