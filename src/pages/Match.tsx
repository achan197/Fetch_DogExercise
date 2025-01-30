import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "../components/Grid";
import "./Match.css";
import Pagination from "../components/Pagination";
import MatchDog from "../components/MatchDog";
import MatchedModal from "../components/MatchedModal";

interface DogListResponse {
  resultIds: string[];
  total: number;
  next: string;
  prev: string;
}

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const Match: React.FC = () => {
  const [numPerPage, setNumPerPage] = useState<number>(25);
  const [results, setResults] = useState<Dog[]>([]);
  const [resultIds, setResultIds] = useState<string[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nextPageParams, setNextPageParams] = useState<string | null>(null);
  const [currentPageParams, setcurrentPageParams] = useState<string | null>(
    "/dogs/search?sort=breed:asc"
  );
  const [prevPageParams, setPrevPageParams] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPrevPage, setHasPrevPage] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"breed" | "name" | "age">("breed");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [favorites, setFavorites] = useState<string[]>([]);
  const [favDogs, setFavDogs] = useState<Dog[]>([]);

  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [matchedDogId, setMatchedDogId] = useState<string>("");

  const [showMatchedModal, setShowMatchedModal] = useState<boolean>(false);

  const baseUrl = "https://frontend-take-home-service.fetch.com";

  const fetchIds = async (params: string | null) => {
    try {
      // const response = await axios.get<DogListResponse>(
      //   "http://localhost:3001/api/dog",
      //   { params }
      // );
      let url = params ? params : currentPageParams;
      const response = await axios.get<DogListResponse>(baseUrl + url, {
        withCredentials: true,
      });
      console.log("fetchids params ", params);
      setResultIds(response.data.resultIds);
      setTotalResults(response.data.total);
      setNextPageParams(response.data.next);
      setPrevPageParams(response.data.prev);
    } catch (error) {
      console.error(error, "Failed to fetch dog ids");
    }
  };

  const fetchDogsObjectsTest = async (ids: string[] | null) => {
    try {
      // const response = await axios.get<DogListResponse>(
      //   "http://localhost:3001/api/dog",
      //   { params }
      // );
      const response = await axios.post(baseUrl + "/dogs", ids, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(error, "Failed to fetch dog objects");
    }
  };

  const fetchResultObjs = async (resultIds: string[] | null) => {
    const dogs = await fetchDogsObjectsTest(resultIds);
    setResults(dogs);
  };

  const fetchFavObjs = async (favIds: string[] | null) => {
    const dogs = await fetchDogsObjectsTest(favIds);
    setFavDogs(dogs);
  };

  const fetchMatchedObj = async (favId: string[] | null) => {
    const dog = await fetchDogsObjectsTest(favId);
    console.log("dog matc", dog[0]);
    setMatchedDog(dog[0]);
  };

  const findMatchingDog = async (favIds: string[] | null) => {
    try {
      console.log("in finding match", favIds);
      const response = await axios.post(baseUrl + "/dogs/match", favIds, {
        withCredentials: true,
      });
      console.log("match id", response.data);
      setMatchedDogId(response.data.match);
      setShowMatchedModal(true);
    } catch (error) {
      console.error(error, "Failed to fetch dog objects");
    }
  };

  const handleMatchClick = () => {
    if (favorites.length > 0) {
      findMatchingDog(favorites);
      console.log("find Dog");
    } else {
      //can do error handling with prop and display it
      console.log("error: fav list is empty");
    }
  };

  const totalPages = Math.ceil(totalResults / numPerPage);

  //get dogList on component mount
  useEffect(() => {
    fetchIds(null);
  }, []);

  useEffect(() => {
    fetchIds(currentPageParams);
  }, [currentPageParams]);

  useEffect(() => {
    if (resultIds?.length >= 0) {
      fetchResultObjs(resultIds);
    }
  }, [resultIds]);

  useEffect(() => {
    if (favorites?.length >= 0) {
      fetchFavObjs(favorites);
    }
  }, [favorites]);

  useEffect(() => {
    if (matchedDogId?.length > 0) {
      console.log("fetching match dog obj");
      fetchMatchedObj([matchedDogId]);
    }
  }, [matchedDogId]);

  useEffect(() => {
    if (nextPageParams) {
      setHasNextPage(true);
    } else {
      setHasNextPage(false);
    }
    if (prevPageParams) {
      setHasPrevPage(true);
    } else {
      setHasPrevPage(false);
    }
  }, [nextPageParams, prevPageParams]);

  //memoize so its not recreated on rerenders
  const getNextPage = () => {
    if (hasNextPage && nextPageParams) {
      setCurrentPage((prev) => prev + 1);
      setcurrentPageParams(nextPageParams);
      fetchIds(nextPageParams);
    }
  };

  const getPrevPage = () => {
    if (hasPrevPage && prevPageParams) {
      setCurrentPage((prev) => prev - 1);
      setcurrentPageParams(prevPageParams);
      fetchIds(prevPageParams);
    }
  };

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (currentPageParams) {
      const newPageParams = currentPageParams?.replace(sortBy, e.target.value);
      setSortBy(e.target.value as "age" | "breed" | "name");
      setcurrentPageParams(newPageParams);
      // console.log("sort by: ", newPageParams);
      // fetchIds(currentPageParams);
    }
  };

  const toggleSortOrder = () => {
    if (currentPageParams) {
      let newPageParams;
      if (sortOrder === "asc") {
        newPageParams = currentPageParams?.replace(sortOrder, "desc");
      } else {
        newPageParams = currentPageParams?.replace(sortOrder, "asc");
      }
      newPageParams = newPageParams?.replace(
        "from=" + String((currentPage - 1) * numPerPage),
        "from=0"
      );

      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      setcurrentPageParams(newPageParams);
      setCurrentPage(1);
    }
    console.log("after ", currentPageParams);
  };

  return (
    <div className="wrapper">
      {showMatchedModal && (
        <MatchedModal
          showModal={showMatchedModal}
          setShowModal={setShowMatchedModal}
          matchedDog={matchedDog}
        ></MatchedModal>
      )}
      {/* <SearchBar searchQuery={search} setSearchQuery={setSearch}></SearchBar> */}
      <div className="search">
        <div className="text_container">
          <h2>Find your Dogs here!</h2>
          <span>
            Select your favorite dogs before finding the perfect one for you!{" "}
          </span>
          <span>
            You can filter by age, breed or name and sort by ascending or
            descending order!
          </span>
        </div>
        <div className="search_container">
          <div className="options">
            <select className="dropDown" onChange={handleSortBy} value={sortBy}>
              <option value="age">Age</option>
              <option value="breed">Breed</option>
              <option value="name">Name</option>
            </select>
            <button className="sort_button" onClick={toggleSortOrder}>
              Sort By: {sortOrder}
            </button>
          </div>
          <Grid
            itemList={results}
            favIds={favorites}
            setFavIds={setFavorites}
          ></Grid>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            nextPage={getNextPage}
            prevPage={getPrevPage}
            hasNext={hasNextPage}
            hasPrev={hasPrevPage}
          ></Pagination>
        </div>
      </div>
      <div className="match_container">
        <MatchDog
          favList={favDogs}
          favIds={favorites}
          setFavIds={setFavorites}
          handleMatchClick={handleMatchClick}
        ></MatchDog>
      </div>
    </div>
  );
};

export default Match;
