import { Box, Typography, Divider, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const getFriends = async () => {
    const response = await fetch(
      `https://social-fitness.onrender.com/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      {friends.length > 0 ? (
        <>
          <Typography
            color={palette.neutral.dark}
            variant="h5"
            fontWeight="500"
            sx={{
              mb: "1.5rem",
            }}
          >
            Friends
          </Typography>
          <Divider sx={{ my: "1.5rem" }} />
          <Box display="flex" flexDirection="column" gap="1.5rem">
            {friends.map((friend) => (
              <Friend
                key={friend._id}
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                subtitle={`${friend.occupation} | ${friend.location}`}
                userPicturePath={friend.picturePath}
              />
            ))}
          </Box>
        </>
      ) : (
        <>
          <Typography
            color={palette.neutral.dark}
            variant="h5"
            fontWeight="500"
            sx={{ mb: "1.5rem" }}
          >
            You have no friends yet.
          </Typography>
          <Divider sx={{ my: "1.5rem" }} />
        </>
      )}
    </WidgetWrapper>
  );
};

export default FriendListWidget;
