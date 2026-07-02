/**
 * motion-ssr-mock.tsx
 * Lightweight SSR-compatible stubs for motion/react.
 *
 * During server-side rendering, motion components have no browser context.
 * This module provides zero-animation stub replacements that render plain
 * HTML elements. Imported only during the prerender SSR build via alias.
 */

import React from "react";

type AnyProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
  // Allow any motion-specific props to be passed and ignored
  [key: string]: unknown;
};

function createMotionStub(tag: string) {
  return function MotionStub({ children, className, style, onClick }: AnyProps) {
    return React.createElement(tag, { className, style, onClick }, children);
  };
}

export const motion = {
  div: createMotionStub("div"),
  span: createMotionStub("span"),
  p: createMotionStub("p"),
  h1: createMotionStub("h1"),
  h2: createMotionStub("h2"),
  section: createMotionStub("section"),
  article: createMotionStub("article"),
  header: createMotionStub("header"),
  footer: createMotionStub("footer"),
  ul: createMotionStub("ul"),
  li: createMotionStub("li"),
  button: createMotionStub("button"),
  a: createMotionStub("a"),
  img: createMotionStub("img"),
};

// AnimatePresence just renders children directly during SSR
export function AnimatePresence({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}
