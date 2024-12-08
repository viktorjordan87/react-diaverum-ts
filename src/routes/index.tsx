import { Parser } from "@/pages/Parser";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Parser />
    </Suspense>
  );
}
