import React from "react";
import Category from "../components/Category";

const HomePage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.categories}>
        <Category title="Mad" />
        <Category title="Sad" />
        <Category title="Glad" />
        <Category title="Learned" />
        <Category title="Suggestion" />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  categories: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  },
};

export default HomePage;
