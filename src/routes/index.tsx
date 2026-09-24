import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/needlyn/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Needlyn — Software consulting, mobile, robotics, AI" },
      {
        name: "description",
        content:
          "Needlyn is a software development company for consultants. Services: software consulting, mobile app development, robotics and AI.",
      },
    ],
  }),
  component: Home,
});
