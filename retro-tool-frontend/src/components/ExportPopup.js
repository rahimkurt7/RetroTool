import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ExportPopup = ({ onClose }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7048/api/card/all")
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((err) => console.error("Veri çekme hatası", err));
  }, []);

  const filterLast7Days = (data) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return data.filter((item) => new Date(item.createdAt) >= oneWeekAgo);
  };

  const handleDownloadExcel = () => {
    const data = filterLast7Days(cards).map(({ id, content, category, username }) => ({
      ID: id,
      "İçerik": content,
      "Kategori": category,
      "Kullanıcı": username,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Kartlar");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, "RetroCards_Last7Days.xlsx");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("Son 7 Günde Oluşturulan Kartlar", 40, 40);

    const tableData = filterLast7Days(cards).map(({ id, content, category, username }) => [
      id,
      content,
      category,
      username,
    ]);

    autoTable(doc, {
      startY: 60,
      head: [["ID", "İçerik", "Kategori", "Kullanıcı"]],
      body: tableData,
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: 5,
      },
      headStyles: {
        fillColor: [72, 136, 199],
        textColor: 255,
        fontStyle: "bold",
      },
      margin: { top: 30 },
    });

    doc.save("RetroCards_Last7Days.pdf");
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h2 style={styles.title}>Verileri Dışa Aktar</h2>
        <p style={styles.description}>Son 7 gün içindeki verileri PDF veya Excel olarak indirebilirsin.</p>
        <div style={styles.buttons}>
          <button onClick={handleDownloadExcel} style={styles.excelButton}>Excel İndir</button>
          <button onClick={handleDownloadPDF} style={styles.pdfButton}>PDF İndir</button>
        </div>
        <button onClick={onClose} style={styles.closeButton}>Kapat ✖</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px",
    width: "420px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease-in-out",
  },
  title: {
    marginBottom: "12px",
    fontSize: "22px",
    color: "#333",
  },
  description: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "15px",
  },
  excelButton: {
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  pdfButton: {
    padding: "10px 20px",
    backgroundColor: "#d81b60",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  closeButton: {
    marginTop: "10px",
    backgroundColor: "transparent",
    border: "none",
    color: "#999",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default ExportPopup;
