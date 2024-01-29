import React, { useContext, useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import UserContext from "../../auth/UserContext";
import backendAPI from "../../helper/api";

const AddtoList = ({ selectedItem }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  let mediaData = {
    id: selectedItem.id,
    overview: selectedItem.overview,
    poster_path: selectedItem.poster_path,
    genres_id: selectedItem.genres_id,
  };
  let mediaType;
  let media_id;
  if (selectedItem.title) {
    mediaData.title = selectedItem.title;
    mediaData.release_date = selectedItem.release_date;
    mediaType = "movies";
    media_id = currentUser.movie_list.some((id) => id === selectedItem.id);
  } else if (selectedItem.name) {
    mediaData.name = selectedItem.name;
    mediaData.first_air_date = selectedItem.first_air_date;
    mediaType = "tvshows";
    media_id = currentUser.tvshow_list.some((id) => id === selectedItem.id);
  } else {
    media_id = false;
  }

  const addMedia = async (mediaType, data) => {
    try {
      await backendAPI.addMediaList(mediaType, data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    const GetDetail = async () => {
      try {
        await backendAPI.getMediaDetail(mediaType, selectedItem.id);
      } catch (error) {
        console.error("An error occurred:", error);
        addMedia(mediaType, mediaData);
      }
    };
    GetDetail();
  }, [mediaType, selectedItem.id]);

  const [add, setAdd] = useState(media_id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedItem.title) {
      console.log(currentUser.username, selectedItem.id);
      await backendAPI.addMovietoList(currentUser.username, selectedItem.id);
      setCurrentUser((prevUser) => ({
        ...prevUser,
        movie_list: [...prevUser.movie_list, selectedItem.id],
      }));
      setAdd(true);
    } else if (selectedItem.name) {
      await backendAPI.addTVList(currentUser.username, selectedItem.id);
      setCurrentUser((prevUser) => ({
        ...prevUser,
        tvshow_list: [...prevUser.tvshow_list, selectedItem.id],
      }));
      setAdd(true);
    }
  };

  return (
    <Button onClick={handleSubmit} disabled={add}>
      {add ? "Already in the list" : "Add to your List"}
    </Button>
  );
};

export default AddtoList;
