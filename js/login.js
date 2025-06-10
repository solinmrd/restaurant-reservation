document.addEventListener("DOMContentLoaded", function () {
  const adminBtn = document.querySelector(".admin-btn");
  const userBtn = document.querySelector(".user-btn");
  const userForm = document.querySelector(".user-sign-in-form");
  const adminForm = document.querySelector(".admin-sign-in-form");
  const isAdmin = document.getElementById("are-you-admin");
  const isUser = document.getElementById("are-you-user");

  isAdmin.addEventListener("click", function () {
    adminLoginForm();
  });

  isUser.addEventListener("click", function () {
    userLoginForm();
  });

  // Form geçişleri
  adminBtn.addEventListener("click", function () {
    adminLoginForm();
  });

  userBtn.addEventListener("click", function () {
    userLoginForm();
  });

  function adminLoginForm() {
    userForm.classList.add("slide-left");
    userForm.classList.remove("active-form");

    setTimeout(() => {
      adminForm.classList.add("active-form");
      adminForm.classList.remove("slide-right");
    }, 500);
  }
  function userLoginForm() {
    adminForm.classList.add("slide-right");
    adminForm.classList.remove("active-form");

    setTimeout(() => {
      userForm.classList.add("active-form");
      userForm.classList.remove("slide-left");
    }, 500);
  }
});

// ---------------------------------------------------------ADMİN GİRİŞ İŞLEMLERİ--------------------------------------------------
const adminSignBtn = document.getElementById("admin-sign-btn");

adminSignBtn.addEventListener("click", () => {
  const name = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Eğer boş alan varsa
  if (name === "" || password === "") {
    // alert("Please fill in all fields!");
    alertPopup(); // Eksik alan varsa uyarı popup'ı göster
    return;
  }

  // API'ye istek gönder
  fetch(
    "http://ec2-18-195-172-95.eu-central-1.compute.amazonaws.com:8080/api/admin/reservations",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Not authorized");
      }
      return res.json();
    })
    .then(() => {
      successPopup("admin-dashboard.html");

      // ADMİN BİLGİLERİ LOCALSTORAGE'A KAYDET

      localStorage.setItem("name", name);
      localStorage.setItem("password", password);
      // Başarılıysa dashboard'a gider
      // window.location.href = "admin-dashboard.html";
    })
    .catch((err) => {
      // alert("Incorrect username or password!");
      unsuccessPopup(); // Başarısız giriş mesajı için popup göster
      console.error(err);
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
    });
});

// Şifreyi gösterme fonksiyonu
function showPassword() {
  var passwordInput = password;
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}

// ---------------------------------------------------------USER GİRİŞ İŞLEMLERİ--------------------------------------------------
// DOM tamamen yüklendiğinde bu kod çalışır
document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("user-sign-btn");
  loginButton.addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    if (!name) return; // İptal veya boşsa hemen çık
    const email = document.getElementById("email").value.trim();
    if (!email) return;
    const phone = document.getElementById("phone").value.trim();

    if (!name || !email || !phone) {
      // alert("Please enter all fields.");
      alertPopup();
      return;
    }

    // API'ye istek at: Kullanıcının rezervasyonlarını al
    fetch(
      "http://ec2-18-195-172-95.eu-central-1.compute.amazonaws.com:8080/api/customer/reservations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phoneNumber: phone,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reservations");
        return res.json();
      })
      .then((reservations) => {
        // alert("login successful");
        successPopup("user-dashboard.html"); // Başarılı giriş mesajı için popup göster
        console.log("Login successful, now saving user name...");
        // KULLANICININ KİMLİĞİNİ TANITAN BİLGİLERİ LOCALSTORAGE'A KAYDET
        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPhone", phone);
        // console.log("Saved userName:", localStorage.getItem('userName'));

        // window.location.href = "user-dashboard.html"; // Başarılıysa kullanıcı paneline yönlendir
      })
      .catch((err) => {
        // alert("An error occurred: " + err.message);
        unsuccessPopup(); // Başarısız giriş mesajı için popup göster
        console.error(err);

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
      });
  });
});

function successPopup() {
  const successDiv = document.createElement("div");
  successDiv.className = "popup center active";

  const iconDiv = document.createElement("div");
  iconDiv.className = "state-popup-icon success-icon";
  const successIcon = document.createElement("i");
  successIcon.className = "fa fa-check";

  const succcessTitle = document.createElement("div");
  succcessTitle.className = "state-title success-title";
  succcessTitle.innerHTML = " Login Successful!";

  const successDescription = document.createElement("div");
  successDescription.className = "state-description success-description";
  successDescription.innerHTML =
    "Welcome back! You have successfully signed in to your dashboard.";

  const okDiv = document.createElement("div");
  okDiv.className = "ok-btn";
  const okButton = document.createElement("button");
  okButton.className = "ok-popup-btn";
  okButton.innerHTML = "Close";

  successDiv.appendChild(iconDiv);
  successDiv.appendChild(succcessTitle);
  successDiv.appendChild(successDescription);
  successDiv.appendChild(okDiv);
  iconDiv.appendChild(successIcon);
  okDiv.appendChild(okButton);

  document.body.appendChild(successDiv);

  overflowHidden();

  // ✅ OK butonuna tıklandığında animasyonla kapat, sonra yönlendir
  okButton.addEventListener("click", () => {
    // Animasyon başlat
    successDiv.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    successDiv.style.opacity = "0";
    successDiv.style.transform = "scale(0.9)";

    const overlay = document.querySelector(".overlay");
    if (overlay) {
      overlay.classList.remove("active");
    }

    setTimeout(() => {
      document.body.removeChild(successDiv);
      overflowAuto();
      // Başarılı giriş sonrası yönlendirme
      if (localStorage.getItem("name")==="admin") {
        window.location.href = "admin-dashboard.html";
      } else {
        window.location.href = "user-dashboard.html";
      }
    }, 300); // Animasyon süresi kadar beklet
  });
}

function unsuccessPopup() {
  //  Başarısız giriş mesajı için popup oluşturma.
  const errDiv = document.createElement("div");
  errDiv.className = "popup center active";

  const iconDiv = document.createElement("div");
  iconDiv.className = "state-popup-icon err-icon";
  const errIcon = document.createElement("i");
  errIcon.className = "fa  fa-times-circle";

  const errTitle = document.createElement("div");
  errTitle.className = "state-title err-title";
  errTitle.innerHTML = "Login Failed!";

  const errDescription = document.createElement("div");
  errDescription.className = "state-description err-description";
  errDescription.innerHTML =
    "The information you entered is incorrect. Please check and try again!";

  const okDiv = document.createElement("div");
  okDiv.className = "ok-btn";
  const okButton = document.createElement("button");
  okButton.className = "ok-popup-btn";
  okButton.innerHTML = "Close";

  errDiv.appendChild(iconDiv);
  errDiv.appendChild(errTitle);
  errDiv.appendChild(errDescription);
  errDiv.appendChild(okDiv);
  iconDiv.appendChild(errIcon);
  okDiv.appendChild(okButton);

  document.body.appendChild(errDiv);
  overflowHidden();

  // ✅ OK butonuna basıldığında popup ve overlay'i kaldır
  okButton.addEventListener("click", () => {
    document.body.removeChild(errDiv);
    overflowAuto();
  });
}
function alertPopup() {
  //  Eksik alan varsa uyarı popup'ı.
  const errDiv = document.createElement("div");
  errDiv.className = "popup center active";

  const iconDiv = document.createElement("div");
  iconDiv.className = "state-popup-icon warning-icon";
  const errIcon = document.createElement("i");
  errIcon.className = "fa-solid fa-triangle-exclamation";

  const errTitle = document.createElement("div");
  errTitle.className = "state-title err-title";
  errTitle.innerHTML = "Missing Information!";

  const errDescription = document.createElement("div");
  errDescription.className = "state-description err-description";
  errDescription.innerHTML = "Please make sure all fields are filled in.";

  const okDiv = document.createElement("div");
  okDiv.className = "ok-btn";
  const okButton = document.createElement("button");
  okButton.className = "ok-popup-btn";
  okButton.innerHTML = "Close";

  errDiv.appendChild(iconDiv);
  errDiv.appendChild(errTitle);
  errDiv.appendChild(errDescription);
  errDiv.appendChild(okDiv);
  iconDiv.appendChild(errIcon);
  okDiv.appendChild(okButton);

  document.body.appendChild(errDiv);
  overflowHidden();

  // ✅ OK butonuna basıldığında popup ve overlay'i kaldır
  okButton.addEventListener("click", () => {
    document.body.removeChild(errDiv);
    overflowAuto();
  });
}

function overflowAuto() {
  document.body.style.overflow = "auto";

  const overlay = document.querySelector(".overlay");
  if (overlay) {
    overlay.classList.remove("active");
  }
}

function overflowHidden() {
  // Scroll'u engelle
  document.body.style.overflow = "hidden";

  // Eğer overlay daha önce eklenmemişse, oluştur ve ekle
  let overlay = document.querySelector(".overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);
  }

  // Overlay'i aktif et
  overlay.classList.add("active");
}
