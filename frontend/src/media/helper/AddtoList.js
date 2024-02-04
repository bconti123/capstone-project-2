import React, { useContext, useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import UserContext from "../../auth/UserContext";
import backendAPI from "../../helper/api";

const AddtoList = ({ selectedItem, add, setAdd, del, setDel }) => {
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

  // Const [add, setAdd] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.debug("handleSubmit clicked", e);
    console.debug("add: ", add, "del: ", del);
    if (selectedItem.title) {
      try {
        console.log(currentUser.username, selectedItem.id);
        await backendAPI.addMovietoList(currentUser.username, selectedItem.id);
        setCurrentUser((prevUser) => ({
          ...prevUser,
          movie_list: [...prevUser.movie_list, selectedItem.id],
        }));
        setAdd(true);
        setDel(false);
      } catch (e) {
        console.debug("An error occurred:", e);
      }
    } else if (selectedItem.name) {
      try {
        await backendAPI.addTVList(currentUser.username, selectedItem.id);
        setCurrentUser((prevUser) => ({
          ...prevUser,
          tvshow_list: [...prevUser.tvshow_list, selectedItem.id],
        }));
        setAdd(true);
        setDel(false);
      } catch (e) {
        console.debug("An error occurred:", e);
      }
    }
    console.debug("After clicked, add: ", add, "del: ", del);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    console.debug("Click", e);
    console.debug("add: ", add, "del: ", del);
    try {
      setAdd(false);
      if (selectedItem.title) {
        await backendAPI.removeMovieList(currentUser.username, selectedItem.id);
        setCurrentUser((prevUser) => ({
          ...prevUser,
          movie_list: prevUser.movie_list.filter(
            (id) => id !== selectedItem.id
          ),
        }));
      } else if (selectedItem.name) {
        await backendAPI.removeTVList(currentUser.username, selectedItem.id);
        setCurrentUser((prevUser) => ({
          ...prevUser,
          tvshow_list: prevUser.tvshow_list.filter(
            (id) => id !== selectedItem.id
          ),
        }));
      }
      setDel(false);
      console.debug("After clicked, add: ", add, "del: ", del);
    } catch (err) {
      console.debug("An error occurred:", err);
    }
  };

  return (
    <Button onClick={!add ? handleSubmit : handleDelete}>
      {add ? "Remove from the list" : "Add to your List"}
    </Button>
  );
};

export default AddtoList;
