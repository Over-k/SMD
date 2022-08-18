var postscard = document.querySelectorAll('section')[1];
var i = 0;
const createPost = () => {
  posts = JSON.parse(localStorage.getItem("posts"));
  if (!posts) {
    postscard.innerHTML = `
    <div class="card newcard">
    <div class="picture">
    </div>
    <div class="content">
      <div class="header">
        <div class="profile-pic"></div>
        <div class="detail">
          <p class="name">Khalid ait miloud</p>
          <p class="posted">1 hours ago</p>
        </div>
      </div>
      <div class="desc">
        "Actually, the best gift you could have given her was a lifetime or adventures" Alice in Wonderland- I've
        always loved this quote. what's your favourite quote?
      </div>
      <div class="tags">
        <span>#party</span>
        <span>#colorful</span>
      </div>
      <div class="count">
        <div class="liked">
          <i class="fas fa-fire"></i> 43k
        </div>
        <div class="cmt-shr">
           4 <i class="fas fa-comment"></i>
           6 <i class="fas fa-share"></i>
        </div>
      </div>
      <div class="footer">
        <div class="like">
          <i class="fas fa-heart"></i>
          <span>Like</span>                        		            
        </div>
        <div class="comment">
          <i class="fas fa-comment"></i>
          <span>Comment</span>
        </div>
        <div class="share">
          <i class="fas fa-share"></i>
          <span>Share</span>
        </div>
      </div>        
    </div> 
  </div>`;
    return;
  };
  const n = Math.floor(Math.random() * posts.length);
  const randomPost = document.createElement("div"),
    {
      author,
      img,
      text,
      postimg,
      tags,
      data,
      likes,
      id,
      commenters,
      eye
    } = posts[n];
  active = 'like';
  posts[n].eye = posts[n].eye + 1;
  localStorage.setItem("posts", JSON.stringify(posts));
  if (len && likes.includes(formData[len].fullname)) {
    active = 'like active';
  }
  randomPost.classList = i == 1 ? "card newcard" : "card newcard";
  randomPost.id = "post" + i;
  randomPost.innerHTML = `
 <div class="picture">
         <div class="settings">
             <i class="fas fa-plus" onclick="showMenu(this)"></i>
             <ul class="task-menu">
                <li><i class="fas fa-thumbtack"></i>Pin</li>                                                             
                <li onclick="likedtl(${i},${n})"><i class="fas fa-fire"></i>Like</li>
                <li onclick="comntdtl(${i},${n})"><i class="fas fa-comment"></i>Comment</li>  
                <li onclick="displaydtl(${i})"><i class="fas fa-eye-slash"></i>Move</li>
              </ul>     
         </div>
         <div class="dtl hidden"></div>
 </div>
 <div class="content">
   <div class="header">
     <div class="profile-pic"></div>
     <div class="detail">
       <p class="name">${author}</p>
       <p class="posted">${re(data)}</p>
     </div>
   </div>
   <div class="desc">
   ${ text }
   </div>
   <div class="tags">
     <span>${ tags }</span>
   </div>
   <div class="count">
     <div class="liked">
     ${ likes.length } <i class="fas fa-fire"></i> 
     </div>
     <div class="cmt-shr">
     ${ commenters.length } <i class="fas fa-comment"></i>
     ${ eye } <i class="fas fa-eye"></i>
     </div>
   </div>
   <div class="footer">
     <div class="${ active }">
     <span class="react">		
     <i class="fas fa-heart" onclick="showMenu(this)"></i>
       <ul class="task-menu">
              <li><i class="fas fa-heart" onclick="likePosts(${ i },${ id },1)"></i></li>
              <li><i class="fas fa-heart-broken" onclick="likePosts(${ i },${ id },2)"></i></li>                                                             
              <li><i class="fas fa-feather-alt" onclick="likePosts(${ i },${ id },3)"></i></li>
              <li><i class="fas fa-meteor" onclick="likePosts(${ i },${ id },4)"></i></li>
              <li><i class="fas fa-times" onclick="likePosts(${ i },${ id },5)"></i></li>
              
       </ul>     
     </span>
     <span>Like</span>                        		            
     </div>
     <div class="comment" onclick="commenter(${ i })">
       <i class="fas fa-comment"></i>
       <span>Comment</span>
     </div>
     <div class="share">
       <i class="fas fa-share"></i>
       <span>Share</span>
     </div>
   </div>        
 </div>
 
 <div class="add-cmt hidden">
     <div class="pic"></div>
     <div class="input">
       <input type="text" placeholder="add commenter">                       
     </div>
     <div class="button" onclick="addcommenter(${ i },${ n })">
           <i class="fas fa-paper-plane"></i>    
     </div> 
 </div>
 </div>`;
  randomPost.querySelector('.picture').setAttribute('style', 'background-image:url(' + postimg + ')');
  randomPost.querySelector('.profile-pic').setAttribute('style', 'background-image:url(' + img + ')');
  randomPost.querySelector('.add-cmt .pic').setAttribute('style', 'background-image:url(' + formData[len].img + ')');
  if (i <= posts.length + 1) {
    postscard.appendChild(randomPost);
  }
  if (i == posts.length + 2) {
    postscard.innerHTML += '<div class="loader"></div>';
  }
  var named = postscard.querySelectorAll('.detail .name');
  named.forEach(function(element) {
    element.addEventListener('click', function(e) {
      document.querySelector('.modal').classList.remove('hidden');
      modalprofile(element.innerHTML);
    });
  });
  var rcts = postscard.querySelectorAll('.like .task-menu li');
  rcts.forEach(items => {
    items.addEventListener('click', item => {
      cng = items.parentElement.parentElement;
      cls = items.querySelector('i').getAttribute('class');
      cng.firstElementChild.classList = cls == "fas fa-times" ? "fas fa-heart" : cls;
      span = cng.parentElement.lastElementChild;
      span.innerHTML = cls == "fas fa-times" ? "heart" : cls.slice(7, cls.lenght).replaceAll('-alt', ' ');
    })
  });
  i++;
};
if (len != null) {
  createPost();
}
window.addEventListener('scroll', () => {
  const {
    scrollTop,
    scrollHeight,
    clientHeight
  } = document.documentElement;
  if ((clientHeight + scrollTop) >= scrollHeight - 20 && posts) {
    createPost();
  }
});
//reaction			
function showMenu(selectedTask) {
  let menuDiv = selectedTask.parentElement.lastElementChild;
  menuDiv.classList.add("show");
  document.addEventListener("click", e => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      menuDiv.classList.remove("show");
    }
  });
}

function commenter(item) {
  addcmt = document.querySelector('#post' + item + ' .add-cmt');
  if (addcmt.classList == "add-cmt") {
    addcmt.classList = 'add-cmt hidden';
  } else {
    addcmt.classList = 'add-cmt';
  }
}
//like post  
const likePosts = (item, id, reaction) => {
  card = document.querySelector('#post' + item);
  taskBox = card.querySelector('.like');
  if (reaction == 5) {
    taskBox.classList.remove("active");
    posts[id].likes = posts[id].likes.filter(name => !formData[len].fullname.includes(name));
  } else {
    taskBox.classList.add("active");
    posts[id].likes = posts[id].likes.filter(name => !formData[len].fullname.includes(name));
    posts[id].likes.push(formData[len].fullname);
  }
  localStorage.setItem("posts", JSON.stringify(posts));
  card.querySelector('.liked').innerHTML = posts[id].likes.length + ' <i class="fas fa-fire"></i>';
}
//commenter  
const addcommenter = (item, id) => {
  card = document.querySelector('#post' + item + ' .add-cmt');
  cmnt = card.querySelector('input');
  btn = card.querySelector('.button');
  if (cmnt.value !== '') {
    posts[id].commenters.push(cmnt.value);
    localStorage.setItem("posts", JSON.stringify(posts));
    btn.innerHTML = '<div class="loader"></div>';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i>';
      card.classList.add('hidden');
      cmnt.value = '';
    }, 1000);
  }
}
//display post information
const displaydtl = (item) => {
  card = document.querySelector('#post' + item);
  classdtl = card.querySelector('.dtl');
  if (classdtl.classList == 'dtl') classdtl.classList = 'dtl hidden';
}
const likedtl = (item, order) => {
  card = document.querySelector('#post' + item);
  classdtl = card.querySelector('.dtl');
  classdtl.innerHTML = '';
  if (classdtl.classList == 'dtl hidden') classdtl.classList = 'dtl';
  var likes = posts[order].likes;
  for (let like of likes) {
    classdtl.innerHTML += '<p>' + like + '</p>';
  }
  if (!likes.length) classdtl.innerHTML = 'Empty...';
}
const comntdtl = (item, order) => {
  card = document.querySelector('#post' + item);
  classdtl = card.querySelector('.dtl');
  classdtl.innerHTML = '';
  if (classdtl.classList == 'dtl hidden') classdtl.classList = 'dtl';
  var commenters = posts[order].commenters;
  for (let commenter of commenters) {
    classdtl.innerHTML += '<p>' + commenter + '</p>';
  }
  if (!commenters.length) classdtl.innerHTML = 'Empty...';
};