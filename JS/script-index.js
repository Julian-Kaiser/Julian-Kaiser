// STARTSEITE – Dynamische Statusliste
const statusList = document.getElementById("status-list");

const statusData = [
  "📘 Buch 'Zwischen Schatten und Schweigen' – in Bearbeitung",
  "🕹️ Neue Inhalte auf GameCircl werden integriert",
  "🧠 Dev-Place im Aufbau – Tools folgen"
];

setTimeout(()=>{
  if(statusList){
    statusList.innerHTML = "";
    statusData.forEach(item=>{
      const li = document.createElement("li");
      li.textContent = item;
      statusList.appendChild(li);
    });
  }
}, 500);