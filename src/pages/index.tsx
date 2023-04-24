import { getSummarySchema } from "@/server/routers/summarizer.schema";
import { trpc } from "@/utils/trpc";
import {
  Button,
  Col,
  Container,
  FormElement,
  Input,
  Loading,
  Row,
  Spacer,
  Text,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import React, { useRef, useState } from "react";
import { Send } from "react-iconly";

const index = () => {
  const [isNotValidUrl, setIsNotValidUrl] = useState(false);
  const urlRef = useRef<FormElement>(null);
  const {
    data,
    mutate,
    isLoading: isGettingSummary,
    error,
    isError,
  } = trpc.getSummary.useMutation();
  const handleClick = () => {
    const url = urlRef.current?.value;
    if (url && getSummarySchema.safeParse({ url }).success) {
      setIsNotValidUrl(false);
      mutate({ url });
    } else {
      setIsNotValidUrl(true);
    }
  };

  return (
    <div className="gradient-background">
      <Container fluid>
        <Row justify="center" align="center" css={{ width: "100%" }}>
          <Col>
            <Spacer />
            <Text h1 css={{ textAlign: "center" }}>
              WELCOME TO
            </Text>
            <Text
              css={{ textAlign: "center" }}
              className="gradient-animated-text"
            >
              AI SUMMARIZER
            </Text>
            <Row
              justify="center"
              align="center"
              // css={{ "@xs": { width: "100%" }, "@sm": { width: "80%" } }}
            >
              <Input
                disabled={isGettingSummary}
                ref={urlRef}
                status={isNotValidUrl ? "error" : "default"}
                fullWidth
                css={{ "@sm": { width: "80%" } }}
                size="xl"
                bordered
                borderWeight="light"
                label="Enter Valid URL"
                clearable
                helperColor="error"
                helperText={isNotValidUrl ? "Please enter a valid URL" : ""}
                contentRightStyling={false}
                contentRight={
                  <Tooltip content={"Get Summary"} color={"secondary"}>
                    <Button
                      disabled={isGettingSummary}
                      css={{ margin: "0 10px" }}
                      auto
                      onPress={handleClick}
                      icon={
                        <Send
                          set="curved"
                          primaryColor="currentColor"
                          filled
                          size={"small"}
                        />
                      }
                    />
                  </Tooltip>
                }
              />
            </Row>
            <Spacer y={4} />
            <Row justify="center" align="center">
              <Row
                css={{
                  "@xs": { width: "100%" },
                  "@sm": { width: "80%" },
                  border: "1px solid black",
                  // height: "500px",
                  borderRadius: "$3xl",
                  padding: "$lg",
                  position: "relative",
                }}
              >
                <Col>
                  <Text
                    h2
                    css={{ textAlign: "center" }}
                    className="gradient-text"
                  >
                    Summary
                  </Text>
                  <Row css={{ overflow: "scroll", height: "300px" }}>
                    <Text h4>{data?.result.summary}</Text>
                  </Row>
                </Col>
                {isGettingSummary ? (
                  <Row
                    justify="center"
                    align="center"
                    css={{
                      position: "absolute",
                      background: "rgba(0, 0, 0, 0.2)",
                      inset: "$0",
                      borderRadius: "$3xl",
                    }}
                  >
                    <Loading size="lg">Getting Summary</Loading>
                  </Row>
                ) : null}
              </Row>
            </Row>
          </Col>
        </Row>
        {/* <Button onClick={handleClick}>Test</Button>
        <p>{data?.result.summary}</p> */}
      </Container>
    </div>
  );
};

export default index;
