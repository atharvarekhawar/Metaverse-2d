import axios from "axios";

const BACKEND_URL = "http://localhost:3000";

describe("Authentication", () => {
  // Signup testing
  describe("signup", () => {
    test("user is able to signup", async () => {
      const username = "ath" + Math.random();
      const password = "123456789";
      const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
        type: "admin",
      });

      expect(response.statusCode).toBe(200);

      const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
        type: "admin",
      });

      expect(updatedResponse.statusCode).toBe(400);
    });

    test("Signup req fails if usename is empty", async () => {
      const username = "ath" + Math.random();
      const password = "123456789";
      const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        password,
        type: "admin",
      });

      expect(response.statusCode).toBe(400);
    });
  });

  // SigIn testing
  describe("signin", () => {
    test("user is able to signin", async () => {
      const username = "ath" + Math.random();
      const password = "123456789";
      await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
        type: "admin",
      });

      const response = await axios.post(`${BACKEND_URL}/api/v1/signi    n`, {
        username,
        password,
      });

      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBeDefined();
    });

    test("Signin fails for wrong username and password", async () => {
      const username = "ath" + Math.random();
      const password = "123456789";
      await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
        type: "admin",
      });

      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username: "wrongUsername",
        password,
      });

      expect(response.statusCode).toBe(403);
    });
  });
});

    
