import axios from "axios";

const baseUrl = "https://frontend-take-home-service.fetch.com";

export const register = (req, res) => {
  //TODO
};

export const login = async (req, res) => {
  //check if the user exists
  //check if passwords match (encrypted)
  //if both are true, assign JWT
  //Store token into cookie

  console.log("hi");
  const { name, email } = req.body;

  //hit fetch endpoint for auth cookie
  try {
    console.log(name, email);
    console.log(baseUrl + "/auth/login");
    const response = await axios.post(
      baseUrl + "/auth/login",
      {
        name: name,
        email: email,
      },
      { withCredentials: true }
    );

    const token = response.headers["set-cookie"];

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 3600000,
    });

    //return user information for user context
    res.status(200).json({
      user: { name: name, email: email },
      message: "Login Success!",
    });
    // log error
  } catch (error) {
    console.error("Login faileddd: ", error);
    res.status(500).send("Login has failed");
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out");
};
