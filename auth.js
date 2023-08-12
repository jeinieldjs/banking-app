let logOutButton = document.querySelector("#log-out");

let isLoggedIn = () => {
  let loggedUser = localStorage.getItem("loggedInUser");
  let homepage = window.location.origin;

  // if not logged in and admin go to other pages
  if (!loggedUser && window.location.href !== homepage + "/index.html") {
    window.location.href = "index.html";
  }

  // if logged in and admin go to index.html
  if (loggedUser && window.location.href === homepage + "/index.html") {
    window.location.href = "dashboard.html";
  }
};

let logOut = () => {
  localStorage.removeItem("loggedInUser");
  alert("Logged out successfully");
  window.location.href = "index.html";
};

isLoggedIn();
logOutButton?.addEventListener("click", logOut);
