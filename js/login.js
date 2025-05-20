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
  if (username === "" || password === "") {
    alert("Please fill in all fields!");
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
      alert("Login successful! 🎉");

      // ADMİN BİLGİLERİ LOCALSTORAGE'A KAYDET
      localStorage.setItem("name", name);
      localStorage.setItem("password", password);
      // Başarılıysa dashboard'a gider
      window.location.href = "admin-dashboard.html";
    })
    .catch((err) => {
      alert("Incorrect username or password ❌");
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
      alert("Please enter all fields.");
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
        alert("Login successful! 🎉");
        console.log("Login successful, now saving user name...");
        // KULLANICININ KİMLİĞİNİ TANITAN BİLGİLERİ LOCALSTORAGE'A KAYDET
        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPhone", phone);
        // console.log("Saved userName:", localStorage.getItem('userName'));

        window.location.href = "user-dashboard.html"; // Başarılıysa kullanıcı paneline yönlendir
      })
      .catch((err) => {
        alert("An error occurred: " + err.message);
        console.error(err);

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
      });
  });
});
