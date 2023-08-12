let logOutButton = document.querySelector("#log-out");

let isLoggedIn = () => {
  let loggedUser = localStorage.getItem("loggedInUser");

  let loginpages = [
    "/",
    "/index.html",
    "/banking-app/",
    "/banking-app/index.html",
    "/banking-app-js/",
    "/banking-app-js/index.html",
  ];

  let currentPage = window.location.pathname;

  // user not logged in
  if (!loggedUser) {
    if (!loginpages.includes(currentPage)) {
      window.location.href = "/index.html";
    }

    // user logged in
  } else {
    if (loginpages.includes(currentPage)) {
      window.location.href = "/dashboard.html";
    }
  }
};

let logOut = () => {
  localStorage.removeItem("loggedInUser");
  alert("Logged out successfully");
  window.location.href = "index.html";
};

isLoggedIn();
logOutButton?.addEventListener("click", logOut);
