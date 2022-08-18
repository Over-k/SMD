let sections = document.querySelectorAll('section'),
  live = document.querySelectorAll('.live'),
  cinput = document.querySelectorAll('#createAccount input'),
  linput = document.querySelectorAll('#login input');
// stored all information 
let len = localStorage.getItem('i'),
  formData = JSON.parse(localStorage.getItem('formData')) || [];
// When the user open your onload 
window.onload = async () => {
  if (!formData.length) {
    try {
      let response = await fetch('js/data.json');
      let formData = await response.json();
      localStorage.setItem('formData', JSON.stringify(formData));
    } catch (e) {
      let formData = [];
    }
  }
  if (len == null) {
    alerts("error", " Hi, U need to login first or creat account");
    document.querySelector(".loading").remove();
    document.querySelector(".form__container").setAttribute('class', "form__container");
    document.querySelector("main").setAttribute('class', "hidden");
  } else {
    body();
  }
  return formData;
}
// Selecting all required elements
const alert = document.querySelector(".alert"),
  toast = alert.querySelector(".toast"),
  title = toast.querySelector("span"),
  subTitle = toast.querySelector("p"),
  wifiIcon = toast.querySelector(".icon"),
  closeIcon = toast.querySelector(".close-icon");

function alerts(type, message) { //function for error
  alert.classList.remove("hidden");
  if (type == "error") {
    alert.classList.remove("hide");
    toast.classList.add("error");
    title.innerText = "Opps!";
    subTitle.innerText = message;
    wifiIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
  } else {
    toast.classList.remove("error");
    title.innerText = "succes";
    subTitle.innerText = message;
    wifiIcon.innerHTML = '<i class="fas fa-check"></i>';
  }
  setTimeout(() => { //hide the toast notification automatically after 5 seconds
    alert.classList.add("hide");
  }, 2000);
}
closeIcon.onclick = () => { //hide toast notification on close icon click
  alert.classList.add("hide");
}
//When the user wants to sign up
const signUp = () => {
  // user info
  let fullname = cinput[1].value,
    id = cinput[2].value,
    img = profileimge,
    pwd = cinput[3].value,
    phone = '+212*********',
    regional = 'Morocco',
    school = 'your school',
    bio = 'Add a short bio to tell people more about yourself or your quote.',
    fulladd = 'your addres',
    zip = '****',
    follow = [],
    followed = [],
    click = [],
    act = {
      id: '<b>Id : </b>' + Date.now().toExponential(),
      data: '<b>Create at : </b>' + new Date(),
      acc: '<b>Number accounts : </b>' + formData.length + 1,
      Browser: '<b>Browser : </b>' + navigator.appCodeName
    };
  // check not to repeat them 
  let exist = formData.length && JSON.parse(localStorage.getItem('formData')).some(data => data.id.toLowerCase() == id.toLowerCase());
  // add user information on localStorage
  if (!exist) {
    formData.push({
      fullname,
      id,
      img,
      pwd,
      phone,
      regional,
      school,
      bio,
      fulladd,
      zip,
      follow,
      followed,
      click,
      act
    });
    localStorage.setItem('formData', JSON.stringify(formData));
    alerts("success", "Account Created.\nPlease Sign In using the link below.");
    localStorage.setItem('i', formData.length - 1);
    location.reload();
  }
  if (!exist) {} else {
    // When the user wants  to Duplicate same info
    alerts("error", "please change your ID");
  }
}
//When the user wants to sign in
const signIn = () => {
  let idin = linput[0].value;
  let pwdin = linput[1].value;
  //Make sure it already exist in the storage 
  let exist = formData.length && JSON.parse(localStorage.getItem('formData')).some(data => data.id == idin && data.pwd.toLowerCase() == pwdin);
  // Select the order in storage 
  for (i = 0; i < formData.length; i++) {
    if (formData[i].id == idin && formData[i].pwd == pwdin) {
      localStorage.setItem('i', i);
    }
  }
  if (exist) {
    // correct login credentials 
    location.reload();
  } else {
    // Incorrect login credentials  
    error = idin == '' || pwdin == '' ? 'Invalid username/password combination.' : ' Incorrect login credentials.';
    alerts("error", error);
  }
}
var changepic = document.querySelectorAll('#edit input')[0];
changepic.addEventListener('click', event => {
  document.querySelectorAll('#edit input')[11].click();
  document.querySelectorAll('#edit input')[11].addEventListener('change', handleFileSelect, false)
});
input[1].addEventListener('change', handleImges, false);
const upDate = () => {
  const input = document.querySelectorAll('#edit input'),
    {
      fullname,
      id,
      pwd,
      phone,
      regional,
      school,
      bio,
      fulladd,
      zip
    } = formData[len];
  input[1].value = bio,
    input[2].value = fullname,
    input[3].value = id,
    input[4].value = phone,
    input[5].value = regional,
    input[6].value = school,
    input[7].value = bio,
    input[8].value = fulladd,
    input[9].value = pwd,
    input[10].value = pwd;
  document.querySelector('#edit .form__button').addEventListener('click', event => {
    event.preventDefault();
    formData[len].fullname = input[2].value,
      formData[len].id = input[3].value,
      formData[len].phone = input[4].value,
      formData[len].regional = input[5].value,
      formData[len].school = input[6].value,
      formData[len].bio = input[1].value,
      formData[len].fulladd = input[8].value,
      formData[len].pwd = input[9].value == input[10].value ? input[10].value : pwd;
    localStorage.setItem('formData', JSON.stringify(formData));
    document.querySelector('#edit').classList = 'form hidden';
    document.querySelector('.body-action-button i').classList = 'fas fa-fingerprint';
  });
}
var modal = document.querySelector(".modal");
mdlimg = modal.querySelector('img'),
  details = modal.querySelectorAll('.modal-inf__title'),
  followbtn = modal.querySelectorAll('.modal-btn .tag'),
  showname = modal.querySelector('strong');
const modalprofile = (user) => {
  var {
    fullname,
    follow,
    img,
    click
  } = getData(user);
  showname.innerHTML = fullname;
  modal.querySelector('h2').innerHTML = fullname;
  mdlimg.src = img;
  details[0].innerText = followlength(user).length;
  details[1].innerText = follow.length;
  details[2].innerText = postlength(user).length;
  details[3].innerText = click.length;
  followbtn[0].innerHTML = 'Message';
  flwcheck = formData[len].follow.includes(user);
  followText = flwcheck ? 'Followed' : 'Following';
  followbtn[1].innerHTML = followText;
  followbtn[1].addEventListener('click', () => {
    followFct(fullname);
  });
};
// get details about user 
const getData = (username) => {
  formData[len].click.push(username);
  localStorage.setItem('formData', JSON.stringify(formData));
  object = JSON.parse(localStorage.getItem('formData'));
  for (let i = 0; i < object.length; i++) {
    if (object[i].fullname == username) {
      return object[i];
    }
  }
  alerts("error", "Sorry,this user not exist.");
}
//following and unfollow
const followFct = (member) => {
  flwcheck = formData[len].follow.includes(member);
  if (!flwcheck) {
    formData[len].follow.push(member);
  } else {
    formData[len].follow = formData[len].follow.filter(item => !formData[len].follow.includes(member));
  }
  followbtn[1].innerHTML = formData[len].follow.includes(member) ? 'Followed' : 'Following';
  localStorage.setItem('formData', JSON.stringify(formData));
};
const followlength = (member) => {
  object = JSON.parse(localStorage.getItem('formData'));
  follow = [];
  object.forEach(element => {
    flwcheck = element.follow.includes(member);
    if (flwcheck) {
      follow.push(member);
    }
  });
  return follow;
};
const postlength = (member) => {
  object = JSON.parse(localStorage.getItem('posts'));
  author = [];
  object.forEach(element => {
    authorcheck = element.author == member;
    if (authorcheck) {
      author.push(member);
    }
  });
  return author;
};
// When the user wants to Log out
const outbtn = document.querySelector('.logout');
outbtn.addEventListener('click', () => {
  localStorage.removeItem('i');
  location.reload();
});