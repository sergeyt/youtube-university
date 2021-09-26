import { Box } from "@chakra-ui/react";

const ErrorView = ({ error }) => {
  return error ? <Box>{JSON.stringify(error)} </Box> : null;
};

export default ErrorView;
