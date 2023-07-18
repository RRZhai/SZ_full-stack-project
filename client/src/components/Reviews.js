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

const Review = ({ profileUser, filterReview }) => {

  return (
    <Container>
      <Grid>
        {filterReview?.map((review) => (
          <CardActionArea key={review.id}>
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
