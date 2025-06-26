self.addEventListener("install", function (event) {
  console.log("Service Worker Installed");
});

self.addEventListener("fetch", function (event) {
  // Offline mode ke liye future mein enhance kar sakte ho
});