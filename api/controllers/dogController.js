import axios from "axios";

const baseUrl = "https://frontend-take-home-service.fetch.com";

export const getDogs = async (req, res) => {
  try {
    console.log("dogggg");
    const { params } = req.query;

    console.log("searching with params");
    const response = await axios.get(baseUrl + "/dogs/search", {
      params: params,
      withCredentials: true,
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("failed to get dogs", error);
  }
};

export const getMatch = async (req, res) => {
  const { params } = req.body;
  const response = await axios.post(baseUrl + "/dogs/match", {
    params: params,
  });

  return res.status(200).json(response.data);
};
