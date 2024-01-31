import React, { useContext, useEffect, useState } from "react";
import { Container, Grid, GridRow, Header, Segment } from "semantic-ui-react";
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

  return (
    <Container fluid>
      <Segment>
        <Header as="h3" textAlign="center">
          {mediaType === "movies" ? "Movies" : "TV Shows"}
        </Header>
        <Grid textAlign="center" verticalAlign="middle">
          {userList?.length !== 0 ? (
            <GridRow>
              {userList?.map((item) => (
                <MyListItem mediaType={mediaType} media={item} />
              ))}
            </GridRow>
          ) : (
            <GridRow>
              <Header as="h1" textAlign="center">
                You don't have {mediaType === "movies" ? "Movie" : "TV Show"}{" "}
                list
              </Header>
            </GridRow>
          )}
        </Grid>
      </Segment>
    </Container>
  );
};

export default MyList;
