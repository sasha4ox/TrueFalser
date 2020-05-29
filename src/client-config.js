const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://true-falser-server.herokuapp.com/api"
    : "http://localhost:8080/api";

export { apiUrl };
