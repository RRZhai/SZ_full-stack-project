import { useContext } from "react";
import { ReviewContext } from "../context/reviewContext";
import StarIcon from "@mui/icons-material/Star";

import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Rating,
} from "@mui/material";

const Review = ({ profileUser }) => {
  const { reviews } = useContext(ReviewContext);

    const filteredReview = reviews.filter(function (obj) {
      return profileUser?.reviews.indexOf(obj) !== -1;
    });

//   const filteredReview = reviews.filter((review) =>
//     profileUser.reviews.filter((comment) => comment.id === review.id)
//   );

//   console.log(profileUser);
//   console.log(filteredReview);

  return (
    <Container>
      <Grid>
        {reviews?.map((review) => (
          <CardActionArea>
            <Card sx={{ display: "flex" }}>
              <CardContent sx={{ flex: 1 }}>
                <Rating
                  name="text-feedback"
                  value={review.rating}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                <Typography variant="subtitle1" paragraph>
                  {review.content}
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        ))}
      </Grid>
    </Container>
  );
};

export default Review;
