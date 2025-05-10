import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";

const GraphArea = ({ selectedUsers, selectedCategories, selectedSprints }) => {
  const [cards, setCards] = useState([]);
  const [chartData, setChartData] = useState([]);

  // 🟢 API'den tüm kartları çek
  useEffect(() => {
    fetch("https://localhost:7048/api/card/all")
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Kart Verisi:", data);
        setCards(data);
      })
      .catch((err) => console.error("Veri çekme hatası:", err));
  }, []);

  // 📅 Sprint numarası üret (haftalık)
  const getSprintLabel = (dateStr) => {
    const base = moment("2025-02-17");
    const current = moment(dateStr);
    const sprintIndex = Math.floor(current.diff(base, "days") / 7);
    return `Sprint ${sprintIndex + 1}`;
  };

  // 🧠 Filtrelenmiş veriyi grafik formatına dönüştür
  useEffect(() => {
    const filtered = cards.filter((card) => {
      const username = card.Username || card.username || "Tanımsız";
      const category = card.Category || card.category || "Kategori Yok";
      const sprintLabel = getSprintLabel(card.CreatedAt || card.createdAt);

      const userMatch = selectedUsers.includes(username);
      const categoryMatch = selectedCategories.includes(category);
      const sprintMatch = selectedSprints.includes(sprintLabel);

      return userMatch && categoryMatch && sprintMatch;
    });

    const grouped = {};

    filtered.forEach((card) => {
      const sprint = getSprintLabel(card.CreatedAt || card.createdAt);
      const user = card.Username || card.username || "Tanımsız";
      const category = card.Category || card.category || "Kategori Yok";
      const xLabel = `${sprint} - ${category}`;

      if (!grouped[xLabel]) grouped[xLabel] = {};
      if (!grouped[xLabel][user]) grouped[xLabel][user] = 0;
      grouped[xLabel][user]++;
    });

    const result = Object.entries(grouped).map(([xKey, users]) => ({
      name: xKey,
      ...users,
    }));

    setChartData(result);
  }, [cards, selectedUsers, selectedCategories, selectedSprints]);

  // 🎨 Aktif kullanıcılar ve renkler
  const colors = ["#FF69B4", "#FFD700", "#00C49F", "#8884d8", "#FF8042", "#82ca9d", "#A0522D"];
  const activeUsers = Array.from(new Set(cards.map((c) => c.Username || c.username))).filter(
    (u) => selectedUsers.includes(u)
  );

  // 📊 Grafik oluştur
  return (
    <div style={{ width: "100%", height: 450 }}>
      {(selectedUsers.length === 0 || selectedCategories.length === 0 || selectedSprints.length === 0) ? (
        <p style={{ textAlign: "center", marginTop: 40 }}>
          Grafik oluşturmak için kullanıcı, kategori ve sprint seçimlerinin hepsini yapmalısınız.
        </p>
      ) : chartData.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: 40 }}>
          Seçilen filtrelere ait grafik verisi bulunamadı.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 40, left: 20, bottom: 70 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-35}
              textAnchor="end"
              interval={0}
              height={80}
              style={{ fontSize: 12 }}
            />
            <YAxis allowDecimals={false} />
            <Tooltip contentStyle={{ fontSize: 14 }} labelStyle={{ fontWeight: "bold" }} />
            <Legend verticalAlign="top" height={36} />
            {activeUsers.map((user, index) => (
              <Line
                key={`line-${user}`}
                type="monotone"
                dataKey={user}
                stroke={colors[index % colors.length]}
                strokeWidth={2.5}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default GraphArea;
