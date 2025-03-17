// OPEN POPUP
const dialog = document.querySelector("dialog");
const bookTableBtn = document.getElementById("rezerv-popup");
const closeBtn = document.querySelector(".close-btn");

bookTableBtn.addEventListener("click", () => {
  // Popup'ı aç
  dialog.showModal();
  // Popup açıldığında arka plana scroll olmaması için
  document.body.style.overflow = "hidden";

  //Popup açıldığında gerçekleşecek olan animasyon animasyon
  dialog.style.opacity = "0";
  dialog.style.transform = "scale(0.9)";

  setTimeout(() => {
    dialog.style.transition =
      "opacity 0.5s ease-in-out, transform 0.3s ease-in-out";
    dialog.style.opacity = "1";
    dialog.style.transform = "scale(1)";
  }, 10);
});

closeBtn.addEventListener("click", () => {
  // Popup'ı kapat
  // Popup kapatıldığında arka plana scroll olabilmesi için
  document.body.style.overflow = "auto";
  // Popup kapatıldığında gerçekleşecek olan animasyon
  dialog.style.opacity = "0";
  dialog.style.transform = "scale(0.9)";

  setTimeout(() => {
    dialog.close();
  }, 300); // Animasyon süresi kadar bekle
});

// SELECT NO OF PERSON
document.addEventListener("DOMContentLoaded", function () {
  const person = document.querySelector(".guest-count-selection");

  function noOfPerson() {
    for (let i = 1; i <= 10; i++) {
      const creatNum = document.createElement("div");
      creatNum.className = "selection-item";
      const numOfPerson = document.createElement("h3");
      numOfPerson.className = "selection-item-label";
      numOfPerson.innerHTML = i;

      creatNum.appendChild(numOfPerson);
      person.appendChild(creatNum);
    }

    // Kişi seçme fonksiyonunu burada çağırıyoruz
    selectPerson();
  }

  function selectPerson() {
    const selectionItems = document.querySelectorAll(".selection-item");

    selectionItems.forEach((item) => {
      item.addEventListener("click", function () {
        // Önce tüm seçimleri kaldır
        selectionItems.forEach((el) => el.classList.remove("selected"));

        // Seçilen elemana "selected" class'ını ekle
        item.classList.add("selected");

        // Seçilen numarayı console'a yazdır
        console.log(item.textContent);
      });
    });
  }

  // Fonksiyonu çağır
  noOfPerson();
});

// SELECT DATE
document.addEventListener("DOMContentLoaded", function () {
  const monthYear = document.querySelector(".month-year");
  const daysContainer = document.querySelector(".days");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDate = new Date();
  let today = new Date();
  let selectedDay = null; // Seçilen günü takip eden değişken

  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    monthYear.textContent = `${months[month]} ${year}`;

    daysContainer.innerHTML = "";

    // previous month's dates
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDay; i > 0; i--) {
      const dayDiv = document.createElement("div");
      dayDiv.textContent = prevMonthLastDay - i + 1;
      dayDiv.classList.add("fade");
      daysContainer.appendChild(dayDiv);
    }

    // current month's dates
    for (let i = 1; i <= lastDay; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.textContent = i;
      dayDiv.classList.add("day"); // Günlere sınıf ekleyelim

      if (
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        dayDiv.classList.add("today");
      }

      // Gün seçme işlemi
      dayDiv.addEventListener("click", function () {
        // Önceki seçimi kaldır
        if (selectedDay) {
          selectedDay.classList.remove("selected");
        }

        // Yeni seçimi belirle
        dayDiv.classList.add("selected");
        selectedDay = dayDiv;

        console.log(`Selected Date: ${i} ${months[month]} ${year}`);
      });

      daysContainer.appendChild(dayDiv);
    }

    // next month's dates
    const nextMonthStartDay = 7 - new Date(year, month + 1, 0).getDay - 1;
    for (let i = 1; i <= nextMonthStartDay; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.textContent = i;
      dayDiv.classList.add("fade");
      daysContainer.appendChild(dayDiv);
    }
  }

  prevButton.addEventListener("click", function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextButton.addEventListener("click", function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  renderCalendar(currentDate);
});

// SELECT TIME
const time = document.querySelector(".reserv-time-selection");
const timeItems = [
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "20:00",
  "21:00",
];
timeItems.forEach((item) => {
  const div = document.createElement("div");
  div.className = "time-selection-item selection-item";
  const h3 = document.createElement("h3");
  h3.className = "time-selection-label selection-item-label";
  h3.innerHTML = item;
  time.appendChild(div);
  div.appendChild(h3);
});

// FORM
(function () {
  let currentPage = 1;
  const prevBtn = document.querySelector(".form .form-footer .form-prev");
  const nextBtn = document.querySelector(".form .form-footer .form-next");
  function movePage() {
    prevBtn.disabled = false;
    nextBtn.disabled = false;
    if (currentPage === 1) {
      prevBtn.disabled = true;
    } else if (currentPage === 4) {
      // nextBtn.disabled = true;

      // const button = document.getElementById("sendButton");
      nextBtn.innerHTML = "Send";
      // const dateString = "2023-03-07"; // Date part -----kullanıcıdan alınmalı
      // const timeString = "15:30:00"; // Time part -----kullanıcıdan alınmalı
      // // Combine the strings with a "T" separator to form an ISO 8601 datetime string.
      // const dateTimeString = `${dateString}T${timeString}`;
      // const dateTime = new Date(dateTimeString);
      // console.log(dateTime); // Outputs the Date object
      // button.addEventListener("click", function () {
      //   fetch("https://api.example.com/data", {
      //     method: "POST", // Using POST method
      //     headers: {
      //       "Content-Type": "application/json", // Set the content type header
      //     },
      //     body: JSON.stringify({
      //       restaurantId: 3,
      //       customerName: "Kaan", //kullanıcı adı ve diğer bilgiler
      //       customerPhoneNumber: "343434",
      //       description: "açıklama",
      //       peopleCounts: 5,
      //       reservationTime: dateTime.toISOString(), // Convert the Date object to an ISO 8601 string
      //     }), // Convert your data to a JSON string
      //   })
      //     .then((response) => {
      //       if (!response.ok) {
      //         alert("There was a problem with your reservation.");
      //         throw new Error("Network response was not ok");
      //       }
      //       alert("Your reservation has been successfully created.");
      //       return response.json();
      //     })
      //     .then((data) => console.log(data))
      //     .catch((error) => console.error("Error:", error));
      // });
    }
    document
      .querySelector(".form .pagination .active")
      .classList.remove("active");
    document
      .querySelectorAll(".form .pagination .number")
      [currentPage - 1].classList.add("active");
    const stepNode = document.querySelector(".form .steps .step");
    const width = (currentPage - 1) * stepNode.offsetWidth * -1 + "px";
    stepNode.parentNode.style.marginLeft = width;
  }

  prevBtn.addEventListener("click", () => {
    currentPage -= 1;
    movePage();
  });
  nextBtn.addEventListener("click", () => {
    currentPage += 1;
    movePage();
  });
})();
