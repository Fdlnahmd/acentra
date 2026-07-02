/**
 * motion-ssr-mock.tsx
 * Lightweight SSR-compatible stubs for motion/react.
 *
 * During server-side rendering, motion components have no browser context
 * and would throw errors. This module provides zero-animation stub
 * replacements that just render their children as plain DOM elements.
 *
 * Imported only from entry-server.tsx via module aliasing.
 */

import React from "react";
import type { HTMLMotionProps } from "motion/react";

// Generic polymorphic motion element factory
function createMotionStub<T extends keyof JSX.IntrinsicElements>(tag: T) {
  return function MotionStub({
    children,
    className,
    style,
    onClick,
    ...rest
  }: HTMLMotionProps<T> & { children?: React.ReactNode }) {
    // Strip motion-specific props, render as plain HTML element
    const safeProps = { className, style, onClick };
    return React.createElement(tag as string, safeProps, children);
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
