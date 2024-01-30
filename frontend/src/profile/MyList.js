import React, { useContext, useEffect, useState } from "react";
import { Grid, GridRow, Header } from "semantic-ui-react";
import UserContext from "../auth/UserContext";
import backendAPI from "../helper/api";
import MyListItem from "./MyListItem";

const MyList = ({ mediaType }) => {
  const [media, setMedia] = useState(null);
  const { currentUser } = useContext(UserContext);
  const [userList, setUserList] = useState(null);

  useEffect(() => {
    const List = async (mediaType) => {
      let data = await backendAPI.getMediaFindAll(mediaType);
      console.debug(data);
      setMedia(data);
    };
    List(mediaType);
  }, [mediaType]);

  useEffect(() => {
    const filteredUserList = () => {
      if (media && currentUser.movie_list && mediaType === "movies") {
        const filteredList = media.filter((item) =>
          currentUser.movie_list.includes(item.id)
        );
        setUserList(filteredList);
      } else if (media && currentUser.tvshow_list && mediaType === "tvshows") {
        const filteredList = media.filter((item) =>
          currentUser.tvshow_list.includes(item.id)
        );
        setUserList(filteredList);
      }
    };
    filteredUserList();
  }, [media, currentUser, mediaType]);
  if (userList.length === 0) return <p>You don't have {mediaType === "movies" ? "Movie" : "TV Show" } list</p>
  return (
    <Grid columns={6}>
      <GridRow centered>
        <Header as="h3" textAlign="center">
          {mediaType === "movies" ? "Movies" : "TV Shows"}
        </Header>
      </GridRow>
      <GridRow>
        {userList?.map((item) => (
          <MyListItem media={item} />
        ))}
      </GridRow>
    </Grid>
  );
};

export default MyList;
