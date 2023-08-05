// get full client data
function getFullClientData(clientIp) {
  const request = new Request(`https://ipapi.co/${clientIp}/json/`, {
    method: "GET",
    contentType: "application/json",
  });

  fetch(request)
    .then((response) => response.json())
    .then((data) => {
      console.info(data);
      document.getElementById("regionName").textContent = data.region;
      document.getElementById("countryName").textContent = data.country_name;
      document.getElementById("city").textContent = data.city;

      document.getElementById("timeZoneNow").textContent = data.utc_offset;
      document.getElementById("operatorCel").textContent = data.org;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// get client data from ip address
function getClientData() {
  const request = new Request(`https://api.db-ip.com/v2/free/self`, {
    method: "GET",
    contentType: "application/json",
  });

  //   run the request
  const response = fetch(request);
  response
    .then((response) => response.json())
    .then((data) => {
      const clientIp = data.ipAddress;
      getFullClientData(clientIp);

      document.getElementById("ipLocation").textContent = data.ipAddress;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// fungsi get  client req UTC dengan  wwolrd API
function getUtcFromClient(value) {
  const request = new Request(`http://worldtimeapi.org/api/timezone/${value}`, {
    method: "GET",
    contentType: "application/json",
  });

  fetch(request)
    .then((response) => response.json())
    .then((data) => {
      //   menampilkan data
      document.getElementById("timezoneSearch").textContent = data.utc_offset;
      document.getElementById("searchName").textContent = data.timezone;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// get timezone dengan valuea dari input
function getTimeFromClient(value) {
  const request = new Request(`https://api.api-ninjas.com/v1/worldtime?city=${value}`, {
    method: "GET",
    headers: { "X-Api-Key": "EvZfnfPm97eg2ZuXwg7+Lw==fEnrurgD4JdFrSXc" },
    contentType: "application/json",
  });

  fetch(request)
    .then((response) => {
      if (response.status === 200) {
        document.getElementById("clientSearch").value = "data found. look at the result menu!!";
        // alert("the data has been successfully found and you can see there is a results menu");
        return response.json();
      } else {
        alert("Data Not Found!!");
      }
    })
    .then((data) => {
      // get UTC
      const timezoneReq = data.timezone;
      getUtcFromClient(timezoneReq);

      //   tampilkan date nor=w
      document.getElementById("dayResult").textContent = data.day_of_week;
      document.getElementById("dateResult").textContent = data.date;

      //   variable content
      let hourElement = document.getElementById("hourSearch");
      let minuteElement = document.getElementById("minuteSearch");
      let identityElement = document.querySelector(".identitySearch");

      // Ambil waktu dari data dan update elemen-elemen waktu di HTML
      hourElement.textContent = data.hour;
      minuteElement.textContent = data.minute;

      // Mengatur icon di jam berdasarkan jam saat ini
      const currentHour = parseInt(hourElement.textContent);
      if (currentHour >= 0 && currentHour < 12) {
        identityElement.textContent = "wb_sunny";
      } else if (currentHour >= 12 && currentHour < 18) {
        identityElement.textContent = "wb_twilight";
      } else {
        identityElement.textContent = "nights_stay";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// fungsi tampilkan local time sekarang
function tampilkanLocalTime() {
  const now = new Date();

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const dayElement = document.getElementById("day");
  const dateElement = document.getElementById("date");
  const monthElement = document.getElementById("month");
  const yearElement = document.getElementById("year");
  const hourElement = document.getElementById("hour");
  const minuteElement = document.getElementById("minute");
  const secondElement = document.getElementById("second");
  const identity = document.querySelector(".identity");

  // Mengatur waktu, hari, tanggal, bulan, tahun
  dayElement.textContent = daysOfWeek[now.getDay()];
  dateElement.textContent = now.getDate();
  monthElement.textContent = monthsOfYear[now.getMonth()];
  yearElement.textContent = now.getFullYear();

  hourElement.textContent = now.getHours();
  minuteElement.textContent = now.getMinutes();
  secondElement.textContent = now.getSeconds();

  // Mengatur icon di jam berdasarkan jam saat ini
  const currentHour = parseInt(hourElement.textContent, 10);
  if (currentHour >= 0 && currentHour < 12) {
    identity.textContent = "wb_sunny";
  } else if (currentHour >= 12 && currentHour < 18) {
    identity.textContent = "wb_twilight";
  } else {
    identity.textContent = "nights_stay";
  }
}

// fungsi menghapus result
function deleteResult(e) {
  let searchName = document.getElementById("searchName");
  let dayElement = document.getElementById("dayResult");
  let dateElement = document.getElementById("dateResult");
  let hourElement = document.getElementById("hourSearch");
  let minuteElement = document.getElementById("minuteSearch");
  let closeBtn = document.getElementById("closeResult");
  let timezoneSearch = document.getElementById("timezoneSearch");

  if (e.target == closeBtn) {
    searchName.textContent = "";
    dayElement.textContent = "";
    dateElement.textContent = "";
    hourElement.textContent = "";
    minuteElement.textContent = "";
    timezoneSearch.textContent = "";
  }
}

// fungsi search by value input
function valueSearchHandler() {
  const valueSearchInput = document.getElementById("clientSearch").value;
  getTimeFromClient(valueSearchInput);

  setTimeout(() => {
    let searchInput = document.getElementById("clientSearch");
    searchInput.value = "";
  }, 5000);
}

// search handler button
const searchBtn = document.getElementById("search");
searchBtn.addEventListener("click", valueSearchHandler);

// handler delete button
const container = document.querySelector(".result");
container.addEventListener("click", deleteResult);
// menampilkan local time
setInterval(tampilkanLocalTime, 1000);
// get client data
getClientData();
