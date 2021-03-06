// store all necessary html elements into variables to change their texts in future
const users = document.getElementById("users");
const userInfo = document.getElementById("user-info");

const currentUser = document.getElementById("current-user");

const userAddress = document.getElementById("address");
const userCompany = document.getElementById("company");
const userEmail = document.getElementById("email");
const userId = document.getElementById("user-id");
const username = document.getElementById("name");
const userPhone = document.getElementById("phone");
const userName = document.getElementById("username");
const userWebsite = document.getElementById("website");
const userCity = document.getElementById("city");
const userStreet = document.getElementById("street");
const userSuite = document.getElementById("suite");
const userZip = document.getElementById("zip-code");
const userBs = document.getElementById("bs");
const userCatch = document.getElementById("catch-phrase");
const userPosts = document.getElementById("posts");
const userPostsButton = document.getElementById("post-btn");

// url query string as an object
const urlParams = new URLSearchParams(window.location.search);


// get user data and populate main page
function getUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      res.forEach((user) => {
        const userButton = document.createElement("a");
        userButton.href = "/user?id=" + user.id;
        userButton.textContent = user.name;
        users.appendChild(userButton);
      });
    });
}

// get user info an populate user page
function getUserInfo() {
  fetch("https://jsonplaceholder.typicode.com/users/" + urlParams.get("id"))
    .then((res) => res.json())
    .then((res) => {
      currentUser.textContent = res.name;
      userEmail.textContent = userEmail.textContent + res.email;
      userId.textContent = userId.textContent + res.id;
      username.textContent = username.textContent + res.name;
      userName.textContent = userName.textContent + res.username;
      userWebsite.textContent = userWebsite.textContent + res.website;
      userPhone.textContent = userPhone.textContent + res.phone;
      userAddress.textContent = userAddress.textContent + res.address.city;
      userStreet.textContent = userStreet.textContent + res.address.street;
      userSuite.textContent = userSuite.textContent + res.address.suite;
      userZip.textContent = userZip.textContent + res.address.zipcode;
      userCompany.textContent = userCompany.textContent + res.company.name;
      userBs.textContent = userBs.textContent + res.company.bs;
      userCatch.textContent = userCatch.textContent + res.company.catchPhrase;
      userPostsButton.querySelector("a").href = "/posts?id=" + res.id;
    });
}

// get all posts of the user and populate the page
function getPosts() {
  fetch(
    "https://jsonplaceholder.typicode.com/users/" +
      urlParams.get("id") +
      "/posts"
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((post) => {
        const userId = document.createElement("h4");
        const userPostId = document.createElement("h4");
        const userPostTitle = document.createElement("h4");
        const userPostbody = document.createElement("h4");
        userPostTitle.textContent = "Title :" + " " + post.title;
        userPostbody.textContent = "Body :" + " " + post.body;
        userId.textContent = "User-id :" + " " + post.userId;
        userPostId.textContent = "Post-id :" + " " + post.id;
        const postDiv = document.createElement("div");
        postDiv.classList.add("post-div");
        postDiv.appendChild(userPostTitle);
        postDiv.appendChild(userPostbody);
        postDiv.appendChild(userId);
        postDiv.appendChild(userPostId);
        userPosts.appendChild(postDiv);
      });
    });
}

//detect a page and run related function to populate it with a data
switch (window.location.pathname) {
  case "/user":
    getUserInfo();
    break;
  case "/posts":
    getPosts();
    break;
  default:
    getUsers();
    break;
}
