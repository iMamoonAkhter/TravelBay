import React from "react";
import {
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
  Spinner,
  Alert,
  Image,
  Heading,
  Divider,
  Link,
  Spacer,
  Text,
  Flex,
  Box,
  VStack,
  Button,
} from "@chakra-ui/react";
import { Link as ReactLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBlogPostsByCategory, nextPageClick, previousPageClick } from "../redux/actions/blogPostActions";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const BlogScreen = () => {
  const { category } = useParams();
  const blogPostInfo = useSelector((state) => state.blogPosts);
  const { blogPosts, loading, error, pageTitle, pageItems, status } = blogPostInfo;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogPostsByCategory(category, pageItems));
    window.scroll(0, 0);
  }, [category, dispatch, pageItems, status]);

  return (
    <VStack spacing="30px" minHeight="100vh">
      <Heading fontSize="5x1" mb="16">
        {pageTitle}
      </Heading>
      {loading ? (
        <Stack direction="row" spacing="4">
          <Spinner
            mt="20"
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Stack>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <>
          <Heading>{category.charAt(0).toUpperCase() + category.slice(1)} Blogs</Heading>
          {blogPosts.map((post) => (
            <Box
              key={post._id}
              w={{ base: "90%", md: "60%" }} // Set the width to 60% on medium screens and above
              px={{ base: "6", md: "8", lg: "20" }}
            >
              <Stack direction={{ base: "column", lg: "row" }} spacing="7">
                <Image
                  src={post.image}
                  minW={{ lg: "400px" }}
                  maxH="200px"
                  loading={<Spinner />}
                  fit="cover"
                />
                <Flex direction="column">
                  <Text fontSize="2xl" fontWeight="semibold" mb="3">
                    {post.title}
                  </Text>
                  <Text noOfLines="5" fontSize="lg">
                    {post.contentOne}
                  </Text>
                  <Spacer />
                  <Divider />
                  <Flex width="full" py="2">
                    <Box display={{ base: "none", md: "flex" }}>
                      <Text>by {post.author}</Text>
                      <Text mx="2">|</Text>
                      <Text>by {new Date(post.createdAt).toDateString()}</Text>
                      <Text mx="2">|</Text>
                    </Box>
                    <Text>
                      Category:
                      <Link pl="1" as={ReactLink} to={`/blog/${post.category}`}>
                        {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                      </Link>
                      <Spacer />
                      <Link as={ReactLink} to={`/${post._id}`}>
                        Read more...
                      </Link>
                    </Text>
                  </Flex>
                  <Divider />
                </Flex>
              </Stack>
            </Box>
          ))}

          <Flex>
            <Button
              m="3"
              isDisabled={pageItems === 0}
              onClick={() => dispatch(previousPageClick(pageItems))}
            >
              <ArrowLeftIcon />
            </Button>
            <Button
              m="3"
              isDisabled={status === 201 || blogPosts.length < 2}
              onClick={() => dispatch(nextPageClick(pageItems))}
            >
              <ArrowRightIcon />
            </Button>
          </Flex>
        </>
      )}
    </VStack>
  );
};

export default BlogScreen;
