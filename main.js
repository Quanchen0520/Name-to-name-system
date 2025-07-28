const classSelect = document.getElementById("classSelect");
const dateInput = document.getElementById("dateInput");
const seatInput = document.getElementById("seatInput");
const searchBtn = document.getElementById("searchBtn");
const resultArea = document.getElementById("resultArea");
const loading = document.getElementById("loading");

searchBtn.addEventListener("click", async () => {
  loading.style.display = "block";
  resultArea.innerHTML = "";
  const className = classSelect.value;
  const date = dateInput.value;
  const seat = seatInput.value;

  if (!className) {
    alert("請選擇班級");
    return;
  }

  const query = new URLSearchParams();
  query.append("class", className);
  if (date) query.append("date", date);
  if (seat) query.append("seat", seat);

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbz3ZmiMW2Ei8QA8XCbLt_jgp1sDu232R2AfrEaWyyRHLMdpB3cqeuspeyMWfbpXAWeOAg/exec?" + query.toString());
    const data = await res.json();

        searchBtn.disabled = true;

    if (data.length === 0) {
      resultArea.innerHTML = "<p>查無資料</p>";
    } else {
      let html = `
        <table>
          <thead>
            <tr><th>座號</th><th>日期</th><th>姓名</th><th>狀態</th></tr>
          </thead>
          <tbody>
      `;
      data.forEach(r => {
        html += `<tr>
    <td>${r.seatNo || r.SeatNo || r.座號 || ""}</td>       <!-- 座號 -->
    <td>${r.Time || r.time || ""}</td>                     <!-- 日期時間 -->
    <td>${r.dept || r.Dept || r.姓名 || ""}</td>           <!-- 姓名欄位你這裡沒有，先放dept或空白 -->
    <td>${r.status || r.Status || r.狀態 || ""}</td>       <!-- 狀態 -->
  </tr>`;
      });

      html += "</tbody></table>";
      resultArea.innerHTML = html;
    }
  } catch (err) {
    resultArea.innerHTML = "<p style='color:red;'>查詢失敗：" + err.message + "</p>";
  } finally {
    loading.style.display = "none";
    searchBtn.disabled = false;
  }
});