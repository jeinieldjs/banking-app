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
      window.location.pathname !== path + "/index.html" &&
      window.location.pathname !== path + "/clientlog.html"
    ) {
      window.location.pathname = path + "/";
    }
  } else {
    const pathName =
      loggedUser === "Admin1"
        ? path + "/dashboard.html"
        : path + "/clientdash.html";

    if (
      window.location.pathname === path + "/" ||
      window.location.pathname === path + "/index.html" ||
      window.location.pathname === path + "/clientlog.html"
    ) {
      window.location.pathname = pathName;
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
