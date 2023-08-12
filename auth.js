let logOutButton = document.querySelector("#log-out");

let isLoggedIn = () => {
  let loggedUser = localStorage.getItem("loggedInUser");
  let homepage = window.location.origin;
  let path = "";

  if (
    homepage === "https://mecarte-ai.github.io" ||
    homepage === "https://jeinieldjs.github.io"
  ) {
    path += "/banking-app";
  }

  if (!loggedUser) {
    if (
      window.location.pathname !== path + "/" &&
      window.location.pathname !== path + "/index.html"
    ) {
      window.location.pathname = path + "/";
    }
  } else {
    if (
      window.location.pathname === path + "/" ||
      window.location.pathname === path + "/index.html"
    ) {
      window.location.pathname = path + "/dashboard.html";
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
