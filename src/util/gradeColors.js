const gradeColors = [
  {
    key: "1°-Ensino Fundamental",
    color: "#7159c1"
  },
  {
    key: "2°-Ensino Fundamental",
    color: "#42a5f5"
  },
  {
    key: "3°-Ensino Fundamental",
    color: "#4db6ac"
  },
  {
    key: "4°-Ensino Fundamental",
    color: "#004d40"
  },
  {
    key: "5°-Ensino Fundamental",
    color: "#e57373"
  },
  {
    key: "6°-Ensino Fundamental",
    color: "#880e4f"
  },
  {
    key: "7°-Ensino Fundamental",
    color: "#43a047"
  },
  {
    key: "8°-Ensino Fundamental",
    color: "#827717"
  },
  {
    key: "1°-Ensino Médio",
    color: "#dc7037"
  },
  {
    key: "2°-Ensino Médio",
    color: "#ffd600"
  },
  {
    key: "3°-Ensino Médio",
    color: "#ff5252"
  }
];

export function getGradeColor(grade) {
  let gradeColor = null;

  gradeColors.forEach(item => {
    if (grade === item.key) {
      gradeColor = item.color;
    }
  });

  return gradeColor;
}
