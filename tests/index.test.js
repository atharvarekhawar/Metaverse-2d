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
      expect(response.data.userId).toBeDefined();

      //checking for same username to get 400
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

describe("User MetaData endpoint", () => {
  let token = "";
  let avatarId = "";

  beforeAll(async () => {
    const username = "ath" + Math.random();
    const password = "123456789";
    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });
    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });

    token = response.data.token;

    const avatarResponse = await axios.post(
      `${BACKEND_URL}/api/v1/admin/avatar`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
        name: "Timmy",
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    avatarId = avatarResponse.data.avatarId;
  });

  test("User can't update their metadata with wrong avatarId", async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/metadata`,
      {
        avatarId: "123123123",
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    expect(response.statusCode).toBe(400);
  });

  test("User can update their metadata with right avatarId", async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/metadata`,
      {
        avatarId: avatarId,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    expect(response.statusCode).toBe(200);
  });

  test("User can't update their metadata if the user forgets to send Authorization token in header", async () => {
    const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
      avatarId: avatarId,
    });

    expect(response.statusCode).toBe(403);
  });
});

describe("User avatar info", () => {
  let avatarId = "";
  let token = "";
  let userId = "";

  beforeAll(async () => {
    const username = "ath" + Math.random();
    const password = "123456789";
    const signUpResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });
    userId = signUpResponse.data.userId;

    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });

    token = response.data.token;

    const avatarResponse = await axios.post(
      `${BACKEND_URL}/api/v1/admin/avatar`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
        name: "Timmy",
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    avatarId = avatarResponse.data.avatarId;
  });

  test("Get back avatar information for the user", async () => {
    const response = await axios.get(
      `${BACKEND_URL}/api/v1/user/metadata/bulk?ids=[${userId}]`
    );

    expect(response.data.avatars.length).toBe(1);
    expect(response.data.avatars[0].userId).toBe(userId);
  });

  test("Get back avatar information for all the avatars", async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/avatars`);

    expect(response.data.avatars.length).not.toBe(0);
    const currentAvatar = response.data.avatars.find((x) => x.id === avatarId);
    expect(currentAvatar).toBeDefined();
  });

});


